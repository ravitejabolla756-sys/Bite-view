import Link from "next/link";
import { notFound } from "next/navigation";
import { Box, ExternalLink, ScanLine, TriangleAlert } from "lucide-react";
import ArModelViewer from "@/components/ar/ArModelViewer";
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

  await recordDishScan(dish);

  const dishName = dish.name || "BiteView Dish";

  return (
    <ViewerShell>
      <section className="grid min-h-[calc(100vh-5rem)] gap-6 px-4 py-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div className="overflow-hidden border-4 border-black bg-white shadow-[10px_10px_0_#000]">
          <div className="flex items-center justify-between border-b-4 border-black bg-primary px-4 py-3 text-black">
            <div className="flex items-center gap-2 font-mono text-xs font-black uppercase tracking-[0.28em]">
              <ScanLine size={18} />
              Scan To See In 3D
            </div>
            <span className="border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase">
              Live AR
            </span>
          </div>
          <div className="h-[62vh] min-h-[430px]">
            <ArModelViewer
              modelUrl={dish.model_url}
              posterUrl={dish.image_url}
              title={dishName}
            />
          </div>
        </div>

        <aside className="flex flex-col justify-center gap-5">
          <div className="border-4 border-black bg-white p-6 text-black shadow-[8px_8px_0_#000]">
            <p className="mb-3 font-mono text-xs font-black uppercase tracking-[0.28em] text-primary">
              BiteView AR Menu
            </p>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">
              {dishName}
            </h1>
            {dish.category ? (
              <p className="mt-3 inline-block border-2 border-black bg-[#fff4ea] px-3 py-1 text-sm font-black uppercase">
                {dish.category}
              </p>
            ) : null}
            <p className="mt-6 text-base font-semibold leading-7 text-neutral-700">
              Rotate, zoom, and tap the AR button to place this dish in your
              space before ordering.
            </p>
          </div>

          <a
            href={dish.model_url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-3 border-4 border-black bg-primary px-6 py-4 text-center text-sm font-black uppercase tracking-[0.18em] text-white shadow-[6px_6px_0_#000] transition-transform active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0_#000]"
          >
            Open Model File
            <ExternalLink size={18} />
          </a>

          <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">
            Powered by BiteView
          </p>
        </aside>
      </section>
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
  tone: "warning" | "processing";
}) {
  return (
    <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 py-10">
      <div className="max-w-xl border-4 border-black bg-white p-8 text-center text-black shadow-[10px_10px_0_#000]">
        <div
          className={`mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border-4 border-black ${
            tone === "warning" ? "bg-red-100 text-red-600" : "bg-[#fff4ea] text-primary"
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
