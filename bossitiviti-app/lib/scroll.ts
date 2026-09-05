import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function registerLenis(lenis: Lenis | null) {
  lenisInstance = lenis;
}

export function getLenis() {
  return lenisInstance;
}

export function scrollToTarget(hash: string) {
  if (!hash || hash === "#") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset: 0, duration: 1.4 });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
