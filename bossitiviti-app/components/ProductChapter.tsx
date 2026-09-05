"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Product } from "@/data/products";
import { scrollToTarget } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

interface ProductChapterProps {
  product: Product;
  index: number;
  total: number;
}

export default function ProductChapter({
  product,
  index,
  total,
}: ProductChapterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const isMobile = window.innerWidth < 1024;

      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        imageWrapRef.current,
        {
          opacity: 0,
          y: isMobile ? 40 : 64,
          scale: 0.96,
          filter: "blur(10px)",
          clipPath: "inset(8% 0% 8% 0%)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.3,
          ease: "power3.out",
        },
        0
      )
        .fromTo(
          textRef.current?.children
            ? Array.from(textRef.current.children)
            : [],
          { opacity: 0, y: 26, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          },
          0.25
        );

      if (!isMobile) {
        gsap.fromTo(
          imageInnerRef.current,
          { yPercent: -7, scale: 1.08 },
          {
            yPercent: 7,
            scale: 1.14,
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
  }, [index]);

  const imageLeft = index % 2 === 0;

  return (
    <article
      ref={sectionRef}
      id={`chapter-${String(index + 1).padStart(2, "0")}`}
      data-chapter={`${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")} — ${product.name}`}
      className={`relative py-24 md:py-32 border-b border-line/60 fragrance-chapter overflow-hidden ${
        index % 2 === 1 ? "bg-obsidian/30" : "bg-noir"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-24 items-center">
          {/* Editorial product image */}
          <div
            className={`lg:col-span-6 ${imageLeft ? "" : "lg:order-2"}`}
          >
            <div className="relative max-w-[380px] sm:max-w-[440px] lg:max-w-[520px] mx-auto lg:mx-0">
              <div className="absolute -inset-8 z-0 bg-bronze/[0.04] blur-[100px] rounded-full pointer-events-none"></div>
              <div
                ref={imageWrapRef}
                className="group relative z-10 aspect-[3/4] border border-line/70 bg-obsidian overflow-hidden"
                data-cursor-card
              >
                <div
                  ref={imageInnerRef}
                  className="absolute inset-0 will-change-transform"
                >
                  <Image
                    alt={`BOSSITIVITI ${product.name}`}
                    src={product.image}
                    fill
                    sizes="(max-width: 1024px) 90vw, 520px"
                    className="object-cover transition-transform duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] will-change-transform"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-noir/55 via-transparent to-transparent pointer-events-none z-10"></div>
                <div
                  className={`absolute z-20 bottom-6 flex items-center gap-3 ${
                    imageLeft ? "left-6" : "left-6"
                  }`}
                >
                  <span className="px-3 py-1 bg-noir/85 border border-line text-[9px] uppercase tracking-[0.35em] text-bronze-light">
                    {product.gender}
                  </span>
                  <span className="text-[10px] font-sans text-ivory/70 tracking-widest">
                    BOSSITIVITI
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial product type */}
          <div
            className={`lg:col-span-6 ${imageLeft ? "lg:order-2" : "lg:order-1"}`}
          >
            <div ref={textRef}>
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -top-14 left-0 font-display text-[7rem] md:text-[10rem] leading-none text-ivory/[0.04] select-none pointer-events-none"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="relative font-sans text-[10px] uppercase tracking-[0.5em] text-ash">
                  Chapter {product.chapter}
                </span>
              </div>
              <h3 className="relative mt-4 font-cormorant text-[clamp(3rem,8vw,5.5rem)] leading-[1.02] font-light text-alabaster tracking-tight">
                {product.name}
              </h3>
              <p className="relative mt-6 text-[10px] uppercase tracking-[0.4em] text-bronze-light">
                {product.gender} — Haute Parfumerie
              </p>

              <div className="mt-10 max-w-md border-y border-line/80 py-5 flex items-baseline justify-between">
                <span className="text-[10px] uppercase tracking-[0.35em] text-ash">
                  Price
                </span>
                <span className="font-display text-2xl text-ivory tracking-wider">
                  {product.price}
                </span>
              </div>

              <div className="mt-10">
                <a
                  className="link-underline inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.45em] font-sans text-ivory hover:text-bronze-light transition-colors duration-300 group"
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToTarget("#contact");
                  }}
                >
                  <span>Inquire</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}