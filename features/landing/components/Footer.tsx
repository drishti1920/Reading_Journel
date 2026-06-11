import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Journey", href: "#journey" },
  { label: "Quotes", href: "#quotes" },
] as const;

const SOCIAL_LINKS = [
  { label: "X", href: "#" },
  { label: "GitHub", href: "#" },
] as const;

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="footer-link inline-block py-1 text-sm text-text-secondary transition-colors duration-300 hover:text-text-primary"
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
          <div className="max-w-md">
            <p className="font-heading text-4xl font-normal tracking-[-0.02em] text-text-primary sm:text-5xl">
              Afterword
            </p>
            <p className="mt-4 text-base text-text-secondary sm:text-lg">
              A home for your reading life.
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-text-secondary/80 sm:text-[15px]">
              A place to track books, save quotes, and preserve your reading
              journey.
            </p>
          </div>

          <div className="flex flex-col gap-12 sm:flex-row sm:gap-20 lg:gap-24">
            <nav aria-label="Footer navigation">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                Navigation
              </p>
              <ul className="mt-5 space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Social links">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                Connect
              </p>
              <ul className="mt-5 space-y-3">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8 sm:mt-20 sm:pt-10">
          <p className="text-xs tracking-[0.06em] text-text-secondary/70">
            © 2026 Afterword
          </p>
        </div>
      </div>
    </footer>
  );
}
