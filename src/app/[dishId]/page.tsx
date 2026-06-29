import Link from "next/link";
import { notFound } from "next/navigation";
import { Box, LockKeyhole, TriangleAlert } from "lucide-react";
import AutoArExperience from "@/components/ar/AutoArExperience";
import { getDish, isValidDishId, recordDishScan } from "@/lib/dishes";

type DishPageProps = {
  params: Promise<{
    dishId: string;
  }>;
};

export default async function DishPage({ params }: DishPageProps) {
  const { dishId } = await params;

  if (!isValidDishId(dishId)) {
    notFound();
  }

  const { dish, error } = await getDish(dishId);

  if (error) {
    return (
      <ViewerShell>
        <StateCard
          icon={<TriangleAlert size={34} />}
          title="Viewer Not Configured"
          message={error}
          tone="warning"
        />
      </ViewerShell>
    );
  }

  if (!dish) {
    return (
      <ViewerShell>
        <StateCard
          icon={<TriangleAlert size={34} />}
          title="Dish Not Found"
          message="This QR code does not match an available BiteView dish."
          tone="warning"
        />
      </ViewerShell>
    );
  }

  if (dish.model_status !== "FINISHED" || !dish.model_url) {
    return (
      <ViewerShell>
        <StateCard
          icon={<Box size={34} />}
          title="3D Model Still Processing"
          message="This dish was found, but its interactive 3D model is not ready yet. Please scan again in a few minutes."
          tone="processing"
        />
      </ViewerShell>
    );
  }

  if (!dish.qr_access_active) {
    return (
      <ViewerShell>
        <StateCard
          icon={<LockKeyhole size={34} />}
          title="QR Code Paused"
          message={
            dish.qr_access_reason ||
            "This restaurant needs to renew its BiteView subscription to reactivate this AR menu."
          }
          tone="paused"
        />
      </ViewerShell>
    );
  }

  await recordDishScan(dish);

  const dishName = dish.name || "BiteView Dish";

  return (
    <ViewerShell>
      <AutoArExperience
        dishName={dishName}
        category={dish.category}
        modelUrl={dish.model_url}
        posterUrl={dish.image_url}
      />
    </ViewerShell>
  );
}

function ViewerShell({ children }: { children: React.ReactNode }) {
  return <div className="-mt-20 min-h-screen bg-[#f7f2ed] pt-20">{children}</div>;
}

function StateCard({
  icon,
  title,
  message,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  message: string;
  tone: "warning" | "processing" | "paused";
}) {
  return (
    <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 py-10">
      <div className="max-w-xl border-4 border-black bg-white p-8 text-center text-black shadow-[10px_10px_0_#000]">
        <div
          className={`mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border-4 border-black ${
            tone === "warning"
              ? "bg-red-100 text-red-600"
              : tone === "paused"
                ? "bg-neutral-100 text-neutral-800"
                : "bg-[#fff4ea] text-primary"
          }`}
        >
          {icon}
        </div>
        <h1 className="text-3xl font-black">{title}</h1>
        <p className="mt-4 text-base font-semibold leading-7 text-neutral-600">
          {message}
        </p>
        <Link
          href="/"
          className="mt-7 inline-block border-4 border-black bg-primary px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-white shadow-[5px_5px_0_#000]"
        >
          Visit BiteView
        </Link>
      </div>
    </section>
  );
}
