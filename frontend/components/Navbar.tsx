// components/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";

const SCROLL_THRESHOLD = 50;
const EMERGENCY_PHONE = "+251 911 000 000";
const EMERGENCY_TEL_HREF = "tel:+251911000000";

type NavLink = {
  label: string;
  href: string;
  shortLines?: [string, string]; 
};

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Afilas General Hospital",
    href: "/hospital",
    shortLines: ["Afilas General", "Hospital"],
  },
  {
    label: "Afilas Diagnosis Center",
    href: "/diagnosis",
    shortLines: ["Afilas Diagnosis", "Center"],
  },
  {
    label: "Afilas Drug Manufacturing",
    href: "/pharma",
    shortLines: ["Afilas Drug", "Manufacturing"],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Top strip */}
      <div className="bg-ink text-ivory text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-6 py-1.5 sm:justify-end">
          <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <a
            href={EMERGENCY_TEL_HREF}
            className="tracking-wide transition-colors hover:text-sage-300"
          >
            Emergency Line: {EMERGENCY_PHONE}
          </a>
        </div>
      </div>

      {/* Navbar */}
      <nav
        className={[
          "transition-colors duration-300",
          scrolled
            ? "bg-white/95 shadow-[0_1px_16px_rgba(15,23,18,0.08)] backdrop-blur-sm"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="15"
                cy="15"
                r="14"
                className={scrolled ? "fill-sage-50" : "fill-white/15"}
              />
              <path
                d="M15 8v14M8 15h14"
                stroke={scrolled ? "#4B6B45" : "#FFFFFF"}
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
            <span
              className={[
                "text-lg font-semibold tracking-tight transition-colors duration-300",
                scrolled ? "text-ink" : "text-ink",
              ].join(" ")}
            >
              Afilas
            </span>
          </Link>

          {/* Center links — desktop */}
          <ul className="hidden h-12 items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href} className="flex h-full items-center">
                  <Link
                    href={link.href}
                    className={[
                      "text-center text-[0.925rem] leading-snug transition-colors duration-300",
                      active
                        ? scrolled
                          ? "font-semibold text-sage-700"
                          : "font-semibold text-sage-600"
                        : scrolled
                          ? "text-ink/70 hover:text-ink"
                          : "text-ink/80 hover:text-ink",
                    ].join(" ")}
                  >
                    {link.shortLines ? (
                      <>
                        {link.shortLines[0]}
                        <br />
                        {link.shortLines[1]}
                      </>
                    ) : (
                      link.label
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA — desktop */}
          <Link
            href="/book"
            className="hidden shrink-0 items-center justify-center rounded-full bg-sage-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-transform duration-200 hover:scale-105 hover:bg-sage-700 lg:inline-flex"
          >
            Book Appointment
          </Link>

          {/* Hamburger — mobile */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className={[
              "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 lg:hidden",
              scrolled ? "text-ink" : "text-ink/80 hover:text-ink",
            ].join(" ")}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        aria-hidden={!mobileOpen}
        className={[
          "fixed inset-0 z-40 bg-ink lg:hidden",
          "transition-opacity duration-300 ease-out",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
      >
        <div
          className={[
            "flex h-full flex-col items-center justify-center gap-10 px-8",
            "transition-all duration-300 ease-out",
            mobileOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-3 opacity-0",
          ].join(" ")}
        >
          <ul className="flex flex-col items-center gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={[
                    "text-2xl font-medium transition-colors",
                    isActive(link.href)
                      ? "text-sage-300"
                      : "text-white/90 hover:text-white",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/book"
            onClick={() => setMobileOpen(false)}
            className="inline-flex w-full max-w-xs items-center justify-center rounded-full bg-sage-600 px-6 py-3.5 text-base font-medium text-white shadow-sm transition-transform duration-200 hover:scale-105 hover:bg-sage-700"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </header>
  );
}
