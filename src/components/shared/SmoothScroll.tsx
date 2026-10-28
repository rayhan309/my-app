"use client";

import React, { useEffect } from "react";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap";
import { scrollToHash } from "@/lib/smooth-scroll";

registerGsapPlugins();

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");

    if (prefersReduced) {
      elements.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    const triggers: ScrollTrigger[] = [];

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight * 0.95;

      if (inViewport) {
        // Elements already in viewport (e.g. at top on load) should show immediately
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          clearProps: "all",
        });
      } else {
        // Elements further down fade in when scrolled into view
        gsap.set(el, { opacity: 0, y: 30 });
        const trigger = ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 0.75,
              ease: "power2.out",
              clearProps: "all",
            });
          },
        });
        triggers.push(trigger);
      }
    });

    // Handle hash links if any
    const hash = window.location.hash;
    if (hash) {
      const timer = setTimeout(() => scrollToHash(hash), 250);
      return () => {
        clearTimeout(timer);
        triggers.forEach((t) => t.kill());
      };
    }

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return <div className="relative w-full bg-transparent">{children}</div>;
}

