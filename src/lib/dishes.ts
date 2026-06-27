export type Dish = {
  id: string;
  name: string | null;
  category: string | null;
  image_url: string | null;
  model_url: string | null;
  model_status: string | null;
  qr_generated: boolean | null;
  views: number | null;
  scans: number | null;
};

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function getSupabaseConfig() {
  const key = SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !key) {
    return null;
  }

  return {
    url: SUPABASE_URL.replace(/\/$/, ""),
    key,
  };
}

export function isValidDishId(dishId: string) {
  return UUID_PATTERN.test(dishId);
}

export async function getDish(dishId: string): Promise<{
  dish: Dish | null;
  error: string | null;
}> {
  const config = getSupabaseConfig();

  if (!config) {
    return {
      dish: null,
      error:
        "Missing Supabase environment variables. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    };
  }

  const query = new URLSearchParams({
    id: `eq.${dishId}`,
    select:
      "id,name,category,image_url,model_url,model_status,qr_generated,views,scans",
  });

  const response = await fetch(`${config.url}/rest/v1/dishes?${query}`, {
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return {
      dish: null,
      error: `Supabase returned ${response.status}: ${await response.text()}`,
    };
  }

  const rows = (await response.json()) as Dish[];
  return {
    dish: rows[0] ?? null,
    error: null,
  };
}

export async function recordDishScan(dish: Dish) {
  const config = getSupabaseConfig();
  if (!config) return;

  const scans = (dish.scans ?? 0) + 1;
  const views = (dish.views ?? 0) + 1;

  await fetch(`${config.url}/rest/v1/dishes?id=eq.${dish.id}`, {
    method: "PATCH",
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ scans, views }),
    cache: "no-store",
  }).catch(() => undefined);

  await fetch(`${config.url}/rest/v1/scans`, {
    method: "POST",
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      restaurant_id: null,
      food_id: dish.id,
      food_name: dish.name,
      visitor_id: "web-qr",
    }),
    cache: "no-store",
  }).catch(() => undefined);
}
