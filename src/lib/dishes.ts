export type Dish = {
  id: string;
  restaurant_id: string | null;
  name: string | null;
  category: string | null;
  image_url: string | null;
  model_url: string | null;
  model_status: string | null;
  qr_generated: boolean | null;
  views: number | null;
  scans: number | null;
  qr_access_active: boolean;
  qr_access_reason: string | null;
};

type DishRow = Omit<Dish, "qr_access_active" | "qr_access_reason">;

type ProfileRow = {
  subscription_status: string | null;
  trial_remaining: number | null;
};

type SubscriptionRow = {
  status: string | null;
  expiry_date: string | null;
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
      "id,restaurant_id,name,category,image_url,model_url,model_status,qr_generated,views,scans",
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

  const rows = (await response.json()) as DishRow[];
  const dishRow = rows[0] ?? null;

  if (!dishRow) {
    return {
      dish: null,
      error: null,
    };
  }

  const access = await getQrAccessStatus(config, dishRow.restaurant_id);

  return {
    dish: {
      ...dishRow,
      qr_access_active: access.active,
      qr_access_reason: access.reason,
    },
    error: null,
  };
}

async function getQrAccessStatus(
  config: { url: string; key: string },
  restaurantId: string | null,
): Promise<{ active: boolean; reason: string | null }> {
  if (!restaurantId) {
    return {
      active: false,
      reason: "This QR code is not linked to an active restaurant account.",
    };
  }

  const profileQuery = new URLSearchParams({
    id: `eq.${restaurantId}`,
    select: "subscription_status,trial_remaining",
  });
  const profileResponse = await fetch(
    `${config.url}/rest/v1/profiles?${profileQuery}`,
    {
      headers: {
        apikey: config.key,
        Authorization: `Bearer ${config.key}`,
      },
      cache: "no-store",
    },
  );

  if (!profileResponse.ok) {
    return {
      active: false,
      reason: "We could not verify this restaurant subscription.",
    };
  }

  const profiles = (await profileResponse.json()) as ProfileRow[];
  const profile = profiles[0] ?? null;

  if (!profile) {
    return {
      active: false,
      reason: "This restaurant account is not available.",
    };
  }

  const subscriptionQuery = new URLSearchParams({
    id: `eq.${restaurantId}`,
    select: "status,expiry_date",
  });
  const subscriptionResponse = await fetch(
    `${config.url}/rest/v1/subscriptions?${subscriptionQuery}`,
    {
      headers: {
        apikey: config.key,
        Authorization: `Bearer ${config.key}`,
      },
      cache: "no-store",
    },
  );

  const subscriptions = subscriptionResponse.ok
    ? ((await subscriptionResponse.json()) as SubscriptionRow[])
    : [];
  const subscription = subscriptions[0] ?? null;
  const profileStatus = (profile.subscription_status ?? "trial").toLowerCase();
  const subscriptionStatus = (subscription?.status ?? profileStatus).toLowerCase();
  const inactiveStatuses = new Set([
    "expired",
    "paused",
    "past_due",
    "unpaid",
    "cancelled",
    "canceled",
    "inactive",
    "failed",
  ]);

  if (inactiveStatuses.has(profileStatus) || inactiveStatuses.has(subscriptionStatus)) {
    return {
      active: false,
      reason:
        "This restaurant's subscription is paused. Please renew the monthly plan to view this AR menu.",
    };
  }

  if (subscription?.expiry_date) {
    const expiryTime = Date.parse(subscription.expiry_date);
    if (!Number.isNaN(expiryTime) && expiryTime < Date.now()) {
      return {
        active: false,
        reason:
          "This restaurant's monthly subscription has expired. Please renew to reactivate this QR code.",
      };
    }
  }

  return {
    active: true,
    reason: null,
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
      restaurant_id: dish.restaurant_id,
      food_id: dish.id,
      food_name: dish.name,
      visitor_id: "web-qr",
    }),
    cache: "no-store",
  }).catch(() => undefined);
}
