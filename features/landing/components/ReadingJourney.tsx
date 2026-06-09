"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  {
    month: "Jan",
    side: "left" as const,
    title: "The Goldfinch",
    details: ["Finished reading", "3 favorite quotes saved"],
  },
  {
    month: "Feb",
    side: "right" as const,
    title: "The Secret History",
    details: ["Started reading", "Added to current shelf"],
  },
  {
    month: "Mar",
    side: "left" as const,
    title: "Discovered Virginia Woolf",
    details: ["Saved 8 new quotes"],
  },
  {
    month: "Apr",
    side: "right" as const,
    title: "Reading streak",
    details: ["27 consecutive days"],
  },
];

function TimelineCard({
  month,
  title,
  details,
  side,
}: {
  month: string;
  title: string;
  details: string[];
  side: "left" | "right";
}) {
  return (
    <article
      data-journey-card
      data-side={side}
      className={`journey-card relative w-[calc(100%-3rem)] rounded-2xl border border-border bg-card p-5 sm:p-6 md:w-[calc(50%-2.75rem)] ${
        side === "right" ? "ml-auto md:ml-auto" : "ml-auto md:ml-0"
      }`}
    >
      <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-accent sm:text-[11px]">
        {month}
      </p>
      <h3 className="mt-3 font-heading text-xl leading-snug text-text-primary sm:text-2xl">
        {title}
      </h3>
      <ul className="mt-4 space-y-1.5">
        {details.map((detail) => (
          <li
            key={detail}
            className="text-sm leading-relaxed text-text-secondary"
          >
            {detail}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function ReadingJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;
    const line = lineRef.current;
    if (!section || !timeline || !line) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-journey-card]");
      const dots = gsap.utils.toArray<HTMLElement>("[data-journey-dot]");

      if (reducedMotion) {
        gsap.set(line, { scaleY: 1 });
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(line, { scaleY: 0, transformOrigin: "top center" });

      gsap.to(line, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: timeline,
          start: "top 75%",
          end: "bottom 85%",
          scrub: 1,
        },
      });

      cards.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          delay: index * 0.05,
        });
      });

      dots.forEach((dot) => {
        gsap.from(dot, {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: dot,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="border-b border-border bg-background px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28 xl:px-20"
    >
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent sm:text-sm">
          Reading Journey
        </p>
        <h2 className="mt-5 font-heading text-[2rem] font-normal leading-[1.1] tracking-[-0.01em] text-text-primary sm:text-4xl lg:text-[2.75rem]">
          A year told through books.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-text-secondary sm:mt-6 sm:text-lg">
          Every book, quote, and idea becomes part of your reading story.
        </p>
      </div>

      <div
        ref={timelineRef}
        className="relative mx-auto mt-16 max-w-3xl sm:mt-20 lg:mt-24"
      >
        <div
          ref={lineRef}
          className="absolute bottom-0 left-4 top-0 w-px bg-accent/35 md:left-1/2 md:-translate-x-1/2"
          aria-hidden="true"
        />

        <div className="relative space-y-14 sm:space-y-16 md:space-y-20">
          {MILESTONES.map((milestone) => (
            <div key={milestone.month} className="relative md:min-h-[7rem]">
              <span
                data-journey-dot
                className="absolute left-4 top-6 z-10 h-2 w-2 -translate-x-1/2 rounded-full bg-accent ring-4 ring-background md:left-1/2"
                aria-hidden="true"
              />

              <TimelineCard
                month={milestone.month}
                title={milestone.title}
                details={milestone.details}
                side={milestone.side}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
