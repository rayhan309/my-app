"use client";

import React, { useEffect, useRef, useState } from "react";

const THREE_CDN =
  "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
const VANTA_FOG_CDN =
  "https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.fog.min.js";
const VANTA_BIRDS_CDN =
  "https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.birds.min.js";

type VantaEffect = { destroy: () => void };

type VantaApi = {
  FOG: (opts: Record<string, unknown>) => VantaEffect;
  BIRDS: (opts: Record<string, unknown>) => VantaEffect;
};

declare global {
  interface Window {
    THREE?: unknown;
    VANTA?: VantaApi;
  }
}

const scriptPromises = new Map<string, Promise<void>>();

function loadScript(src: string): Promise<void> {
  const existing = scriptPromises.get(src);
  if (existing) return existing;

  const promise = new Promise<void>((resolve, reject) => {
    const found = document.querySelector<HTMLScriptElement>(
      `script[src="${src}"]`
    );
    if (found) {
      if (found.getAttribute("data-loaded") === "true") {
        resolve();
        return;
      }
      found.addEventListener("load", () => resolve());
      found.addEventListener("error", () =>
        reject(new Error(`Failed to load script: ${src}`))
      );
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.setAttribute("data-loaded", "true");
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });

  scriptPromises.set(src, promise);
  return promise;
}

/**
 * Page-load intro matching portfolio.irfans.dev:
 * VANTA.FOG + VANTA.BIRDS (pink low-poly birds), then fade out.
 */
export default function PageLoadIntro() {
  const [visible, setVisible] = useState(false);
  const [hiding, setHiding] = useState(false);
  const fogRef = useRef<HTMLDivElement>(null);
  const birdsRef = useRef<HTMLDivElement>(null);
  const fogEffect = useRef<VantaEffect | null>(null);
  const birdsEffect = useRef<VantaEffect | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    let cancelled = false;
    setVisible(true);
    document.documentElement.style.overflow = "hidden";

    async function init() {
      try {
        await loadScript(THREE_CDN);
        await Promise.all([loadScript(VANTA_FOG_CDN), loadScript(VANTA_BIRDS_CDN)]);
        if (cancelled) return;

        const THREE = window.THREE;
        const VANTA = window.VANTA;
        if (!THREE || !VANTA?.FOG || !VANTA?.BIRDS) return;

        if (fogRef.current && !fogEffect.current) {
          fogEffect.current = VANTA.FOG({
            el: fogRef.current,
            THREE,
            mouseControls: false,
            touchControls: false,
            gyroControls: false,
            highlightColor: 0x000000,
            midtoneColor: 0x000000,
            lowlightColor: 0x000000,
            baseColor: 0x732f89,
            blurFactor: 0.6,
            zoom: 1,
            speed: 1,
          });
        }

        if (birdsRef.current && !birdsEffect.current) {
          birdsEffect.current = VANTA.BIRDS({
            el: birdsRef.current,
            THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            backgroundAlpha: 0,
            color1: 0xeb0096,
            color2: 3953239,
            quantity: 5,
            birdSize: 1,
            wingSpan: 40,
            speedLimit: 10,
          });
        }
      } catch (err) {
        console.error("Failed to init bird intro", err);
      }
    }

    void init();

    // Same timing as portfolio.irfans.dev entry-loader
    const hideStart = window.setTimeout(() => setHiding(true), 2000);
    const remove = window.setTimeout(() => {
      setVisible(false);
      document.documentElement.style.overflow = "";
    }, 2000 + 1250);

    return () => {
      cancelled = true;
      window.clearTimeout(hideStart);
      window.clearTimeout(remove);
      document.documentElement.style.overflow = "";
      try {
        fogEffect.current?.destroy();
        birdsEffect.current?.destroy();
      } catch {
        /* ignore */
      }
      fogEffect.current = null;
      birdsEffect.current = null;
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        opacity: hiding ? 0 : 1,
        visibility: hiding ? "hidden" : "visible",
        pointerEvents: hiding ? "none" : "auto",
        transition: "opacity 1.25s, visibility 1.25s",
      }}
    >
      <div
        ref={fogRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      />
      <div
        ref={birdsRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
