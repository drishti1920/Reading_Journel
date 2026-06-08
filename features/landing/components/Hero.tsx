"use client";

import gsap from "gsap";
import Link from "next/link";
import { forwardRef, useEffect, useRef } from "react";

const ShowcaseCard = forwardRef<
  HTMLDivElement,
  {
    label: string;
    className?: string;
    children: React.ReactNode;
  }
>(function ShowcaseCard({ label, className = "", children }, ref) {
  return (
    <div
      ref={ref}
      className={`rounded-2xl border border-border bg-card p-4 sm:p-5 ${className}`}
    >
      <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-text-secondary sm:text-[11px]">
        {label}
      </p>
      {children}
    </div>
  );
});

const CARD_MOTION = [
  { parallax: 12, floatAmp: 4, floatDuration: 10, floatPhase: 0, repulsion: 24 },
  { parallax: 22, floatAmp: 5, floatDuration: 9, floatPhase: 1.2, repulsion: 26 },
  { parallax: 12, floatAmp: 3.5, floatDuration: 12, floatPhase: 2.4, repulsion: 22 },
  { parallax: 25, floatAmp: 6, floatDuration: 8, floatPhase: 0.8, repulsion: 28 },
  { parallax: 8, floatAmp: 3, floatDuration: 14, floatPhase: 1.8, repulsion: 20 },
] as const;

function useShowcaseMotion(
  containerRef: React.RefObject<HTMLDivElement | null>,
  cardRefs: React.RefObject<(HTMLDivElement | null)[]>
) {
  useEffect(() => {
    if (!containerRef.current) return;
    const showcase: HTMLDivElement = containerRef.current;

    const pointer = { x: 0.5, y: 0.5, clientX: -9999, clientY: -9999, active: false };
    const offsets = CARD_MOTION.map(() => ({ x: 0, y: 0, repX: 0, repY: 0 }));

    function handlePointerMove(event: PointerEvent) {
      const rect = showcase.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width;
      pointer.y = (event.clientY - rect.top) / rect.height;
      pointer.clientX = event.clientX;
      pointer.clientY = event.clientY;
      pointer.active = true;
    }

    function handlePointerLeave() {
      pointer.active = false;
    }

    function update() {
      const cards = cardRefs.current;
      const time = performance.now() * 0.001;

      CARD_MOTION.forEach((config, index) => {
        const element = cards[index];
        if (!element) return;

        const targetParallaxX = pointer.active
          ? (pointer.x - 0.5) * config.parallax * 2
          : 0;
        const targetParallaxY = pointer.active
          ? (pointer.y - 0.5) * config.parallax * 2
          : 0;

        offsets[index].x += (targetParallaxX - offsets[index].x) * 0.08;
        offsets[index].y += (targetParallaxY - offsets[index].y) * 0.08;

        const floatX =
          Math.sin((time / config.floatDuration) * Math.PI * 2 + config.floatPhase) *
          config.floatAmp;
        const floatY =
          Math.cos((time / config.floatDuration) * Math.PI * 2 + config.floatPhase) *
          config.floatAmp *
          0.65;

        let targetRepX = 0;
        let targetRepY = 0;

        if (pointer.active) {
          const rect = element.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const dx = centerX - pointer.clientX;
          const dy = centerY - pointer.clientY;
          const distance = Math.hypot(dx, dy);
          const radius = 110;

          if (distance < radius && distance > 0) {
            const strength = (1 - distance / radius) * config.repulsion;
            targetRepX = (dx / distance) * strength;
            targetRepY = (dy / distance) * strength;
          }
        }

        offsets[index].repX += (targetRepX - offsets[index].repX) * 0.1;
        offsets[index].repY += (targetRepY - offsets[index].repY) * 0.1;

        gsap.set(element, {
          x: offsets[index].x + floatX + offsets[index].repX,
          y: offsets[index].y + floatY + offsets[index].repY,
          force3D: true,
        });
      });
    }

    showcase.addEventListener("pointermove", handlePointerMove);
    showcase.addEventListener("pointerleave", handlePointerLeave);
    gsap.ticker.add(update);

    return () => {
      showcase.removeEventListener("pointermove", handlePointerMove);
      showcase.removeEventListener("pointerleave", handlePointerLeave);
      gsap.ticker.remove(update);

      cardRefs.current.forEach((element) => {
        if (element) gsap.set(element, { clearProps: "transform" });
      });
    };
  }, [containerRef, cardRefs]);
}

