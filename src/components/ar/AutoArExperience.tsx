"use client";

import { Box, ExternalLink, ScanLine } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ArModelViewer from "@/components/ar/ArModelViewer";

type AutoArExperienceProps = {
  dishName: string;
  category?: string | null;
  modelUrl: string;
  posterUrl?: string | null;
};

type LaunchState = "launching" | "embedded" | "manual";

function isAndroidBrowser() {
  if (typeof navigator === "undefined") return false;
  return /Android/i.test(navigator.userAgent);
}

function supportsWebGl() {
  if (typeof document === "undefined") return false;

  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

function buildSceneViewerIntent(modelUrl: string, title: string) {
  const currentUrl =
    typeof window === "undefined"
      ? "https://bite-view.vercel.app"
      : window.location.href;
  const sceneViewerUrl = new URL("https://arvr.google.com/scene-viewer/1.0");
  sceneViewerUrl.searchParams.set("file", modelUrl);
  sceneViewerUrl.searchParams.set("mode", "ar_preferred");
  sceneViewerUrl.searchParams.set("title", title);
  sceneViewerUrl.searchParams.set("resizable", "false");

  return `intent://arvr.google.com/scene-viewer/1.0?${sceneViewerUrl.searchParams.toString()}#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(
    currentUrl,
  )};end;`;
}

export default function AutoArExperience({
  dishName,
  category,
  modelUrl,
  posterUrl,
}: AutoArExperienceProps) {
  const [launchState, setLaunchState] = useState<LaunchState>("launching");
  const sceneViewerIntent = useMemo(
    () => buildSceneViewerIntent(modelUrl, dishName),
    [dishName, modelUrl],
  );

  useEffect(() => {
    const canUseWebGl = supportsWebGl();
    const android = isAndroidBrowser();

    if (android) {
      const launchTimer = window.setTimeout(() => {
        window.location.href = sceneViewerIntent;
      }, 450);

      const fallbackTimer = window.setTimeout(() => {
        if (document.visibilityState === "visible") {
          setLaunchState(canUseWebGl ? "embedded" : "manual");
        }
      }, 2600);

      return () => {
        window.clearTimeout(launchTimer);
        window.clearTimeout(fallbackTimer);
      };
    }

    const fallbackTimer = window.setTimeout(() => {
      setLaunchState(canUseWebGl ? "embedded" : "manual");
    }, 700);

    return () => window.clearTimeout(fallbackTimer);
  }, [sceneViewerIntent]);

  if (launchState === "launching") {
    return <ArLoadingScreen />;
  }

  if (launchState === "manual") {
    return (
      <DishFallbackPage
        dishName={dishName}
        category={category}
        modelUrl={modelUrl}
        posterUrl={posterUrl}
        showViewer={false}
      />
    );
  }

  return (
    <DishFallbackPage
      dishName={dishName}
      category={category}
      modelUrl={modelUrl}
      posterUrl={posterUrl}
      showViewer
    />
  );
}

function ArLoadingScreen() {
  return (
    <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-5 py-10">
      <div className="w-full max-w-md border-4 border-black bg-white p-8 text-center text-black shadow-[10px_10px_0_#000]">
        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-black bg-primary text-4xl font-black text-white shadow-[5px_5px_0_#000]">
          B
        </div>
        <p className="mb-3 font-mono text-xs font-black uppercase tracking-[0.28em] text-primary">
          BiteView
        </p>
        <h1 className="text-3xl font-black tracking-tight">
          Preparing your AR experience...
        </h1>
        <div className="mx-auto mt-8 flex w-28 items-center justify-between">
          <span className="h-4 w-4 animate-bounce border-2 border-black bg-primary [animation-delay:-0.24s]" />
          <span className="h-4 w-4 animate-bounce border-2 border-black bg-primary [animation-delay:-0.12s]" />
          <span className="h-4 w-4 animate-bounce border-2 border-black bg-primary" />
        </div>
      </div>
    </section>
  );
}

function DishFallbackPage({
  dishName,
  category,
  modelUrl,
  posterUrl,
  showViewer,
}: AutoArExperienceProps & {
  showViewer: boolean;
}) {
  return (
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
          {showViewer ? (
            <ArModelViewer
              modelUrl={modelUrl}
              posterUrl={posterUrl}
              title={dishName}
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center bg-[#f7f2ed] p-6 text-center">
              <Box size={54} className="mb-4 text-primary" />
              <h2 className="text-2xl font-black">3D Viewer Unavailable</h2>
              <p className="mt-3 max-w-sm text-sm font-semibold leading-6 text-neutral-600">
                This browser could not start AR automatically. You can still
                open the generated 3D model manually.
              </p>
            </div>
          )}
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
          {category ? (
            <p className="mt-3 inline-block border-2 border-black bg-[#fff4ea] px-3 py-1 text-sm font-black uppercase">
              {category}
            </p>
          ) : null}
          <p className="mt-6 text-base font-semibold leading-7 text-neutral-700">
            We tried to launch AR automatically. If your device stayed on this
            page, use the button below.
          </p>
        </div>

        <a
          href={modelUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-3 border-4 border-black bg-primary px-6 py-4 text-center text-sm font-black uppercase tracking-[0.18em] text-white shadow-[6px_6px_0_#000] transition-transform active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0_#000]"
        >
          Open 3D Model
          <ExternalLink size={18} />
        </a>

        <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">
          Powered by BiteView
        </p>
      </aside>
    </section>
  );
}
