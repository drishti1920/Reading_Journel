"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ───────────────────────────────────────────────────────────────── */
const QUOTES = [
  {
    text: "Books are a uniquely portable magic.",
    author: "Stephen King",
    source: "On Writing",
  },
  {
    text: "There is no friend as loyal as a book.",
    author: "Ernest Hemingway",
    source: null,
  },
  {
    text: "I am rooted, but I flow.",
    author: "Virginia Woolf",
    source: "The Waves",
  },
  {
    text: "We read to know we are not alone.",
    author: "C.S. Lewis",
    source: null,
  },
];


/* ─── Quote Card ─────────────────────────────────────────────────────────── */
function QuoteCard({
  quote,
  index,
  cardRef,
}: {
  quote: (typeof QUOTES)[0];
  index: number;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  const elRef = useRef<HTMLDivElement>(null);

  /* Merge refs */
  function setRef(el: HTMLDivElement | null) {
    (elRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    cardRef(el);
  }

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const mark = el.querySelector<HTMLSpanElement>(".quote-mark");
    const inner = el.querySelector<HTMLDivElement>(".quote-inner");

    function onEnter() {
      gsap.to(el, {
        y: -7,
        boxShadow: "0 20px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(200,169,126,0.18)",
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(mark, { opacity: 0.9, scale: 1.1, duration: 0.3, ease: "power2.out" });
      gsap.to(inner, { y: -2, duration: 0.35, ease: "power2.out" });
    }

    function onLeave() {
      gsap.to(el, {
        y: 0,
        boxShadow: "0 4px 24px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.06)",
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(mark, { opacity: 0.35, scale: 1, duration: 0.35, ease: "power2.out" });
      gsap.to(inner, { y: 0, duration: 0.4, ease: "power2.out" });
    }

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /* Alternate card vertical offset for rhythm — odd cards sit lower */
  const nudge = index % 2 === 1 ? "mt-8" : "";

  return (
    <div
      ref={setRef}
      className={`quote-card relative flex flex-col rounded-2xl p-6 sm:p-7 ${nudge}`}
      style={{
        background: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.06)",
        willChange: "transform",
        cursor: "default",
      }}
    >
      {/* Ambient large quote mark */}
      <span
        className="quote-mark pointer-events-none absolute right-5 top-3 select-none font-serif text-[6rem] leading-none text-accent"
        style={{ opacity: 0.35, lineHeight: 1 }}
        aria-hidden
      >
        &ldquo;
      </span>

      <div className="quote-inner relative z-10 flex flex-col gap-5">
        {/* Quote text */}
        <p className="font-heading text-[1.05rem] italic leading-relaxed text-text-primary sm:text-[1.15rem]">
          &ldquo;{quote.text}&rdquo;
        </p>

        {/* Divider */}
        <div
          className="h-px w-8"
          style={{ background: "rgba(200,169,126,0.5)" }}
        />

        {/* Attribution */}
        <div>
          <p className="text-sm font-medium text-text-primary">— {quote.author}</p>
          {quote.source && (
            <p className="mt-0.5 text-xs text-text-secondary">{quote.source}</p>
          )}
        </div>
      </div>
    </div>
  );
}



/* ─── Main Section ───────────────────────────────────────────────────────── */
export default function QuotesSection() {
  const sectionRef   = useRef<HTMLElement>(null);
  const eyebrowRef   = useRef<HTMLParagraphElement>(null);
  const headingRef   = useRef<HTMLHeadingElement>(null);
  const bodyRef      = useRef<HTMLParagraphElement>(null);
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([]);
 
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {

      /* ── Header stagger in ── */
      gsap.from([eyebrowRef.current, headingRef.current, bodyRef.current], {
        y: 28,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          toggleActions: "play none none none",
        },
      });

      /* ── Cards stagger in ── */
      gsap.from(cardRefs.current.filter(Boolean), {
        y: 48,
        opacity: 0,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: cardRefs.current[0],
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="quotes"
      className="relative overflow-hidden px-6 py-24 sm:px-10 sm:py-28 lg:px-16 xl:px-20"
      style={{ background: "#0f0d0b" }}
    >
      {/* ── Ambient background glow ── */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: "60vw",
          height: "40vh",
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(200,169,126,0.07) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[88rem]">

        {/* ── Header ── */}
        <div className="max-w-2xl">
          <p
            ref={eyebrowRef}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-accent"
          >
            Favorite Quotes
          </p>
          <h2
            ref={headingRef}
            className="mt-4 font-heading text-3xl font-normal leading-tight text-text-primary sm:text-4xl lg:text-5xl"
          >
            Save the words worth returning to.
          </h2>
          <p
            ref={bodyRef}
            className="mt-5 max-w-md text-base leading-relaxed text-text-secondary"
          >
            Collect passages, ideas, and insights that continue to inspire long
            after you&apos;ve finished the book.
          </p>
        </div>

        {/* ── Quote cards grid ── */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
          {QUOTES.map((quote, i) => (
            <QuoteCard
              key={i}
              quote={quote}
              index={i}
              cardRef={(el) => { cardRefs.current[i] = el; }}
            />
          ))}
        </div>

       

        {/* ── Thin divider below stats ── */}
        <div
          className="mx-auto mt-16 h-px max-w-xs"
          style={{ background: "rgba(200,169,126,0.2)" }}
        />

      </div>
    </section>
  );
}