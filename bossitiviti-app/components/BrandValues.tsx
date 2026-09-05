"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const values = [
  { index: "01", word: "Confidence" },
  { index: "02", word: "Elegance" },
  { index: "03", word: "Presence" },
  { index: "04", word: "Individuality" },
];

export default function BrandValues() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      gsap.fromTo(
        labelRef.current,
        { opacity: 0, y: 16, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: labelRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        rowsRef.current?.children ?? [],
        { opacity: 0, y: 54, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          stagger: 0.16,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rowsRef.current,
            start: "top 74%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        closeRef.current,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: closeRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-44 bg-noir border-t border-line overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4">
          <span className="h-[1px] w-10 bg-bronze"></span>
          <span
            ref={labelRef}
            className="text-[10px] uppercase tracking-[0.45em] font-sans text-bronze"
          >
            The Values
          </span>
        </div>

        <div ref={rowsRef} className="mt-16 md:mt-24 border-t border-line/70">
          {values.map((value, index) => (
            <div
              key={value.index}
              className={`group flex items-baseline justify-between gap-6 border-b border-line/70 py-10 md:py-14 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <span className="text-[10px] font-sans tracking-[0.4em] text-ash/80">
                {value.index}
              </span>
              <span className="font-cormorant text-[clamp(2.5rem,9vw,6.5rem)] leading-none font-light text-alabaster tracking-tight group-hover:text-bronze-light transition-colors duration-700">
                {value.word.toUpperCase()}
              </span>
            </div>
          ))}
        </div>

        <p
          ref={closeRef}
          className="mt-16 md:mt-20 font-cormorant text-2xl md:text-3xl font-light text-ash italic"
        >
          Four principles, one signature —{" "}
          <span className="text-bronze-light">the impression you leave.</span>
        </p>
      </div>
    </section>
  );
}