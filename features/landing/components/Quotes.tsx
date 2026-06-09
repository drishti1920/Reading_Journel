// "use client";

// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useEffect, useRef } from "react";

// gsap.registerPlugin(ScrollTrigger);

// const QUOTES = [
//   {
//     text: "Books are a uniquely portable magic.",
//     author: "Stephen King",
//     size: "large" as const,
//   },
//   {
//     text: "There is no friend as loyal as a book.",
//     author: "Ernest Hemingway",
//     size: "medium" as const,
//   },
//   {
//     text: "I am rooted, but I flow.",
//     author: "Virginia Woolf",
//     size: "compact" as const,
//   },
//   {
//     text: "We read to know we are not alone.",
//     author: "C.S. Lewis",
//     size: "medium" as const,
//   },
// ] as const;

// const SIZE_STYLES = {
//   large: {
//     card: "p-7 sm:p-9 min-h-[14rem]",
//     quote: "text-xl sm:text-2xl leading-relaxed",
//     mark: "text-5xl sm:text-6xl",
//   },
//   medium: {
//     card: "p-6 sm:p-7 min-h-[11rem]",
//     quote: "text-lg sm:text-xl leading-relaxed",
//     mark: "text-4xl sm:text-5xl",
//   },
//   compact: {
//     card: "p-5 sm:p-6 min-h-[9rem]",
//     quote: "text-base sm:text-lg leading-relaxed",
//     mark: "text-3xl sm:text-4xl",
//   },
// } as const;

// function QuoteCard({
//   text,
//   author,
//   size,
// }: {
//   text: string;
//   author: string;
//   size: keyof typeof SIZE_STYLES;
// }) {
//   const styles = SIZE_STYLES[size];

//   return (
//     <article
//       data-quote-card
//       className={`quote-card group mb-5 break-inside-avoid rounded-2xl border border-border bg-card transition-[transform,background-color,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-accent/35 hover:bg-surface ${styles.card}`}
//     >
//       <span
//         className={`quote-mark inline-block font-heading leading-none text-accent/70 transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:translate-x-0.5 ${styles.mark}`}
//         aria-hidden="true"
//       >
//         &ldquo;
//       </span>

//       <blockquote
//         className={`mt-3 font-heading italic text-text-primary ${styles.quote}`}
//       >
//         {text}
//       </blockquote>

//       <p className="mt-5 text-sm text-text-secondary/70 transition-opacity duration-300 group-hover:text-text-secondary">
//         — {author}
//       </p>
//     </article>
//   );
// }

// export default function Quotes() {
//   const sectionRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const section = sectionRef.current;
//     if (!section) return;

//     const reducedMotion = window.matchMedia(
//       "(prefers-reduced-motion: reduce)",
//     ).matches;

//     const ctx = gsap.context(() => {
//       const cards = gsap.utils.toArray<HTMLElement>("[data-quote-card]");
//       const placard = section.querySelector("[data-quote-placard]");

//       if (reducedMotion) {
//         gsap.set([...cards, placard], { opacity: 1, y: 0 });
//         return;
//       }

//       cards.forEach((card, index) => {
//         gsap.from(card, {
//           opacity: 0,
//           y: 30,
//           duration: 0.9,
//           ease: "power3.out",
//           delay: index * 0.08,
//           scrollTrigger: {
//             trigger: card,
//             start: "top 88%",
//             toggleActions: "play none none none",
//           },
//         });
//       });

