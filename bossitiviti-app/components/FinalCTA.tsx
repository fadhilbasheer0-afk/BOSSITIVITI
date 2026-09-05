"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToTarget } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const supportRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 16, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out" },
        0
      )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 44, scale: 0.97, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.3,
            ease: "power3.out",
          },
          0.15
        )
        .fromTo(
          dividerRef.current,
          { scaleX: 0, transformOrigin: "center" },
          { scaleX: 1, duration: 0.9, ease: "power3.out" },
          0.6
        )
        .fromTo(
          supportRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          0.7
        )
        .fromTo(
          ctaRef.current?.children ?? [],
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" },
          0.8
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-36 md:py-48 bg-noir border-t border-line overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 45%, #121212 0%, #080808 60%, #080808 100%)",
          }}
        ></div>
        <div className="glow-breath absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] bg-bronze/[0.07] blur-[170px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        <span
          ref={labelRef}
          className="text-[10px] uppercase tracking-[0.45em] font-sans text-bronze"
        >
          The Invitation
        </span>
        <h2
          ref={headingRef}
          className="mt-8 font-cormorant text-[clamp(2.5rem,8vw,6rem)] leading-[1.05] font-light text-alabaster tracking-tight"
        >
          Leave an{" "}
          <span className="italic text-bronze-light">Impression.</span>
        </h2>
        <div
          ref={dividerRef}
          className="mt-10 w-16 h-[1px] bg-bronze mx-auto"
        ></div>
        <p
          ref={supportRef}
          className="mt-10 max-w-xl mx-auto text-sm md:text-base font-sans font-light leading-relaxed text-ash"
        >
          Before a word is spoken, the scent already speaks. Wear the
          signature that announces you.
        </p>
        <div ref={ctaRef} className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          <button
            className="group inline-flex items-center gap-4 px-10 py-4 bg-ivory text-noir font-sans text-[11px] uppercase tracking-[0.45em] hover:bg-bronze-light transition-colors duration-300"
            onClick={() => scrollToTarget("#collection")}
          >
            <span>Explore the Collection</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </button>
          <button
            className="link-underline text-[11px] uppercase tracking-[0.45em] font-sans text-ash hover:text-ivory transition-colors duration-300"
            onClick={() => scrollToTarget("#contact")}
          >
            Direct Inquiry
          </button>
        </div>
      </div>
    </section>
  );
}