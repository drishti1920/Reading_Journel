"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Journey", href: "#journey" },
  { label: "Quotes", href: "#quotes" },
  { label: "Library", href: "#library" },
] as const;

function PillButton({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex cursor-pointer items-center justify-center rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] transition-colors duration-200 sm:px-6 sm:py-3 sm:text-sm ${className}`}
    >
      {children}
    </button>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

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
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 w-full bg-transparent transition-colors duration-300"
    >
      <div className="mx-auto flex w-full max-w-[100rem] items-center justify-between px-6 pb-3 pt-5 sm:px-10 sm:pb-3.5 sm:pt-6 lg:px-16 lg:pb-4 lg:pt-7 xl:px-20">
        <Link
          href="#home"
          className="font-heading text-[1.75rem] font-medium leading-none tracking-[0.03em] text-text-primary transition-colors duration-300 hover:text-accent sm:text-[2rem] lg:text-[2.25rem]"
        >
          AFTERWORD
        </Link>

        <div className="flex items-center gap-2.5 sm:gap-3">
        

          <PillButton className="hidden bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-950 md:inline-flex">
            Start Reading
            <span className="ml-2.5 h-1.5 w-1.5 rounded-full bg-white" />
          </PillButton>

          <PillButton
            onClick={() => setIsOpen((open) => !open)}
            className={`group w-[7.5rem] ${
              isOpen
                ? "bg-white text-neutral-900"
                : "bg-white text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200"
            }`}
            aria-expanded={isOpen}
            aria-controls="nav-menu"
          >
            <span className="inline-block w-[2.875rem] text-left">
              {isOpen ? "Close" : "Menu"}
            </span>
            <span className="relative ml-2.5 inline-flex h-4 w-4 shrink-0 items-center justify-center">
              <span
                className={`absolute inset-0 flex items-center justify-center gap-1 transition-opacity duration-200 ${
                  isOpen ? "opacity-0" : "opacity-100 group-hover:opacity-0"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
              </span>
              <span
                className={`absolute inset-0 flex flex-col items-center justify-center gap-1 transition-opacity duration-200 ${
                  isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
              </span>
            </span>
          </PillButton>
        </div>
      </div>

      <div
        id="nav-menu"
        className={`fixed inset-x-4 top-[4.5rem] z-[60] transition-all duration-300 ease-out sm:inset-x-auto sm:right-10 sm:left-auto sm:top-[4.75rem] lg:right-16 xl:right-20 ${
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <div className="mx-auto flex w-full max-w-sm flex-col gap-3 sm:mx-0 sm:w-80 lg:w-96">
          <nav className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="group flex cursor-pointer items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-neutral-900 transition-colors duration-200 hover:bg-neutral-100 active:bg-neutral-200 sm:text-base"
                  >
                    <span>{link.label}</span>
                    {link.href === "#home" && (
                      <span className="h-1.5 w-1.5 rounded-full bg-neutral-900" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-col gap-2 border-t border-neutral-200 pt-4 md:hidden">
              <PillButton className="w-full border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-200">
                Login
              </PillButton>
              <PillButton className="w-full bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-950">
                Start Reading
                <span className="ml-2.5 h-1.5 w-1.5 rounded-full bg-white" />
              </PillButton>
            </div>
          </nav>

          <div className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="font-heading text-xl leading-snug text-neutral-900 sm:text-2xl">
              Start building your reading history.
            </h3>
            <PillButton className="mt-6 w-full bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-950 sm:mt-8">
              Get Started
            </PillButton>
          </div>
        </div>
      </div>
    </header>
  );
}
