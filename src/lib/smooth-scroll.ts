export function getScrollY(): number {
  return typeof window !== "undefined" ? window.scrollY : 0;
}

export function scrollToHash(hash: string, offsetY = 80): void {
  if (typeof window === "undefined") return;
  const id = hash.replace(/^#/, "");
  const target = id ? document.getElementById(id) : null;

  if (target) {
    const targetY = target.getBoundingClientRect().top + window.scrollY - offsetY;
    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: "smooth",
    });
    return;
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

