"use client";

import gsap from "gsap";
import Link from "next/link";
import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Journey", href: "#journey" },
  { label: "Quotes", href: "#quotes" },
  { label: "Library", href: "#library" },
] as const;

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <span
      className={`menu-icon ml-3 text-neutral-900 ${isOpen ? "menu-icon--open" : ""}`}
      aria-hidden="true"
    >
      <span className="menu-icon__wrapper">
        <span className="menu-icon__row">
          <span className="menu-icon__dot" />
          <span className="menu-icon__dot" />
        </span>
        <span className="menu-icon__row menu-icon__row-bottom">
          <span className="menu-icon__dot" />
          <span className="menu-icon__dot" />
        </span>
        <span className="menu-icon__row-vertical">
          <span className="menu-icon__dot" />
          <span className="menu-icon__dot menu-icon__dot-middle-v" />
          <span className="menu-icon__dot" />
        </span>
        <span className="menu-icon__row-horizontal">
          <span className="menu-icon__dot" />
          <span className="menu-icon__dot menu-icon__dot-middle-h" />
          <span className="menu-icon__dot" />
        </span>
      </span>
    </span>
  );
}

function StartReadingButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      className={`group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full bg-neutral-900 px-6 py-2.5 text-[13px] font-medium uppercase tracking-[0.14em] text-white outline-offset-4 transition-transform duration-300 ease-in-out focus:outline focus:outline-2 focus:outline-white focus:outline-offset-4 sm:px-7 sm:py-3 sm:text-sm ${className}`}
    >
      <span className="relative z-20 inline-flex items-center">
        Start Reading
        <span className="ml-3 h-1.5 w-1.5 rounded-full bg-white" />
      </span>
      <span className="absolute left-[-75%] top-0 z-10 h-full w-[50%] rotate-12 bg-white/20 blur-lg transition-all duration-1000 ease-in-out group-hover:left-[125%]" />
      <span className="absolute left-0 top-0 block h-[20%] w-1/2 rounded-tl-full border-l-2 border-t-2 border-accent/50 transition-all duration-300" />
      <span className="absolute right-0 top-0 block h-[60%] w-1/2 rounded-tr-full border-r-2 border-t-2 border-accent/50 transition-all duration-300 group-hover:h-[90%]" />
      <span className="absolute bottom-0 left-0 block h-[60%] w-1/2 rounded-bl-full border-b-2 border-l-2 border-accent/50 transition-all duration-300 group-hover:h-[90%]" />
      <span className="absolute bottom-0 right-0 block h-[20%] w-1/2 rounded-br-full border-b-2 border-r-2 border-accent/50 transition-all duration-300" />
    </button>
  );
}

const PillButton = forwardRef<
  HTMLButtonElement,
  {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }
