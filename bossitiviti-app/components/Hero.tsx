"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroProduct } from "@/data/products";
import { scrollToTarget } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const supportRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const scrollLayerRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const isMobile = window.innerWidth < 1024;

      // Cinematic load-in — subtle, fast, no gate.
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        ...(prefersReducedMotion
          ? {}
          : { onComplete: () => ScrollTrigger.refresh() }),
      });

      if (!prefersReducedMotion) {
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.1
        )
          .fromTo(
            markRef.current,
            { opacity: 0, y: 26, filter: "blur(6px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9 },
            0.15
          )
          .fromTo(
            [line1Ref.current, line2Ref.current, line3Ref.current],
            { opacity: 0, y: 20, filter: "blur(4px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.8,
              stagger: 0.09,
            },
            0.3
          )
          .fromTo(
            supportRef.current,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.6 },
            0.55
          )
          .fromTo(
            ctaRef.current?.children ?? [],
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
            0.6
          )
          .fromTo(
            metaRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.6 },
            0.7
          )
          .fromTo(
            frameRef.current,
            {
              opacity: 0,
              y: 34,
              clipPath: "inset(12% 0% 12% 0%)",
              scale: 0.97,
            },
            { opacity: 1, y: 0, scale: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.15 },
            0.25
          )
          .fromTo(
            scrollIndicatorRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.7 },
            0.9
          );

        // Gentle lighting movement.
        gsap.to(glowRef.current, {
          xPercent: 18,
          yPercent: -12,
          duration: 2.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        if (!isMobile) {
          // Product parallax + very slow scale (1 → 1.04) as the hero recedes.
          gsap.fromTo(
            scrollLayerRef.current,
            { yPercent: 6, scale: 1 },
            {
              yPercent: -5,
              scale: 1.04,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );

          gsap.fromTo(
            frameRef.current,
            { y: 0 },
            {
              y: -40,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );
        }
      } else {
        if (frameRef.current) {
          tl.set(frameRef.current, {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
          });
        }
        ScrollTrigger.refresh();
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center overflow-hidden"
    >
      {/* Atmospheric background */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 62% 42%, #121212 0%, #080808 55%, #080808 100%)",
        }}
      ></div>
      <div
        ref={glowRef}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="glow-breath absolute top-[14%] right-[-6%] w-[560px] h-[560px] bg-bronze/10 blur-[160px] rounded-full"></div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-noir z-0 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pt-36 pb-28 lg:pt-40 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          {/* Editorial copy */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="flex items-center gap-4 mb-8">
              <span className="h-[1px] w-10 bg-bronze"></span>
              <span
                ref={eyebrowRef}
                className="text-[10px] uppercase tracking-[0.45em] font-sans text-bronze-light"
              >
                Haute Parfumerie
              </span>
            </div>

            <h1 className="font-display text-ivory">
              <span className="sr-only">
                BOSSITIVITI — Haute Parfumerie. Confidence. Presence.
                Individuality.
              </span>
              <span
                ref={markRef}
                aria-hidden="true"
                className="block text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.95] tracking-[0.28em] font-medium -ml-[0.14em]"
              >
                BOSSITIVITI
              </span>
            </h1>

            <p className="mt-10 font-cormorant text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.15] font-light text-alabaster">
              <span ref={line1Ref} className="block">
                Confidence.
              </span>
              <span
                ref={line2Ref}
                className="block italic text-bronze-light my-1"
              >
                Presence.
              </span>
              <span ref={line3Ref} className="block">
                Individuality.
              </span>
            </p>

            <p
              ref={supportRef}
              className="mt-8 max-w-md text-sm font-sans font-light leading-relaxed text-ash"
            >
              Fragrances composed as silent signatures — crafted to be felt
              the moment you enter a room.
            </p>

            <div ref={ctaRef} className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
              <button
                className="group inline-flex items-center gap-4 px-9 py-4 bg-ivory text-noir font-sans text-[11px] uppercase tracking-[0.45em] hover:bg-bronze-light transition-colors duration-300"
                onClick={() => scrollToTarget("#collection")}
              >
                <span>Explore the Collection</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </button>
              <button
                className="link-underline text-[11px] uppercase tracking-[0.45em] font-sans text-ash hover:text-ivory transition-colors duration-300"
                onClick={() => scrollToTarget("#about")}
              >
                The Mindset
              </button>
            </div>

            <div
              ref={metaRef}
              className="mt-14 flex items-center gap-4 text-[9px] uppercase tracking-[0.35em] font-sans text-ash/70"
            >
              <span className="text-bronze">BOSSITIVITI</span>
              <span className="w-px h-3 bg-line"></span>
              <span>Haute Parfumerie</span>
              <span className="w-px h-3 bg-line"></span>
              <span>United Arab Emirates</span>
            </div>
          </div>

          {/* Product — visual focus, generous negative space */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex lg:justify-end">
            <div className="relative w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[440px]">
              <div className="absolute -inset-10 z-0 bg-bronze/5 blur-[120px] rounded-full pointer-events-none"></div>
              <div
                ref={frameRef}
                className="group relative z-10 border border-line/70 bg-obsidian/60 overflow-hidden aspect-[3/4] lg:aspect-[4/5]"
                data-cursor-card
              >
                <div ref={scrollLayerRef} className="absolute inset-0 will-change-transform">
                  <Image
                    alt={`BOSSITIVITI ${heroProduct.name}`}
                    src={heroProduct.image}
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 440px"
                    className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045] will-change-transform"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-noir/70 via-transparent to-transparent pointer-events-none z-10"></div>

                <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-4 px-6 pb-6">
                  <div>
                    <span className="block text-[9px] uppercase tracking-[0.4em] text-bronze-light">
                      {heroProduct.gender} — BOSSITIVITI
                    </span>
                    <span className="font-display text-lg tracking-[0.2em] text-ivory mt-2 block">
                      {heroProduct.name}
                    </span>
                  </div>
                  <span className="text-[11px] font-sans text-ivory/80 whitespace-nowrap">
                    {heroProduct.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiet scroll cue */}
      <a
        ref={scrollIndicatorRef}
        aria-label="Scroll to the mindset"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 opacity-0 group"
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          scrollToTarget("#about");
        }}
      >
        <span className="text-[8px] font-sans uppercase tracking-[0.5em] text-ash group-hover:text-bronze-light transition-colors">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-bronze/80 to-transparent scroll-indicator-line"></div>
      </a>
    </section>
  );
}