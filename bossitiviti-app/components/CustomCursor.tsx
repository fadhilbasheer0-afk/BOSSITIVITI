"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const pointerFine = window.matchMedia("(pointer: fine)").matches;

    if (!pointerFine || prefersReducedMotion) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    };

    const render = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId = requestAnimationFrame(render);

    const addHover = (el: Element) => {
      el.addEventListener("mouseenter", () =>
        ring.classList.add("cursor-hover-link")
      );
      el.addEventListener("mouseleave", () =>
        ring.classList.remove("cursor-hover-link")
      );
    };

    const addCard = (el: Element) => {
      el.addEventListener("mouseenter", () =>
        ring.classList.add("cursor-explore")
      );
      el.addEventListener("mouseleave", () =>
        ring.classList.remove("cursor-explore")
      );
    };

    const interactiveEls = document.querySelectorAll(
      "a, button, input, textarea, [data-cursor-link]"
    );
    const cardEls = document.querySelectorAll("[data-cursor-card]");

    interactiveEls.forEach(addHover);
    cardEls.forEach(addCard);

    const observer = new MutationObserver(() => {
      document
        .querySelectorAll("a, button, input, textarea, [data-cursor-link]")
        .forEach(addHover);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", () =>
          ring.classList.add("cursor-hover-link")
        );
        el.removeEventListener("mouseleave", () =>
          ring.classList.remove("cursor-hover-link")
        );
      });
      cardEls.forEach((el) => {
        el.removeEventListener("mouseenter", () =>
          ring.classList.add("cursor-explore")
        );
        el.removeEventListener("mouseleave", () =>
          ring.classList.remove("cursor-explore")
        );
      });
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          #custom-cursor-dot {
            position: fixed;
            top: 0;
            left: 0;
            width: 6px;
            height: 6px;
            background: #c8ad7f;
            border-radius: 50%;
            pointer-events: none;
            z-index: 99999;
            transform: translate(-50%, -50%);
            transition: opacity 0.2s ease;
          }
          #custom-cursor-ring {
            position: fixed;
            top: 0;
            left: 0;
            width: 32px;
            height: 32px;
            border: 1px solid rgba(200, 173, 127, 0.4);
            border-radius: 50%;
            pointer-events: none;
            z-index: 99998;
            transform: translate(-50%, -50%);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                        height 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                        background-color 0.35s ease,
                        border-color 0.35s ease;
          }
          #custom-cursor-ring .cursor-text {
            opacity: 0;
            font-family: 'Montserrat', sans-serif;
            font-size: 8px;
            letter-spacing: 0.25em;
            text-transform: uppercase;
            color: #080808;
            font-weight: 600;
            transition: opacity 0.2s ease;
          }
          #custom-cursor-ring.cursor-explore {
            width: 68px;
            height: 68px;
            background: #c8ad7f;
            border-color: #c8ad7f;
          }
          #custom-cursor-ring.cursor-explore .cursor-text {
            opacity: 1;
          }
          #custom-cursor-ring.cursor-hover-link {
            width: 44px;
            height: 44px;
            border-color: #dfc9a8;
            background: rgba(200, 173, 127, 0.1);
          }
        }
        @media (pointer: coarse) {
          #custom-cursor-dot,
          #custom-cursor-ring {
            display: none;
          }
        }
      `}</style>
      <div ref={dotRef} id="custom-cursor-dot" className="hidden md:block" />
      <div ref={ringRef} id="custom-cursor-ring" className="hidden md:block">
        <span className="cursor-text">EXPLORE</span>
      </div>
    </>
  );
}
