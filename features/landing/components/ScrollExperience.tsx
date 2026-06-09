"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BOOKS = [
  {
    title: "Dune",
    author: "Frank Herbert",
    cover: "/images/book_cover/dune.jpg",
  },
  {
    title: "The Waves",
    author: "Virginia Woolf",
    cover: "/images/book_cover/the_waves.png",
  },
  {
    title: "Beloved",
    author: "Toni Morrison",
    cover: "/images/book_cover/beloved.jpg",
  },
  {
    title: "Siddhartha",
    author: "Hermann Hesse",
    cover: "/images/book_cover/siddhartha.jpg",
  },
  {
    title: "Middlemarch",
    author: "George Eliot",
    cover: "/images/book_cover/middlemarch.jpg",
  },
  {
    title: "The Brothers Karamazov",
    author: "Fyodor Dostoevsky",
    cover: "/images/book_cover/the_brothers_karamazov.webp",
  },
] as const;

const BOOK_POSITIONS = [
  { left: "5%", top: "15%", rotate: -12 },
  { left: "22%", top: "55%", rotate: 8 },
  { left: "42%", top: "8%", rotate: -5 },
  { left: "60%", top: "40%", rotate: 15 },
  { left: "75%", top: "10%", rotate: -8 },
  { left: "85%", top: "60%", rotate: 6 },
] as const;

const STATS = [
  { value: 2847, label: "Books tracked this week" },
  { value: 14293, label: "Quotes saved" },
  { value: 98, label: "Readers hit their annual goal", suffix: "%" },
] as const;

function KineticLine({ text }: { text: string }) {
  return (
    <div className="relative overflow-hidden">
      <div className="scroll-exp-kinetic-line relative">
        <span className="scroll-exp-kinetic-cream block">{text}</span>
        <span
          className="scroll-exp-kinetic-gold pointer-events-none absolute inset-0 block text-[#c8a97e]"
          aria-hidden="true"
        >
          {text}
        </span>
      </div>
    </div>
  );
}

