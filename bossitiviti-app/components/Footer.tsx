"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "@/data/products";
import { scrollToTarget } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

function Anchor({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      className={className}
      href={href}
      onClick={(e) => {
        e.preventDefault();
        scrollToTarget(href);
      }}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      gsap.fromTo(
        footerRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0%)",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
          },
        }
      );

      gsap.fromTo(
        contentRef.current?.children ?? [],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-noir border-t border-line py-16 text-ash font-sans text-xs"
    >
      <div ref={contentRef} className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-line">
          <div className="md:col-span-5">
            <Anchor
              className="font-display text-lg tracking-[0.5em] text-ivory block mb-3 hover:text-bronze-light transition-colors"
              href="#"
            >
              BOSSITIVITI
            </Anchor>
            <p className="text-xs text-ash font-light max-w-sm leading-relaxed mb-6">
              Haute Parfumerie crafting signatures that define confidence,
              elegance, and individuality.
            </p>
            <a
              className="text-[11px] uppercase tracking-wider text-bronze-light hover:text-ivory inline-flex items-center gap-2 transition-colors"
              href="https://instagram.com/bossitiviti"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>Instagram @bossitiviti</span>
              <span>↗</span>
            </a>
          </div>

          <div className="md:col-span-4">
            <span className="text-[9px] uppercase tracking-[0.5em] text-bronze block mb-4">
              Collection
            </span>
            <ul className="space-y-2 text-xs tracking-wider">
              {products.map((product, i) => (
                <li key={product.slug}>
                  <Anchor
                    className="hover:text-ivory transition-colors"
                    href={`#chapter-${String(i + 1).padStart(2, "0")}`}
                  >
                    {product.name} — {product.price} ({product.gender.split(" ")[1]})
                  </Anchor>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <span className="text-[9px] uppercase tracking-[0.5em] text-bronze block mb-4">
              Maison
            </span>
            <ul className="space-y-2 text-xs tracking-wider mb-6">
              <li>
                <Anchor className="hover:text-ivory transition-colors" href="#">
                  Home
                </Anchor>
              </li>
              <li>
                <Anchor className="hover:text-ivory transition-colors" href="#collection">
                  Collection
                </Anchor>
              </li>
              <li>
                <Anchor className="hover:text-ivory transition-colors" href="#about">
                  Our Story
                </Anchor>
              </li>
              <li>
                <Anchor className="hover:text-ivory transition-colors" href="#contact">
                  Contact
                </Anchor>
              </li>
            </ul>
            <p className="text-[11px] text-ash/80">United Arab Emirates</p>
            <p className="text-[11px] text-bronze-light mt-1">+971 56 896 6393</p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] tracking-widest uppercase text-ash/60">
          <p>© 2026 BOSSITIVITI. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Anchor className="hover:text-ivory transition-colors" href="#statement">
              Philosophy
            </Anchor>
            <Anchor className="hover:text-ivory transition-colors" href="#contact">
              Direct Inquiries
            </Anchor>
          </div>
        </div>
      </div>
    </footer>
  );
}
