"use client";

import Script from "next/script";
import { createElement } from "react";

type ArModelViewerProps = {
  modelUrl: string;
  posterUrl?: string | null;
  title: string;
};

export default function ArModelViewer({
  modelUrl,
  posterUrl,
  title,
}: ArModelViewerProps) {
  return (
    <>
      <Script
        type="module"
        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
        strategy="afterInteractive"
      />

      {createElement("model-viewer", {
        src: modelUrl,
        poster: posterUrl || undefined,
        alt: `Interactive 3D model of ${title}`,
        ar: true,
        "ar-modes": "scene-viewer webxr quick-look",
        "camera-controls": true,
        "auto-rotate": true,
        "shadow-intensity": "1",
        "environment-image": "neutral",
        exposure: "1",
        style: {
          width: "100%",
          height: "100%",
          minHeight: "420px",
          background: "#f7f2ed",
        },
      })}
    </>
  );
}
