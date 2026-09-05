"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductChapter from "./ProductChapter";
import { products } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

export default function Collection() {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      gsap.fromTo(
        headingRef.current?.children ?? [],
        { opacity: 0, y: 26, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, headingRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="collection" className="relative bg-noir overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-4">
        <div ref={headingRef}>
          <div className="flex items-center gap-4">
            <span className="h-[1px] w-10 bg-bronze"></span>
            <span className="text-[10px] uppercase tracking-[0.45em] font-sans text-bronze">
              The Fragrance Collection
            </span>
          </div>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-cormorant text-[clamp(2.25rem,7vw,5.25rem)] leading-none font-light text-alabaster tracking-tight">
              Distinct Signatures
            </h2>
            <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-ash pb-2">
              Official Catalogue —{" "}
              <span className="text-bronze-light">01 – {String(products.length).padStart(2, "0")}</span>
            </p>
          </div>
        </div>
        <div className="mt-12 h-px w-full bg-line"></div>
      </div>

      {products.map((product, index) => (
        <ProductChapter
          key={product.slug}
          product={product}
          index={index}
          total={products.length}
        />
      ))}
    </section>
  );
}