// components/Footer.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";

import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SERVICE_LINKS = [
  { label: "General Hospital", href: "/hospital" },
  { label: "Diagnostic Center", href: "/diagnosis" },
  { label: "Drug Manufacturing", href: "/pharma" },
];

const SOCIALS = [
  { icon: FaFacebook, href: "#", label: "Facebook" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
];

// Mobile-only accordion wrapper for columns 2–4.
function FooterAccordion({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-white/10 py-5 md:border-none md:py-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left md:pointer-events-none"
      >
        <span className="text-sm font-semibold tracking-wide text-ivory">
          {title}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-ivory/60 transition-transform duration-300 md:hidden ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 md:mt-5 md:grid-rows-[1fr] md:opacity-100 ${
          isOpen
            ? "mt-4 grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0 md:mt-5"
        }`}
      >
        <div className="min-h-0">{children}</div>
      </div>
    </div>
  );
}

export default function Footer() {
  const [openSection, setOpenSection] = useState<number | null>(null);
  const [inView, setInView] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggle = (i: number) =>
    setOpenSection((prev) => (prev === i ? null : i));

  return (
    <footer
      ref={footerRef}
      className={`bg-ink text-ivory transition-opacity duration-700 ease-out ${
        inView ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Newsletter strip */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-6 py-10 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h3 className="text-lg font-semibold text-ivory">
              Stay in the loop
            </h3>
            <p className="mt-1 text-sm text-ivory/60">
              Health tips, appointment reminders, and updates from Afilas Group.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full max-w-sm flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-ivory placeholder:text-ivory/40 outline-none focus:border-sage-300"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-sage-600 px-6 py-3 text-sm font-medium text-white transition-transform duration-200 hover:scale-105 hover:bg-sage-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Columns */}
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-x-10 md:grid-cols-4">
          {/* Column 1 — logo, tagline, socials (always visible) */}
          <div className="pb-6 md:pb-0">
            <Link href="/" className="flex items-center gap-2">
              <svg
                width="28"
                height="28"
                viewBox="0 0 30 30"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="15" cy="15" r="14" className="fill-white/10" />
                <path
                  d="M15 8v14M8 15h14"
                  stroke="#F7F5EF"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-lg font-semibold tracking-tight text-ivory">
                Afilas
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/60">
              One group, complete care — hospital, diagnostics, and
              pharmaceutical manufacturing under one roof.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-ivory/70 transition-colors hover:bg-sage-600 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <FooterAccordion
            title="Quick Links"
            isOpen={openSection === 0}
            onToggle={() => toggle(0)}
          >
            <ul className="space-y-3 pb-1">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/60 hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterAccordion>

          {/* Column 3 — Services */}
          <FooterAccordion
            title="Services"
            isOpen={openSection === 1}
            onToggle={() => toggle(1)}
          >
            <ul className="space-y-3 pb-1">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/60 hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterAccordion>

          {/* Column 4 — Contact Info */}
          <FooterAccordion
            title="Contact Info"
            isOpen={openSection === 2}
            onToggle={() => toggle(2)}
          >
            <ul className="space-y-3 pb-1 text-sm text-ivory/60">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ivory/40" />
                <span>Bahir Dar, Amhara, Ethiopia</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-ivory/40" />
                <span>+251 911 000 000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-ivory/40" />
                <span>care@afilasgroup.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-ivory/40" />
                <span>Mon–Sat: 7:00 AM – 9:00 PM</span>
              </li>
              <li className="flex items-center gap-2 pt-1">
                <span className="flex items-center gap-1.5 rounded-full bg-sage-600/20 px-3 py-1.5 text-xs font-medium text-sage-300">
                  <Phone className="h-3 w-3" />
                  Emergency: +251 911 000 000
                </span>
              </li>
            </ul>

            <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-ivory/45">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Your health information is protected and confidential.
            </p>
          </FooterAccordion>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 py-6 text-xs text-ivory/50 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Afilas Group. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-ivory">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-ivory">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