//       if (placard) {
//         gsap.from(placard, {
//           opacity: 0,
//           y: 24,
//           duration: 1,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: placard,
//             start: "top 90%",
//             toggleActions: "play none none none",
//           },
//         });
//       }
//     }, section);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       id="quotes"
//       ref={sectionRef}
//       className="border-b border-border bg-background px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28 xl:px-20"
//     >
//       <div className="mx-auto max-w-6xl">
//         <div className="max-w-3xl">
//           <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent sm:text-sm">
//             Favorite Quotes
//           </p>
//           <h2 className="mt-5 font-heading text-[2rem] font-normal leading-[1.1] tracking-[-0.01em] text-text-primary sm:text-4xl lg:text-[2.75rem]">
//             Save the words worth returning to.
//           </h2>
//           <p className="mt-5 max-w-xl text-base leading-relaxed text-text-secondary sm:mt-6 sm:text-lg">
//             Collect passages, ideas, and insights that continue to inspire long
//             after you&apos;ve finished the book.
//           </p>
//         </div>

//         <div className="mt-14 columns-1 gap-5 sm:mt-16 sm:columns-2 lg:mt-20 lg:columns-3 xl:columns-4">
//           {QUOTES.map((quote) => (
//             <QuoteCard
//               key={quote.author}
//               text={quote.text}
//               author={quote.author}
//               size={quote.size}
//             />
//           ))}
//         </div>

//         <div
//           data-quote-placard
//           className="mx-auto mt-16 max-w-md border border-border bg-card/60 px-8 py-7 text-center sm:mt-20"
//         >
//           <p className="font-heading text-2xl text-text-primary sm:text-[1.75rem]">
//             2,487 Quotes Saved
//           </p>
//           <div className="mx-auto mt-4 h-px w-12 bg-accent/50" />
//           <p className="mt-4 text-sm tracking-wide text-text-secondary">
//             Across 143 Books
//           </p>
//           <p className="mt-1 text-sm tracking-wide text-text-secondary">
//             From 78 Authors
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }


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

const STATS = [
  { value: 2487, label: "Quotes Saved", suffix: "" },
  { value: 143,  label: "Books",        suffix: "" },
  { value: 78,   label: "Authors",      suffix: "" },
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

/* ─── Stat Item ──────────────────────────────────────────────────────────── */
function StatItem({
  stat,
  statRef,
}: {
  stat: (typeof STATS)[0];
  statRef: (el: HTMLDivElement | null) => void;
}) {
  const numRef = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;
        const counter = { val: 0 };
        gsap.to(counter, {
          val: stat.value,
          duration: 1.8,
          ease: "power2.out",
          snap: { val: 1 },
          onUpdate: () => {
            if (el) {
              el.textContent =
                Math.round(counter.val).toLocaleString() + stat.suffix;
            }
          },
        });
      },
    });

    return () => trigger.kill();
  }, [stat]);

  return (
    <div ref={statRef} className="flex flex-col items-center gap-3">
      {/* Top rule */}
      <div
        className="h-px w-10"
        style={{ background: "rgba(200,169,126,0.6)" }}
      />
      <span
        ref={numRef}
        className="font-heading text-4xl font-semibold tabular-nums text-text-primary sm:text-5xl"
      >
        0
      </span>
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-secondary">
        {stat.label}
      </p>
    </div>
  );
}

/* ─── Main Section ───────────────────────────────────────────────────────── */
export default function QuotesSection() {
  const sectionRef   = useRef<HTMLElement>(null);
  const eyebrowRef   = useRef<HTMLParagraphElement>(null);
  const headingRef   = useRef<HTMLHeadingElement>(null);
  const bodyRef      = useRef<HTMLParagraphElement>(null);
  const statsRowRef  = useRef<HTMLDivElement>(null);
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const statRefs     = useRef<(HTMLDivElement | null)[]>([]);

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

      /* ── Stats row fade up ── */
      gsap.from(statRefs.current.filter(Boolean), {
        y: 32,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: statsRowRef.current,
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

        {/* ── Stats row ── */}
        <div
          ref={statsRowRef}
          className="mt-20 flex flex-col items-center gap-10 sm:flex-row sm:justify-center sm:gap-20 lg:gap-32"
        >
          {STATS.map((stat, i) => (
            <StatItem
              key={i}
              stat={stat}
              statRef={(el) => { statRefs.current[i] = el; }}
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