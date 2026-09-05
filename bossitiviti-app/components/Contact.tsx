"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Status = "idle" | "loading" | "success" | "error";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });

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
        headingRef.current?.children ?? [],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
        0
      )
        .fromTo(
          infoRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          0.2
        )
        .fromTo(
          formRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          0.35
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (!values.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!emailRegex.test(values.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!values.message.trim()) {
      nextErrors.message = "Please enter your message or inquiry.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setStatus("loading");
    setErrors({});

    window.setTimeout(() => {
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
    }, 800);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const inputClasses = (hasError: boolean) =>
    `w-full bg-obsidian border text-ivory text-xs px-4 py-3.5 outline-none font-sans transition-colors placeholder:text-ash/40 ${
      hasError ? "border-red-500/60 focus:border-red-500" : "border-line focus:border-bronze"
    }`;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-32 bg-noir relative"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <div ref={headingRef}>
          <span className="text-[10px] font-sans uppercase tracking-[0.5em] text-bronze">
            Get In Touch
          </span>
          <h2 className="mt-4 font-cormorant text-4xl md:text-6xl font-light text-alabaster">
            Connect With BOSSITIVITI
          </h2>
        </div>

        <div
          ref={infoRef}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-y border-line text-center text-xs max-w-xl mx-auto"
        >
          <div>
            <span className="text-[9px] uppercase tracking-[0.35em] text-ash block mb-1">
              Phone / WhatsApp
            </span>
            <a
              className="text-ivory hover:text-bronze-light transition-colors"
              href="tel:+971568966393"
            >
              +971 56 896 6393
            </a>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-[0.35em] text-ash block mb-1">
              Location
            </span>
            <span className="text-ivory">United Arab Emirates</span>
          </div>
        </div>

        <form
          ref={formRef}
          className="mt-14 max-w-xl mx-auto text-left space-y-6"
          onSubmit={handleSubmit}
          noValidate
        >
          {status === "success" && (
            <div
              className="border border-bronze/40 bg-obsidian px-6 py-4 text-xs text-bronze-light"
              role="status"
            >
              Thank you for reaching out to BOSSITIVITI. Your inquiry has
              been received.
            </div>
          )}

          <div>
            <label
              className="block text-[9px] uppercase tracking-[0.35em] text-ash mb-2"
              htmlFor="contact-name"
            >
              Full Name
            </label>
            <input
              className={inputClasses(!!errors.name)}
              id="contact-name"
              placeholder="Your name"
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              disabled={status === "loading"}
            />
            {errors.name && (
              <p className="mt-1 text-[10px] text-red-400">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              className="block text-[9px] uppercase tracking-[0.35em] text-ash mb-2"
              htmlFor="contact-email"
            >
              Email Address
            </label>
            <input
              className={inputClasses(!!errors.email)}
              id="contact-email"
              placeholder="Your email address"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              disabled={status === "loading"}
            />
            {errors.email && (
              <p className="mt-1 text-[10px] text-red-400">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              className="block text-[9px] uppercase tracking-[0.35em] text-ash mb-2"
              htmlFor="contact-message"
            >
              Message / Inquiry
            </label>
            <textarea
              className={inputClasses(!!errors.message)}
              id="contact-message"
              placeholder="How may we assist you with our fragrances?"
              rows={4}
              name="message"
              value={values.message}
              onChange={handleChange}
              disabled={status === "loading"}
            />
            {errors.message && (
              <p className="mt-1 text-[10px] text-red-400">
                {errors.message}
              </p>
            )}
          </div>

          <div className="text-center pt-2">
            <p className="text-[10px] text-ash/60 mb-3">
              Frontend inquiry preview only — submissions are not yet sent to
              a server.
            </p>
            <button
              className="w-full md:w-auto px-12 py-4 bg-bronze text-noir font-sans text-xs uppercase tracking-[0.5em] font-medium hover:bg-bronze-light transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending…" : "Send Inquiry"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
