"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { scrollToTarget } from "@/lib/scroll";

const navLinks = [
  { label: "Collection", href: "#collection" },
  { label: "About", href: "#about" },
  { label: "Philosophy", href: "#statement" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navTlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReducedMotion) {
      navTlRef.current = gsap.timeline({ paused: true });
      navTlRef.current.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );
    }

    const timeout = setTimeout(() => navTlRef.current?.play(), 600);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const handleNavigation = (href: string) => {
    setMenuOpen(false);
    scrollToTarget(href);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-noir/90 backdrop-blur-md border-b border-line"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
        <a
          aria-label="BOSSITIVITI Home"
          className="group flex flex-col"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            scrollToTarget("#");
          }}
        >
          <span className="font-display text-lg md:text-xl font-medium tracking-[0.5em] text-ivory group-hover:text-bronze-light transition-colors duration-300">
            BOSSITIVITI
          </span>
        </a>

        <nav className="hidden md:flex items-center space-x-12 text-[11px] font-sans tracking-[0.35em] uppercase text-ash">
          {navLinks.slice(0, 3).map((link) => (
            <a
              key={link.href}
              className="nav-link-hover hover:text-ivory transition-colors duration-200"
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget(link.href);
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-8">
          <a
            className="hidden sm:inline-block text-[10px] uppercase font-sans tracking-[0.35em] text-bronze-light hover:text-ivory transition-colors"
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToTarget("#contact");
            }}
          >
            Inquire
          </a>
          <button
            aria-label="Toggle Navigation Menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-drawer"
            className="md:hidden text-[10px] uppercase font-sans tracking-[0.35em] text-ash hover:text-ivory flex items-center gap-2"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span>{menuOpen ? "Close" : "Menu"}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-bronze"></span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-drawer"
          className="md:hidden bg-obsidian border-b border-line px-8 py-8"
        >
          <nav className="flex flex-col space-y-6 text-xs uppercase tracking-[0.5em] text-ash">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavigation(link.href)}
                className="text-left hover:text-ivory transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
