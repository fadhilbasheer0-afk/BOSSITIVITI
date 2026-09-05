"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0
      )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 40, scale: 0.95, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "power3.out",
          },
          0.15
        )
        .fromTo(
          dividerRef.current,
          { scaleX: 0, transformOrigin: "center" },
          { scaleX: 1, duration: 0.8, ease: "power3.out" },
          0.5
        )
        .fromTo(
          bodyRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
          0.6
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="statement"
      className="py-36 border-y border-line bg-obsidian relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <span
          ref={labelRef}
          className="text-[9px] uppercase tracking-[0.35em] text-bronze block mb-6"
        >
          The Philosophy
        </span>
        <h2
          ref={headingRef}
          className="font-cormorant text-4xl sm:text-6xl md:text-7xl font-light text-alabaster leading-tight"
        >
          &ldquo;Confidence is not worn. <br />
          <span className="italic font-cormorant text-bronze-light">
            It is experienced.&rdquo;
          </span>
        </h2>
        <div
          ref={dividerRef}
          className="mt-8 w-12 h-[1px] bg-bronze mx-auto"
        ></div>
        <p
          ref={bodyRef}
          className="mt-8 text-sm md:text-base font-sans text-ash font-light leading-relaxed max-w-xl mx-auto"
        >
          Every fragrance is crafted to leave a lasting impression — bold,
          refined, and unmistakably you.
        </p>
      </div>
    </section>
  );
}
