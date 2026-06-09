"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

type Book = {
  title: string;
  author: string;
  pages: number;
  rating: number;
};

type Shelf = {
  genre: string;
  color: string;
  books: Book[];
};

const SHELVES: Shelf[] = [
  {
    genre: "Literary Fiction",
    color: "#3d5a80",
    books: [
      { title: "The Waves", author: "Virginia Woolf", pages: 229, rating: 5 },
      { title: "Middlemarch", author: "George Eliot", pages: 880, rating: 5 },
      { title: "Beloved", author: "Toni Morrison", pages: 324, rating: 5 },
      { title: "To the Lighthouse", author: "Virginia Woolf", pages: 209, rating: 4 },
      { title: "Never Let Me Go", author: "Kazuo Ishiguro", pages: 288, rating: 4 },
      { title: "The Goldfinch", author: "Donna Tartt", pages: 771, rating: 5 },
      { title: "A Little Life", author: "Hanya Yanagihara", pages: 720, rating: 4 },
    ],
  },
  {
    genre: "Philosophy",
    color: "#8b4513",
    books: [
      { title: "Meditations", author: "Marcus Aurelius", pages: 254, rating: 5 },
      { title: "Siddhartha", author: "Hermann Hesse", pages: 152, rating: 5 },
      { title: "The Stranger", author: "Albert Camus", pages: 123, rating: 4 },
      { title: "Thus Spoke Zarathustra", author: "Nietzsche", pages: 352, rating: 4 },
      { title: "The Republic", author: "Plato", pages: 416, rating: 5 },
      { title: "Being and Time", author: "Martin Heidegger", pages: 589, rating: 4 },
    ],
  },
  {
    genre: "Science Fiction",
    color: "#2d4a3e",
    books: [
      { title: "Dune", author: "Frank Herbert", pages: 896, rating: 5 },
      { title: "Solaris", author: "Stanisław Lem", pages: 224, rating: 5 },
      { title: "The Left Hand of Darkness", author: "Ursula K. Le Guin", pages: 286, rating: 5 },
      { title: "Hyperion", author: "Dan Simmons", pages: 482, rating: 4 },
      { title: "Blindsight", author: "Peter Watts", pages: 384, rating: 4 },
      { title: "Neuromancer", author: "William Gibson", pages: 271, rating: 5 },
      { title: "Foundation", author: "Isaac Asimov", pages: 244, rating: 4 },
    ],
  },
  {
    genre: "Essays & Memoir",
    color: "#6b2d8b",
    books: [
      { title: "The Year of Magical Thinking", author: "Joan Didion", pages: 227, rating: 5 },
      { title: "Between the World and Me", author: "Ta-Nehisi Coates", pages: 152, rating: 5 },
      { title: "Educated", author: "Tara Westover", pages: 334, rating: 4 },
      { title: "On Writing", author: "Stephen King", pages: 320, rating: 5 },
      { title: "Men We Reaped", author: "Jesmyn Ward", pages: 272, rating: 5 },
      { title: "The Argonauts", author: "Maggie Nelson", pages: 160, rating: 4 },
    ],
  },
  {
    genre: "History & Biography",
    color: "#5c4033",
    books: [
      { title: "Sapiens", author: "Yuval Noah Harari", pages: 443, rating: 5 },
      { title: "The Warmth of Other Suns", author: "Isabel Wilkerson", pages: 622, rating: 5 },
      { title: "Catherine the Great", author: "Robert K. Massie", pages: 656, rating: 4 },
      { title: "Team of Rivals", author: "Doris Kearns Goodwin", pages: 916, rating: 5 },
      { title: "The Diary of a Young Girl", author: "Anne Frank", pages: 283, rating: 5 },
      { title: "Leonardo da Vinci", author: "Walter Isaacson", pages: 624, rating: 4 },
    ],
  },
  {
    genre: "Poetry",
    color: "#4a3728",
    books: [
      { title: "Milk and Honey", author: "Rupi Kaur", pages: 208, rating: 4 },
      { title: "The Sun and Her Flowers", author: "Rupi Kaur", pages: 256, rating: 4 },
      { title: "Ariel", author: "Sylvia Plath", pages: 105, rating: 5 },
      { title: "The Collected Poems", author: "Emily Dickinson", pages: 770, rating: 5 },
      { title: "Citizen", author: "Claudia Rankine", pages: 160, rating: 5 },
      { title: "Leaves of Grass", author: "Walt Whitman", pages: 624, rating: 4 },
    ],
  },
  {
    genre: "Mystery & Thriller",
    color: "#1e3a5f",
    books: [
      { title: "The Silent Patient", author: "Alex Michaelides", pages: 336, rating: 4 },
      { title: "Gone Girl", author: "Gillian Flynn", pages: 432, rating: 5 },
      { title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson", pages: 590, rating: 4 },
      { title: "In the Woods", author: "Tana French", pages: 429, rating: 5 },
      { title: "The Thursday Murder Club", author: "Richard Osman", pages: 382, rating: 4 },
      { title: "Big Little Lies", author: "Liane Moriarty", pages: 460, rating: 5 },
    ],
  },
  {
    genre: "Fantasy",
    color: "#3b2f6e",
    books: [
      { title: "The Name of the Wind", author: "Patrick Rothfuss", pages: 662, rating: 5 },
      { title: "The Hobbit", author: "J.R.R. Tolkien", pages: 310, rating: 5 },
      { title: "The Priory of the Orange Tree", author: "Samantha Shannon", pages: 827, rating: 4 },
      { title: "A Court of Thorns and Roses", author: "Sarah J. Maas", pages: 416, rating: 4 },
      { title: "The Way of Kings", author: "Brandon Sanderson", pages: 1007, rating: 5 },
      { title: "Uprooted", author: "Naomi Novik", pages: 435, rating: 5 },
      { title: "Piranesi", author: "Susanna Clarke", pages: 272, rating: 5 },
    ],
  },
];

/** Extra vertical scroll per unit of horizontal travel — makes the walk feel longer */
const SCROLL_DISTANCE_MULTIPLIER = 1.65;

const TOTAL_BOOKS = SHELVES.reduce((sum, shelf) => sum + shelf.books.length, 0);

function spineHeight(pages: number) {
  return Math.min(420, Math.max(200, 200 + (pages / 1000) * 240));
}

function BookSpine({
  book,
  shelfColor,
}: {
  book: Book;
  shelfColor: string;
}) {
  const spineRef = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);
  const height = spineHeight(book.pages);

  useEffect(() => {
    const spine = spineRef.current;
    if (!spine) return;

    const onEnter = () => {
      setHovered(true);
      gsap.to(spine, {
        scaleY: 1.04,
        y: -6,
        filter: "brightness(1.15)",
        duration: 0.3,
        ease: "power2.out",
        transformOrigin: "bottom center",
      });
    };

    const onLeave = () => {
      setHovered(false);
      gsap.to(spine, {
        scaleY: 1,
        y: 0,
        filter: "brightness(1)",
        duration: 0.35,
        ease: "power2.out",
        transformOrigin: "bottom center",
      });
    };

    spine.addEventListener("mouseenter", onEnter);
    spine.addEventListener("mouseleave", onLeave);

    return () => {
      spine.removeEventListener("mouseenter", onEnter);
      spine.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="relative shrink-0">
      <div
        className={`pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 z-20 w-44 -translate-x-1/2 rounded-[10px] border border-accent/30 bg-[#1e1a16] px-3.5 py-2.5 text-left shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-opacity duration-200 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-sm font-semibold text-text-primary">{book.title}</p>
        <p className="mt-1 text-xs text-text-secondary">{book.author}</p>
        <p className="mt-1 text-[11px] text-text-secondary/70">
          {book.pages} pages
        </p>
      </div>

      <button
        ref={spineRef}
        type="button"
        className="relative flex w-[52px] shrink-0 cursor-pointer flex-col items-center justify-between rounded-t-[4px] px-2 py-4 sm:w-[72px]"
        style={{
          height,
          backgroundColor: shelfColor,
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.15) 100%)`,
        }}
        aria-label={`${book.title} by ${book.author}`}
      >
        <div
          className="flex max-h-[70%] flex-col items-center gap-2"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          <span className="max-h-40 truncate text-xs font-semibold tracking-[0.04em] text-white/90 sm:text-[13px]">
            {book.title}
          </span>
          <span className="truncate text-[10px] text-white/50 sm:text-[11px]">
            {book.author}
          </span>
        </div>

        <div className="flex flex-col items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              key={index}
              className="rounded-full"
              style={{
                width: 4,
                height: 4,
                backgroundColor:
                  index < book.rating
                    ? "#c8a97e"
                    : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
      </button>
    </div>
  );
}

function GenreShelf({
  shelf,
  shelfRef,
}: {
  shelf: Shelf;
  shelfRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={shelfRef}
      data-library-shelf
      className="min-w-[420px] shrink-0 snap-start sm:min-w-[480px]"
    >
      <div className="mb-7 flex items-baseline gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
          {shelf.genre}
        </p>
        <p className="text-xs text-text-secondary">
          {shelf.books.length} books
        </p>
      </div>

      <div className="flex items-end gap-2.5 px-3">
        {shelf.books.map((book) => (
          <div key={book.title} data-library-spine>
            <BookSpine book={book} shelfColor={shelf.color} />
          </div>
        ))}
      </div>

      <div
        className="mt-0 h-2 w-full rounded-[4px]"
        style={{
          background:
            "linear-gradient(to right, rgba(200,169,126,0.15), rgba(200,169,126,0.35), rgba(200,169,126,0.15))",
        }}
      />
      <div className="h-5 bg-gradient-to-b from-black/40 to-transparent" />
    </div>
  );
}

function ShelvesTrack({
  shelfRefs,
  mobileScroll,
}: {
  shelfRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  mobileScroll?: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-[12vw] pl-[12vw] pr-[20vw] ${
        mobileScroll
          ? "snap-x snap-mandatory overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          : "flex-row"
      }`}
    >
      {SHELVES.map((shelf, index) => (
        <GenreShelf
          key={shelf.genre}
          shelf={shelf}
          shelfRef={(el) => {
            shelfRefs.current[index] = el;
          }}
        />
      ))}
    </div>
  );
}

export default function LibrarySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const outerWrapperRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const genreLabelRef = useRef<HTMLParagraphElement>(null);
  const exitOverlayRef = useRef<HTMLDivElement>(null);
  const shelfRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const outer = outerWrapperRef.current;
    const track = trackRef.current;
    const pinContainer = pinContainerRef.current;
    const header = headerRef.current;
    const scrollHint = scrollHintRef.current;
    const progressFill = progressFillRef.current;
    const genreLabel = genreLabelRef.current;
    const exitOverlay = exitOverlayRef.current;

    if (!section) return;
    if (reducedMotion || isMobile) return;
    if (!outer || !track || !pinContainer) return;

    let horizontalTrigger: ScrollTrigger | null = null;
    let resizeTimer: ReturnType<typeof setTimeout>;
    const observers: IntersectionObserver[] = [];

    const setupHorizontalScroll = () => {
      if (!track || !outer || !pinContainer) return 0;

      horizontalTrigger?.kill();
      const trackWidth = track.scrollWidth;
      const horizontalTravel = Math.max(trackWidth - window.innerWidth, 0);
      const scrollDistance = horizontalTravel * SCROLL_DISTANCE_MULTIPLIER;
      outer.style.height = `${window.innerHeight + scrollDistance}px`;

      horizontalTrigger = ScrollTrigger.create({
        trigger: outer,
        start: "top top",
        end: () => `+=${scrollDistance}`,
        pin: pinContainer,
        scrub: 1.8,
        anticipatePin: 1,
        onUpdate: (self) => {
          const x = -(self.progress * horizontalTravel);
          gsap.set(track, { x, force3D: true });

          if (progressFill) {
            progressFill.style.width = `${self.progress * 100}%`;
          }

          if (genreLabel) {
            const shelfIndex = Math.min(
              SHELVES.length - 1,
              Math.floor(self.progress * SHELVES.length),
            );
            genreLabel.textContent = `Genre ${shelfIndex + 1} of ${SHELVES.length}`;
          }

          if (scrollHint) {
            gsap.to(scrollHint, {
              opacity: self.progress > 0.02 ? 0 : 1,
              duration: 0.3,
            });
          }

          if (exitOverlay) {
            gsap.to(exitOverlay, {
              opacity: self.progress > 0.92 ? 1 : 0,
              duration: 0.4,
            });
          }
        },
      });

      return scrollDistance;
    };

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setupHorizontalScroll();
        ScrollTrigger.refresh();
      }, 200);
    };

    const ctx = gsap.context(() => {
      const headerItems = header
        ? gsap.utils.toArray<HTMLElement>("[data-library-header]")
        : [];

      gsap.set(headerItems, { opacity: 0, y: 30 });
      gsap.to(headerItems, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: header,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      if (scrollHint) {
        gsap.from(scrollHint, {
          opacity: 0,
          duration: 0.6,
          delay: 0.35,
          ease: "power2.out",
          scrollTrigger: {
            trigger: header,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      }

      setupHorizontalScroll();

      shelfRefs.current.forEach((shelf) => {
        if (!shelf) return;

        const spines = shelf.querySelectorAll("[data-library-spine]");
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              gsap.from(spines, {
                opacity: 0,
                y: 12,
                duration: 0.4,
                stagger: 0.04,
                ease: "power2.out",
              });
              observer.disconnect();
            });
          },
          { root: pinContainer, threshold: 0.2 },
        );

        observer.observe(shelf);
        observers.push(observer);
      });

    }, section);

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      horizontalTrigger?.kill();
      observers.forEach((observer) => observer.disconnect());
      ctx.revert();
    };
  }, [isMobile, reducedMotion]);

  useEffect(() => {
    if (!reducedMotion && !isMobile) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(
        "[data-library-header], [data-library-shelf]",
      );

      items.forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, [isMobile, reducedMotion]);

  return (
    <section
      id="library"
      ref={sectionRef}
      className="border-b border-border bg-[#0f0d0b] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28 xl:px-20"
    >
      <div
        ref={headerRef}
        className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
      >
        <div className="max-w-2xl">
          <p
            data-library-header
            className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent"
          >
            YOUR LIBRARY
          </p>
          <h2
            data-library-header
            className="mt-5 font-heading text-[2.25rem] font-normal leading-[1.08] text-text-primary sm:text-[3.5rem] lg:text-[5rem]"
          >
            Every book finds its shelf.
          </h2>
          <p
            data-library-header
            className="mt-5 max-w-md text-base text-text-secondary"
          >
            Organised by the worlds they took you to.
          </p>
        </div>

        <div
          ref={scrollHintRef}
          data-library-header
          className="shrink-0 self-start rounded-full border border-accent/40 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-accent lg:self-end"
        >
          ← Scroll to browse →
        </div>
      </div>

      {reducedMotion ? (
        <div className="mx-auto mt-16 max-w-6xl space-y-16">
          {SHELVES.map((shelf, index) => (
            <GenreShelf
              key={shelf.genre}
              shelf={shelf}
              shelfRef={(el) => {
                shelfRefs.current[index] = el;
              }}
            />
          ))}
        </div>
      ) : isMobile ? (
        <div className="mx-auto mt-12 max-w-6xl">
          <div ref={trackRef}>
            <ShelvesTrack shelfRefs={shelfRefs} mobileScroll />
          </div>
        </div>
      ) : (
        <div ref={outerWrapperRef} className="relative mt-14 sm:mt-16">
          <div
            ref={pinContainerRef}
            className="relative h-screen overflow-hidden"
          >
            <div className="flex h-full items-end pb-[12vh]">
              <div ref={trackRef} className="will-change-transform">
                <ShelvesTrack shelfRefs={shelfRefs} />
              </div>
            </div>

            <div
              ref={exitOverlayRef}
              className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-black/20 opacity-0"
            >
              <p className="font-heading text-2xl text-text-primary sm:text-3xl">
                {TOTAL_BOOKS} books and counting.
              </p>
            </div>

            <div className="absolute bottom-8 left-[10vw] right-[10vw] z-20">
              <div className="mb-2 flex items-center justify-between gap-4">
                <div className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/10">
                  <div
                    ref={progressFillRef}
                    className="h-full w-0 bg-accent transition-none"
                  />
                </div>
                <p
                  ref={genreLabelRef}
                  className="shrink-0 text-[10px] uppercase tracking-[0.18em] text-text-secondary"
                >
                  Genre 1 of {SHELVES.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