export default function ScrollExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLElement>(null);
  const section2Ref = useRef<HTMLElement>(null);
  const section3Ref = useRef<HTMLElement>(null);
  const section4Ref = useRef<HTMLElement>(null);
  const section5Ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      const sections = [
        section1Ref.current,
        section2Ref.current,
        section3Ref.current,
        section4Ref.current,
        section5Ref.current,
      ].filter(Boolean) as HTMLElement[];

      if (reducedMotion || isMobile) {
        sections.forEach((section) => {
          gsap.from(section, {
            opacity: 0,
            y: 32,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        });

        if (!reducedMotion) {
          STATS.forEach((stat, index) => {
            const numberEl = section4Ref.current?.querySelector(
              `[data-stat-index="${index}"]`,
            );
            if (!numberEl) return;

            const counter = { value: 0 };
            gsap.to(counter, {
              value: stat.value,
              duration: 1.8,
              ease: "power2.out",
              snap: "suffix" in stat ? undefined : { value: 1 },
              scrollTrigger: {
                trigger: numberEl,
                start: "top 80%",
                toggleActions: "play none none none",
              },
              onUpdate: () => {
                numberEl.textContent =
                  "suffix" in stat
                    ? `${Math.round(counter.value)}${stat.suffix}`
                    : Math.round(counter.value).toLocaleString();
              },
            });
          });
        }

        return;
      }

      // Section 1 — Open a book portal
      const wordOpen = root.querySelector("#word-open");
      const wordA = root.querySelector("#word-a");
      const wordBook = root.querySelector("#word-book");
      const section1Overlay = root.querySelector("#section1-overlay");

      if (section1Ref.current && wordOpen && wordA && wordBook) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: section1Ref.current,
              start: "top top",
              end: "+=100%",
              scrub: 1,
              pin: true,
            },
          })
          .to(wordBook, { scale: 6, opacity: 0, ease: "power2.inOut" }, 0)
          .to(wordOpen, { x: "-40vw", opacity: 0, ease: "power2.inOut" }, 0)
          .to(wordA, { x: "40vw", opacity: 0, ease: "power2.inOut" }, 0)
          .to(section1Overlay, { opacity: 1, ease: "none" }, 0.85);
      }

      // Section 2 — Floating book covers
      const cards = gsap.utils.toArray<HTMLElement>(".scroll-exp-book-card");
      const section2Headline = root.querySelector("#section2-headline");
      const section2Overlay = root.querySelector("#section2-overlay");

      if (section2Ref.current && cards.length) {
        cards.forEach((card, index) => {
          const pos = BOOK_POSITIONS[index];
          gsap.set(card, {
            left: pos.left,
            top: pos.top,
            rotation: pos.rotate,
            xPercent: 0,
            yPercent: 0,
          });
        });

        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: section2Ref.current,
            start: "top top",
            end: "+=100%",
            scrub: 1,
            pin: true,
          },
        });

        cards.forEach((card, index) => {
          tl2.to(
            card,
            {
              left: "50%",
              top: "50%",
              xPercent: -50,
              yPercent: -50,
              rotation: 0,
              zIndex: index + 1,
              ease: "power2.inOut",
            },
            0,
          );
        });

        if (section2Headline) {
          tl2.fromTo(
            section2Headline,
            { opacity: 0, y: 48 },
            { opacity: 1, y: 0, ease: "power2.out" },
            0.7,
          );
        }

        if (section2Overlay) {
          tl2.to(section2Overlay, { opacity: 1, ease: "none" }, 0.92);
        }
      }

      // Section 3 — Kinetic text
      const line1 = root.querySelector("#kinetic-line-1 .scroll-exp-kinetic-line");
      const line2 = root.querySelector("#kinetic-line-2 .scroll-exp-kinetic-line");
      const line3 = root.querySelector("#kinetic-line-3 .scroll-exp-kinetic-line");
      const goldLayers = gsap.utils.toArray<HTMLElement>(
        ".scroll-exp-kinetic-gold",
      );

      if (section3Ref.current && line1 && line2 && line3) {
        const tl3 = gsap.timeline({
          scrollTrigger: {
            trigger: section3Ref.current,
            start: "top top",
            end: "+=100%",
            scrub: 1,
            pin: true,
          },
        });

        tl3.fromTo(
          line1,
          { x: "-120vw" },
          { x: 0, ease: "power2.out" },
          0,
        )
          .fromTo(
            line2,
            { x: "120vw" },
            { x: 0, ease: "power2.out" },
            0.15,
          )
          .fromTo(
            line3,
            { y: "30vh", opacity: 0 },
            { y: 0, opacity: 1, ease: "power2.out" },
            0.3,
          );

        goldLayers.forEach((layer) => {
          tl3.fromTo(
            layer,
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", ease: "none" },
            0.8,
          );
        });
      }

      // Section 4 — Stats
      const statColumns = gsap.utils.toArray<HTMLElement>(
        ".scroll-exp-stat-column",
      );

      if (section4Ref.current && statColumns.length) {
        ScrollTrigger.create({
          trigger: section4Ref.current,
          start: "top top",
          end: "+=100%",
          scrub: 1,
          pin: true,
        });

        gsap.from(statColumns, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section4Ref.current,
            start: "top 60%",
            toggleActions: "play none none none",
          },
        });

        STATS.forEach((stat, index) => {
          const numberEl = section4Ref.current?.querySelector(
            `[data-stat-index="${index}"]`,
          );
          if (!numberEl) return;

          const counter = { value: 0 };
          gsap.to(counter, {
            value: stat.value,
            duration: 1.8,
            ease: "power2.out",
            snap: "suffix" in stat ? undefined : { value: 1 },
            scrollTrigger: {
              trigger: section4Ref.current,
              start: "top 60%",
              toggleActions: "play none none none",
            },
            onUpdate: () => {
              numberEl.textContent =
                "suffix" in stat
                  ? `${Math.round(counter.value)}${stat.suffix}`
                  : Math.round(counter.value).toLocaleString();
            },
          });
        });
      }

      // Section 5 — Exit teaser
      const exitPill = root.querySelector("#scroll-exit-pill");
      const exitPeek = root.querySelector("#scroll-exit-peek");

      if (section5Ref.current) {
        const tl5 = gsap.timeline({
          scrollTrigger: {
            trigger: section5Ref.current,
            start: "top top",
            end: "+=100%",
            scrub: 1,
            pin: true,
          },
        });

        if (exitPill) {
          tl5.to(exitPill, { opacity: 0, y: -16, ease: "power2.inOut" }, 0.15);
        }

        if (exitPeek) {
          tl5.fromTo(
            exitPeek,
            { y: 30, opacity: 0.4, filter: "blur(4px)" },
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              ease: "power2.out",
            },
            0.25,
          );
        }
      }
    }, root);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div id="scroll-experience" ref={rootRef} className="bg-[#0f0d0b]">
      {/* Section 1 */}
      <section
        ref={section1Ref}
        className="scroll-exp-section relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#0f0d0b]"
      >
        <div className="relative z-10 px-6 text-center">
          <h2
            className="font-heading font-extrabold leading-none tracking-[-0.02em] text-[#f5f0e8]"
            style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
          >
            <span id="word-open" className="inline-block">
              OPEN
            </span>{" "}
            <span id="word-a" className="inline-block">
              A
            </span>{" "}
            <span id="word-book" className="inline-block origin-center">
              BOOK.
            </span>
          </h2>
          <p className="mt-8 text-[11px] uppercase tracking-[0.28em] text-[#f5f0e8]/60">
            Scroll to explore
          </p>
          <div className="scroll-exp-bounce-arrow mx-auto mt-4 h-6 w-px bg-[#f5f0e8]/40" />
        </div>
        <div
          id="section1-overlay"
          className="pointer-events-none absolute inset-0 z-20 bg-black opacity-0"
        />
      </section>

      {/* Section 2 */}
      <section
        ref={section2Ref}
        className="scroll-exp-section relative h-screen w-full overflow-hidden bg-[#0f0d0b]"
      >
        <div className="relative h-screen w-screen overflow-hidden">
          {BOOKS.map((book) => (
            <div
              key={book.title}
              className="scroll-exp-book-card absolute h-[260px] w-[180px] rounded-lg border border-white/15 bg-cover bg-center"
              style={{ backgroundImage: `url(${book.cover})` }}
              role="img"
              aria-label={`${book.title} by ${book.author}`}
            />
          ))}
        </div>

        <p
          id="section2-headline"
          className="pointer-events-none absolute bottom-[12vh] left-1/2 z-30 w-full -translate-x-1/2 px-6 text-center font-heading text-[#f5f0e8] opacity-0"
          style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)" }}
        >
          Every book you&apos;ve ever loved.
        </p>

        <div
          id="section2-overlay"
          className="pointer-events-none absolute inset-0 z-40 bg-black opacity-0"
        />
      </section>

      {/* Section 3 */}
      <section
        ref={section3Ref}
        className="scroll-exp-section relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#0f0d0b] px-4"
      >
        <div className="w-full max-w-[100vw] space-y-2 sm:space-y-4">
          <div id="kinetic-line-1">
            <KineticLine text="TRACK EVERY" />
          </div>
          <div id="kinetic-line-2">
            <KineticLine text="PAGE. SAVE" />
          </div>
          <div id="kinetic-line-3">
            <KineticLine text="EVERY THOUGHT." />
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section
        ref={section4Ref}
        className="scroll-exp-section relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0f0d0b] px-6"
      >
        <div className="grid w-full max-w-5xl grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {STATS.map((stat, index) => (
            <div key={stat.label} className="scroll-exp-stat-column text-center">
              <div className="mb-4 h-px w-full bg-[#c8a97e]/70" />
              <p
                data-stat-index={index}
                className="font-heading text-[#f5f0e8]"
                style={{
                  fontSize: "clamp(2.5rem, 8vw, 5rem)",
                  fontWeight: 700,
                }}
              >
                {"suffix" in stat ? `0${stat.suffix}` : "0"}
              </p>
              <p className="mt-3 text-[13px] uppercase tracking-[0.18em] text-[#f5f0e8]/50">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="scroll-exp-marquee mt-16 w-full overflow-hidden border-y border-[#f5f0e8]/10 py-4">
          <div className="scroll-exp-marquee-track whitespace-nowrap text-[11px] uppercase tracking-[0.35em] text-[#f5f0e8]/35">
            TRACK &nbsp;·&nbsp; REFLECT &nbsp;·&nbsp; REMEMBER &nbsp;·&nbsp;
            DISCOVER &nbsp;·&nbsp; GROW &nbsp;·&nbsp; TRACK &nbsp;·&nbsp;
            REFLECT &nbsp;·&nbsp; REMEMBER &nbsp;·&nbsp; DISCOVER &nbsp;·&nbsp;
            GROW &nbsp;·&nbsp;
          </div>
        </div>
      </section>

      {/* Section 5 */}
      <section
        ref={section5Ref}
        className="scroll-exp-section relative h-screen w-full overflow-hidden bg-[#0f0d0b]"
      >
        <div className="relative z-10 flex h-screen flex-col items-center justify-center px-6">
          <button
            id="scroll-exit-pill"
            type="button"
            className="scroll-exp-pulse-pill h-12 w-[200px] rounded-full border border-[#f5f0e8]/30 bg-transparent text-[11px] uppercase tracking-[0.28em] text-[#f5f0e8]/80"
          >
            ↓ Continue to scroll ↓
          </button>
        </div>

        <div
          id="scroll-exit-peek"
          className="absolute left-0 right-0 top-[70vh] px-6 opacity-40"
          style={{ filter: "blur(4px)" }}
        >
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-[#f5f0e8]/10 bg-[#1a1612] px-8 py-12 text-center">
            <p className="text-xs uppercase tracking-[0.22em] text-[#c8a97e]">
              Reading Journey
            </p>
            <h3 className="mt-4 font-heading text-3xl text-[#f5f0e8] sm:text-4xl">
              Your reading life, mapped.
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#f5f0e8]/55">
              Follow the arc of what you read — from first page to finished
              shelf, with milestones that make progress feel meaningful.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
