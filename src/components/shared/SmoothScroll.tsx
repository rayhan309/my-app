"use client";

import React, { useRef } from "react";
import {
  gsap,
  registerGsapPlugins,
  ScrollSmoother,
  ScrollTrigger,
  useGSAP,
} from "@/lib/gsap";
import { scrollToHash } from "@/lib/smooth-scroll";

registerGsapPlugins();

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReduced) {
        gsap.set("[data-reveal]", { opacity: 1, y: 0, clearProps: "transform" });
        return;
      }

      if (!wrapperRef.current || !contentRef.current) {
        return;
      }

      document.documentElement.classList.add("smooth-scroll-active");

      const smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 1.15,
        smoothTouch: 0.1,
        effects: true,
        normalizeScroll: true,
      });

      const hash = window.location.hash;
      if (hash) {
        gsap.delayedCall(0.35, () => scrollToHash(hash));
      }

      ScrollTrigger.batch("[data-reveal]", {
        start: "top 88%",
        once: true,
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { opacity: 0, y: 48 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              stagger: 0.12,
              ease: "power3.out",
              overwrite: true,
            }
          );
        },
      });

      return () => {
        document.documentElement.classList.remove("smooth-scroll-active");
        smoother.kill();
      };
    },
    { scope: wrapperRef }
  );

  return (
    <div
      id="smooth-wrapper"
      ref={wrapperRef}
      className="fixed inset-0 z-[1] overflow-hidden bg-transparent"
    >
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
