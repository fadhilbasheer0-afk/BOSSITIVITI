"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const [label, setLabel] = useState<string>(`01 / 06 — NB THOUSAND`);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const chapters = Array.from(
      document.querySelectorAll<HTMLElement>("[data-chapter]")
    );
    if (chapters.length === 0) return;

    let st: ScrollTrigger | undefined;

    const updateFromScroll = () => {
      const trigger = window.innerHeight * 0.5;
      let activeIndex = 0;
      let visiblePercent = 0;

      chapters.forEach((chapter, index) => {
        const rect = chapter.getBoundingClientRect();
        if (rect.top < trigger) {
          activeIndex = index;
        }
        if (index === activeIndex) {
          const total = rect.height || 1;
          const progress = Math.min(
            1,
            Math.max(0, (trigger - rect.top) / total)
          );
          visiblePercent = (index + progress) / chapters.length;
        }
      });

      if (products[activeIndex]) {
        setLabel(
          `${products[activeIndex].chapter} / ${String(products.length).padStart(
            2,
            "0"
          )} — ${products[activeIndex].name}`
        );
      }

      if (barRef.current) {
        barRef.current.style.width = `${Math.round(visiblePercent * 100)}%`;
      }
    };

    if (prefersReducedMotion) {
      window.addEventListener("scroll", updateFromScroll, { passive: true });
      updateFromScroll();
    } else {
      st = ScrollTrigger.create({
        start: 0,
        end: () => ScrollTrigger.maxScroll(window),
        onUpdate: updateFromScroll,
      });
      updateFromScroll();
    }

    return () => {
      st?.kill();
      window.removeEventListener("scroll", updateFromScroll);
    };
  }, []);

  return (
    <aside
      aria-live="polite"
      className="fixed right-8 bottom-12 z-40 hidden lg:flex flex-col items-end gap-2 pointer-events-none"
    >
      <span className="text-[9px] font-sans tracking-[0.5em] uppercase text-ash/80">
        Catalogue
      </span>
      <span
        className="font-display text-xs tracking-widest text-bronze"
        id="scroll-chapter-label"
      >
        {label}
      </span>
      <div className="w-24 h-[1px] bg-line relative overflow-hidden mt-1">
        <div
          ref={barRef}
          className="absolute top-0 left-0 h-full bg-bronze transition-all duration-300"
          style={{ width: "16%" }}
          id="scroll-progress-bar"
        ></div>
      </div>
    </aside>
  );
}
