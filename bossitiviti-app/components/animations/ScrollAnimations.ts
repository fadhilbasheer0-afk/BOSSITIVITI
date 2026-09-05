import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const isDesktop = (): boolean => {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(min-width: 1024px)").matches;
};

export const isMobile = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 1024;
};

export const createReveal = (
  target: gsap.TweenTarget,
  options: {
    y?: number;
    x?: number;
    scale?: number;
    opacity?: number;
    duration?: number;
    stagger?: number;
    ease?: string;
    trigger?: Element | gsap.DOMTarget;
    start?: string;
    filter?: string;
    toggleActions?: string;
  } = {}
) => {
  const {
    y = 30,
    x = 0,
    scale = 1,
    opacity = 1,
    duration = 1,
    stagger = 0,
    ease = "power3.out",
    trigger,
    start = "top 80%",
    filter,
    toggleActions = "play none none reverse",
  } = options;

  const fromVars: gsap.TweenVars = {
    opacity: options.opacity ?? 0,
    y,
    x,
    scale,
  };
  const toVars: gsap.TweenVars = {
    opacity,
    y: 0,
    x: 0,
    scale: 1,
    duration,
    stagger,
    ease,
  };

  if (filter) {
    fromVars.filter = filter;
    toVars.filter = "blur(0px)";
  }

  if (trigger) {
    toVars.scrollTrigger = { trigger, start, toggleActions };
  }

  return gsap.fromTo(target, fromVars, toVars);
};

export const createMaskReveal = (
  target: gsap.TweenTarget,
  options: {
    direction?: "bottom" | "top" | "left" | "right";
    duration?: number;
    ease?: string;
    trigger?: Element | gsap.DOMTarget;
    start?: string;
    y?: number;
    scale?: number;
    toggleActions?: string;
  } = {}
) => {
  const {
    direction = "bottom",
    duration = 1.1,
    ease = "power3.out",
    trigger,
    start = "top 80%",
    y = 60,
    scale = 0.96,
    toggleActions = "play none none reverse",
  } = options;

  const clipPaths: Record<string, [string, string]> = {
    bottom: ["inset(100% 0 0 0)", "inset(0% 0% 0% 0%)"],
    top: ["inset(0 0 100% 0)", "inset(0% 0% 0% 0%)"],
    left: ["inset(0 100% 0 0)", "inset(0% 0% 0% 0%)"],
    right: ["inset(0 0 0 100%)", "inset(0% 0% 0% 0%)"],
  };

  const [fromClip, toClip] = clipPaths[direction];

  const toVars: gsap.TweenVars = {
    opacity: 1,
    clipPath: toClip,
    y: 0,
    scale: 1,
    duration,
    ease,
  };

  if (trigger) {
    toVars.scrollTrigger = { trigger, start, toggleActions };
  }

  return gsap.fromTo(
    target,
    { opacity: 0, clipPath: fromClip, y, scale },
    toVars
  );
};
