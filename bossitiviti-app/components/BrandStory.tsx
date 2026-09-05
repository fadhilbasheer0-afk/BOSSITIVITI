"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  { index: "I", title: "Authentic Fragrances" },
  { index: "II", title: "Long-Lasting Formulations" },
  { index: "III", title: "Elegant Packaging" },
];

export default function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const founderRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const imgInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const isMobile = window.innerWidth < 1024;

      if (prefersReducedMotion) return;

      const toggle = "play none none reverse";
      const reveal = (
        target: gsap.TweenTarget,
        vars: gsap.TweenVars & { trigger?: Element | gsap.DOMTarget },
        start: string
      ) => {
        const { trigger, ...tweenVars } = vars;
        const trig = trigger ?? (target as Element);
        return gsap.fromTo(
          target,
          { opacity: 0, y: 28, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "power3.out",
            scrollTrigger: trig
              ? { trigger: trig, start, toggleActions: toggle }
              : undefined,
            ...tweenVars,
          }
        );
      };

      reveal(labelRef.current, { duration: 0.6 }, "top 88%");
      reveal(line1Ref.current, { duration: 1 }, "top 80%");
      reveal(line2Ref.current, { duration: 1, delay: 0.08 }, "top 78%");

      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: dividerRef.current,
            start: "top 85%",
            toggleActions: toggle,
          },
        }
      );

      reveal(
        bodyRef.current?.children ?? [],
        { duration: 0.9, stagger: 0.12, trigger: bodyRef.current },
        "top 80%"
      );
      reveal(founderRef.current, { duration: 0.7 }, "top 90%");

      gsap.fromTo(
        pillarsRef.current?.children ?? [],
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: pillarsRef.current,
            start: "top 85%",
            toggleActions: toggle,
          },
        }
      );

      gsap.fromTo(
        imgWrapRef.current,
        {
          opacity: 0,
          y: 40,
          scale: 0.97,
          clipPath: "inset(6% 0% 6% 0%)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imgWrapRef.current,
            start: "top 82%",
            toggleActions: toggle,
          },
        }
      );

      if (!isMobile) {
        gsap.fromTo(
          imgInnerRef.current,
          { yPercent: -6, scale: 1.06 },
          {
            yPercent: 6,
            scale: 1.1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-28 md:py-40 border-y border-line bg-obsidian overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          {/* Statement — the mindset */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-8">
              <span className="h-[1px] w-10 bg-bronze"></span>
              <span
                ref={labelRef}
                className="text-[10px] uppercase tracking-[0.45em] font-sans text-bronze"
              >
                The Mindset
              </span>
            </div>

            <h2 className="font-cormorant text-[clamp(2rem,6vw,4.25rem)] leading-[1.15] font-light text-alabaster tracking-tight">
              <span ref={line1Ref} className="block">
                A fragrance becomes
              </span>
              <span ref={line2Ref} className="block">
                more than a scent.{" "}
                <span className="italic text-bronze-light">
                  It becomes part of your presence.
                </span>
              </span>
            </h2>

            <div
              ref={dividerRef}
              className="mt-10 w-16 h-[1px] bg-bronze/70"
            ></div>

            <div
              ref={bodyRef}
              className="mt-10 max-w-lg space-y-6 text-ash font-sans font-light text-sm leading-relaxed"
            >
              <p>
                BOSSITIVITI began with a single signature — NB THOUSAND, worn
                privately for years, asked about constantly. That quiet
                recognition became a principle: a fragrance should announce
                you before you ever speak.
              </p>
              <p>
                From THOUSAND to DECILLION, each composition marks the same
                journey — more presence, more power, more unmistakably you.
              </p>
            </div>

            <div ref={founderRef} className="mt-12">
              <span className="font-display text-sm tracking-[0.3em] text-bronze-light uppercase block">
                Ealdorman
              </span>
              <span className="text-[9px] uppercase tracking-[0.4em] text-ash block mt-2">
                The Founder
              </span>
            </div>
          </div>

          {/* Editorial image beat */}
          <div className="lg:col-span-5 lg:justify-self-end w-full max-w-[440px]">
            <div
              ref={imgWrapRef}
              className="relative aspect-[3/4] overflow-hidden border border-line/70 bg-noir"
              data-cursor-card
            >
              <div ref={imgInnerRef} className="absolute inset-0 will-change-transform">
                <Image
                  alt={`BOSSITIVITI ${products[0].name} — the original signature`}
                  src={products[0].image}
                  fill
                  sizes="(max-width: 1024px) 90vw, 440px"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-noir/50 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute top-6 left-6 px-3 py-1 bg-noir/85 border border-line text-[9px] uppercase tracking-[0.35em] text-bronze-light">
                {products[0].name} — The Original
              </div>
            </div>
          </div>
        </div>

        {/* Typographic pillars */}
        <div
          ref={pillarsRef}
          className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-3 border-t border-line/70"
        >
          {pillars.map((pillar) => (
            <div
              key={pillar.index}
              className="py-10 md:py-12 md:border-l md:first:border-l-0 border-line/70 px-2 md:px-10 first:pl-0"
            >
              <span className="font-display text-2xl text-bronze/70">
                {pillar.index}
              </span>
              <span className="block mt-4 text-[9px] uppercase tracking-[0.4em] text-ash">
                Pillar {pillar.index}
              </span>
              <span className="block mt-2 font-cormorant text-2xl text-alabaster">
                {pillar.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}