>(function PillButton({ children, className = "", onClick }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={`inline-flex cursor-pointer items-center justify-center rounded-full px-6 py-2.5 text-[13px] font-medium uppercase tracking-[0.14em] transition-[color,background-color] duration-300 ease-out sm:px-7 sm:py-3 sm:text-sm ${className}`}
    >
      {children}
    </button>
  );
});

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuLabel, setMenuLabel] = useState<"Menu" | "Close">("Menu");
  const navRef = useRef<HTMLElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const ctaCardRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLLIElement[]>([]);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const isFirstRender = useRef(true);

  useLayoutEffect(() => {
    const panel = menuPanelRef.current;
    const navItems = navItemsRef.current.filter(Boolean);
    const ctaCard = ctaCardRef.current;

    if (!panel) return;

    gsap.set(panel, {
      opacity: 0,
      y: 12,
      scale: 0.98,
      pointerEvents: "none",
      transformOrigin: "top right",
    });
    gsap.set(navItems, { opacity: 0, x: 10 });
    if (ctaCard) {
      gsap.set(ctaCard, { opacity: 0, x: 8 });
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const panel = menuPanelRef.current;
    const navItems = navItemsRef.current.filter(Boolean);
    const ctaCard = ctaCardRef.current;

    if (!panel) return;

    menuTimelineRef.current?.kill();

    if (isOpen) {
      gsap.set(panel, { pointerEvents: "auto" });

      menuTimelineRef.current = gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(panel, { opacity: 1, y: 0, scale: 1, duration: 0.52 }, 0)
        .to(
          navItems,
          { opacity: 1, x: 0, duration: 0.42, stagger: 0.06 },
          0.2
        )
        .to(ctaCard, { opacity: 1, x: 0, duration: 0.4 }, 0.34);
    } else {
      menuTimelineRef.current = gsap
        .timeline({
          defaults: { ease: "power3.inOut" },
          onComplete: () => {
            gsap.set(panel, { pointerEvents: "none" });
            document.body.style.overflow = "";
            setMenuLabel("Menu");
          },
        })
        .to(
          navItems,
          {
            opacity: 0,
            x: 8,
            duration: 0.3,
            stagger: { each: 0.05, from: "end" },
          },
          0
        )
        .to(ctaCard, { opacity: 0, x: 8, duration: 0.28 }, 0.1)
        .to(
          panel,
          { opacity: 0, y: 8, scale: 0.98, duration: 0.45 },
          0.18
        );
    }
  }, [isOpen]);

  function toggleMenu() {
    if (!isOpen) {
      setMenuLabel("Close");
      setIsOpen(true);
      return;
    }

    setIsOpen(false);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header ref={navRef} className="sticky top-0 z-50 w-full bg-transparent">
      <div className="mx-auto flex w-full max-w-[100rem] items-center justify-between px-6 pb-3 pt-5 sm:px-10 sm:pb-3.5 sm:pt-6 lg:px-16 lg:pb-4 lg:pt-7 xl:px-20">
        <Link
          href="#home"
          className="font-sans text-lg font-semibold uppercase leading-none tracking-[0.16em] text-text-primary transition-colors duration-300 ease-out hover:text-accent sm:text-xl lg:text-[1.375rem]"
        >
          Afterword
        </Link>

        <div className="flex items-center gap-3 sm:gap-3.5">

          <StartReadingButton className="hidden md:inline-flex" />

          <PillButton
            ref={menuButtonRef}
            onClick={toggleMenu}
            className={`group w-[7.75rem] transition-[transform,background-color,color] duration-300 ease-out ${
              isOpen
                ? "translate-y-0 bg-white text-neutral-900"
                : "bg-white/95 text-neutral-900 hover:-translate-y-px hover:bg-white hover:text-neutral-950 active:translate-y-0 active:bg-neutral-100"
            }`}
            aria-expanded={isOpen}
            aria-controls="nav-menu"
          >
            <span className="inline-block w-[2.875rem] text-left">
              {menuLabel}
            </span>
            <MenuIcon isOpen={isOpen} />
          </PillButton>
        </div>
      </div>

      <div
        id="nav-menu"
        ref={menuPanelRef}
        className="fixed inset-x-4 top-[5.5rem] z-[60] sm:inset-x-auto sm:right-10 sm:left-auto sm:top-[5.75rem] lg:right-16 xl:right-20"
      >
        <div className="mx-auto flex w-full max-w-sm flex-col gap-3.5 sm:mx-0 sm:w-[22rem] lg:w-[24rem]">
          <nav className="rounded-[2rem] border border-neutral-200/90 bg-white p-7 sm:p-8">
            <ul className="flex flex-col gap-0.5">
              {NAV_LINKS.map((link, index) => (
                <li
                  key={link.href}
                  ref={(element) => {
                    if (element) navItemsRef.current[index] = element;
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="group flex cursor-pointer items-center justify-between rounded-2xl px-4 py-4 text-[15px] font-medium uppercase tracking-[0.16em] text-neutral-900 transition-colors duration-300 ease-out hover:bg-neutral-50 active:bg-neutral-100"
                  >
                    <span>{link.label}</span>
                    {link.href === "#home" && (
                      <span className="h-1.5 w-1.5 rounded-full bg-neutral-900" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-col gap-2.5 border-t border-neutral-200/80 pt-5 md:hidden">
              <PillButton className="w-full border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 active:bg-neutral-100">
                Login
              </PillButton>
              <StartReadingButton className="w-full" />
            </div>
          </nav>

          <div
            ref={ctaCardRef}
            className="rounded-[2rem] border border-neutral-200/90 bg-white p-7 sm:p-8"
          >
            <h3 className="font-heading text-[1.375rem] font-normal leading-[1.35] tracking-[0.01em] text-neutral-900 sm:text-2xl">
              Start building your reading history.
            </h3>
            <PillButton className="mt-7 w-full bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-950 sm:mt-8">
              Get Started
            </PillButton>
          </div>
        </div>
      </div>
    </header>
  );
}
