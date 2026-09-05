"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerLenis } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    registerLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const onScroll = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onScroll);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onScroll);
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