export default function Hero() {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useShowcaseMotion(showcaseRef, cardRefs);

  return (
    <section
      id="home"
      className="border-b border-border px-6 pb-20 pt-12 sm:px-10 sm:pb-24 sm:pt-16 lg:px-16 lg:pb-28 lg:pt-20 xl:px-20"
    >
      <div className="mx-auto grid w-full max-w-[100rem] items-center gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-24">
        <div className="flex flex-col justify-center lg:max-w-xl xl:max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent sm:text-sm">
            Afterword
          </p>

          <h1 className="mt-5 font-heading text-[2.5rem] font-normal leading-[1.08] tracking-[-0.01em] text-text-primary sm:mt-6 sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem]">
            Every book leaves something behind.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-text-secondary sm:mt-8 sm:text-lg sm:leading-relaxed">
            Track every book you&apos;ve read, save meaningful quotes, and build a
            personal archive of ideas that stay with you.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
            <button
              type="button"
              className="inline-flex cursor-pointer items-center justify-center rounded-full bg-accent px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.14em] text-background transition-colors duration-300 hover:bg-accent-hover sm:text-sm"
            >
              Start Reading
              <span className="ml-3 h-1.5 w-1.5 rounded-full bg-background" />
            </button>

            <Link
              href="#journey"
              className="inline-flex items-center justify-center rounded-full border border-border px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.14em] text-text-primary transition-colors duration-300 hover:border-text-secondary hover:text-text-secondary sm:text-sm"
            >
              Explore Journey
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div
            ref={showcaseRef}
            className="relative min-h-[30rem] overflow-hidden rounded-[2rem] border border-border bg-surface p-6 sm:min-h-[34rem] sm:rounded-[2.5rem] sm:p-8 lg:min-h-[38rem]"
          >
            <ShowcaseCard
              ref={(element) => {
                cardRefs.current[0] = element;
              }}
              label="Book"
              className="absolute left-6 top-6 z-20 w-[11.5rem] sm:left-8 sm:top-8 sm:w-[13rem]"
            >
              <p className="font-heading text-lg leading-snug text-text-primary sm:text-xl">
                The Goldfinch
              </p>
              <p className="mt-1 text-sm text-text-secondary">Donna Tartt</p>
              <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-background">
                <div className="h-full w-[62%] rounded-full bg-accent" />
              </div>
              <p className="mt-2 text-xs text-text-secondary">Page 482 of 775</p>
            </ShowcaseCard>

            <ShowcaseCard
              ref={(element) => {
                cardRefs.current[1] = element;
              }}
              label="Quote"
              className="absolute right-6 top-6 z-30 w-[10.5rem] sm:right-10 sm:top-8 sm:w-48"
            >
              <p className="font-heading text-sm italic leading-relaxed text-text-primary sm:text-[15px]">
                &ldquo;Books are a uniquely portable magic.&rdquo;
              </p>
              <p className="mt-3 text-xs text-text-secondary">Stephen King</p>
            </ShowcaseCard>

            <ShowcaseCard
              ref={(element) => {
                cardRefs.current[2] = element;
              }}
              label="Author"
              className="absolute left-8 top-[12rem] z-10 w-[9rem] sm:left-10 sm:top-[14rem] sm:w-[10rem]"
            >
              <p className="text-sm font-medium text-text-primary">Virginia Woolf</p>
              <p className="mt-1 text-xs text-text-secondary">8 books in archive</p>
            </ShowcaseCard>

            <ShowcaseCard
              ref={(element) => {
                cardRefs.current[3] = element;
              }}
              label="Bookmark"
              className="absolute right-6 top-[11rem] z-20 w-[8.5rem] sm:right-10 sm:top-[12.5rem] sm:w-36"
            >
              <p className="text-sm text-text-primary">Chapter 14</p>
              <p className="mt-1 text-xs text-text-secondary">Saved yesterday</p>
            </ShowcaseCard>

            <ShowcaseCard
              ref={(element) => {
                cardRefs.current[4] = element;
              }}
              label="Reading Progress"
              className="absolute bottom-6 left-6 right-6 z-30 sm:bottom-8 sm:left-8 sm:right-8"
            >
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-2xl font-heading text-text-primary sm:text-3xl">
                    68%
                  </p>
                  <p className="mt-1 text-xs text-text-secondary">
                    Annual reading goal
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-text-primary">24 books</p>
                  <p className="mt-1 text-xs text-text-secondary">of 35 planned</p>
                </div>
              </div>
              <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-background">
                <div className="h-full w-[68%] rounded-full bg-accent" />
              </div>
            </ShowcaseCard>
          </div>
        </div>
      </div>
    </section>
  );
}
