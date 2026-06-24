import { ScrollSmoother } from "gsap/ScrollSmoother";
import { gsap, registerGsapPlugins } from "@/lib/gsap";

registerGsapPlugins();

export function getScrollY(): number {
  const smoother = ScrollSmoother.get();
  return smoother ? smoother.scrollTop() : window.scrollY;
}

export function scrollToHash(hash: string, offsetY = 88): void {
  const id = hash.replace(/^#/, "");
  const target = id ? document.getElementById(id) : null;
  const smoother = ScrollSmoother.get();

  if (smoother) {
    if (target) {
      smoother.scrollTo(target, true, `top ${offsetY}px`);
    } else {
      smoother.scrollTo(0, true);
    }
    return;
  }

  if (target) {
    gsap.to(window, {
      duration: 1,
      ease: "power3.inOut",
      scrollTo: { y: target, offsetY },
    });
    return;
  }

  gsap.to(window, {
    duration: 1,
    ease: "power3.inOut",
    scrollTo: { y: 0 },
  });
}
