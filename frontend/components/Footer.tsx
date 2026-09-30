// components/Footer.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronDown,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const QUICK_LINKS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
];

const SERVICE_LINKS = [
  {
    key: "hospital",
    href: "/hospital",
  },
  {
    key: "diagnosis",
    href: "/diagnosis",
  },
  {
    key: "pharma",
    href: "/pharma",
  },
  {
    key: "appointment",
    href: "/book",
  },
];

const SOCIALS = [
  {
    icon: FaFacebook,
    href: "https://www.facebook.com/",
    label: "Facebook",
  },
  {
    icon: FaInstagram,
    href: "http://www.instagram.com/",
    label: "Instagram",
  },
  {
    icon: FaTwitter,
    href: "http://www.twitter.com/",
    label: "Twitter",
  },
  {
    icon: FaLinkedin,
    href: "http://www.linkedin.com/",
    label: "LinkedIn",
  },
];

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
    <div
      className="
        border-b border-slate-200
        py-5
        dark:border-white/10
        md:border-none
        md:py-0
      "
    >
      <button
        type="button"
        onClick={onToggle}
        className="
          flex w-full
          items-center
          justify-between
          text-left
          md:pointer-events-none
        "
      >
        <span
          className="
            text-sm
            font-semibold
            tracking-wide
            text-[#071f46]
            dark:text-white
          "
        >
          {title}
        </span>

        <ChevronDown
          className={`
            h-4 w-4
            text-slate-400
            transition-transform
            duration-300
            dark:text-white/50
            md:hidden
            ${isOpen ? "rotate-180" : ""}
          `}
        />
      </button>

      <div
        className={`
          grid
          overflow-hidden
          transition-all
          duration-300
          md:mt-6
          md:grid-rows-[1fr]
          md:opacity-100
          ${
            isOpen
              ? "mt-4 grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0 md:mt-6"
          }
        `}
      >
        <div className="min-h-0">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const t = useTranslations("Footer");

  const [openSection, setOpenSection] = useState<number | null>(
    null
  );

  const [inView, setInView] = useState(false);

  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = footerRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const toggle = (index: number) => {
    setOpenSection((current) =>
      current === index ? null : index
    );
  };

  return (
    <footer
      ref={footerRef}
      className={`
        relative
        overflow-hidden
        bg-[#f7f9fc]
        text-[#071f46]
        transition-all
        duration-700
        ease-out
        dark:bg-[#071f46]
        dark:text-white
        ${inView ? "opacity-100" : "opacity-0"}
      `}
    >
      {/* Decorative background */}

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          -top-40
          h-96
          w-96
          rounded-full
          bg-[#18a999]/5
          blur-3xl
          dark:bg-[#18a999]/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          -right-40
          h-[28rem]
          w-[28rem]
          rounded-full
          bg-[#35d0bd]/5
          blur-3xl
          dark:bg-[#35d0bd]/10
        "
      />

      <div className="relative">

        {/* =====================================================
            NEWSLETTER
        ===================================================== */}

        <div
          className="
            border-b
            border-slate-200
            bg-white/70
            dark:border-white/10
            dark:bg-white/[0.02]
          "
        >
          <div
            className="
              mx-auto
              flex
              max-w-7xl
              flex-col
              gap-6
              px-6
              py-10
              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            <div className="max-w-xl">

              <div className="flex items-center gap-2">
                <span
                  className="
                    h-2
                    w-2
                    rounded-full
                    bg-[#18a999]
                    shadow-[0_0_12px_rgba(24,169,153,0.5)]
                  "
                />

                <span
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-[#18a999]
                    dark:text-[#35d0bd]
                  "
                >
                  {t("newsletter.badge")}
                </span>
              </div>

              <h3
                className="
                  mt-3
                  text-xl
                  font-semibold
                  text-[#071f46]
                  sm:text-2xl
                  dark:text-white
                "
              >
                {t("newsletter.title")}
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  leading-relaxed
                  text-slate-500
                  dark:text-white/55
                "
              >
                {t("newsletter.description")}
              </p>
            </div>

            <form
              onSubmit={(event) => event.preventDefault()}
              className="
                flex
                w-full
                max-w-md
                flex-col
                gap-3
                sm:flex-row
              "
            >
              <input
                type="email"
                required
                placeholder={t("newsletter.emailPlaceholder")}
                className="
                  min-w-0
                  flex-1
                  rounded-full
                  border
                  border-slate-200
                  bg-white
                  px-5
                  py-3.5
                  text-sm
                  text-[#071f46]
                  outline-none
                  transition-all
                  placeholder:text-slate-400
                  focus:border-[#18a999]/60
                  focus:ring-2
                  focus:ring-[#18a999]/10

                  dark:border-white/10
                  dark:bg-white/5
                  dark:text-white
                  dark:placeholder:text-white/35
                  dark:focus:border-[#35d0bd]/60
                  dark:focus:bg-white/10
                  dark:focus:ring-[#35d0bd]/10
                "
              />

              <button
                type="submit"
                className="
                  shrink-0
                  rounded-full
                  bg-[#18a999]
                  px-6
                  py-3.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-[#18a999]/10
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-[#35d0bd]
                  hover:text-[#071f46]
                "
              >
                {t("newsletter.subscribe")}
              </button>
            </form>
          </div>
        </div>

        {/* =====================================================
            MAIN FOOTER
        ===================================================== */}

        <div className="mx-auto max-w-7xl px-6 py-14 lg:py-16">

          <div
            className="
              grid
              grid-cols-1
              gap-x-12
              md:grid-cols-4
            "
          >

            {/* =================================================
                BRAND
            ================================================= */}

            <div className="pb-8 md:pb-0">

              <Link
                href="/"
                className="
                  inline-flex
                  items-center
                  rounded-2xl
                  transition-transform
                  duration-200
                  hover:scale-[1.02]
                "
              >
                <Image
                  src="/afilas-logo.jpg"
                  alt={t("brand.logoAlt")}
                  width={210}
                  height={70}
                  className="
                    h-auto
                    w-[190px]
                    rounded-xl
                    object-contain
                  "
                />
              </Link>

              <p
                className="
                  mt-5
                  max-w-xs
                  text-sm
                  leading-relaxed
                  text-slate-500
                  dark:text-white/55
                "
              >
                {t("brand.description")}
              </p>

              {/* Social Icons */}

              <div className="mt-6 flex items-center gap-2.5">

                {SOCIALS.map(
                  ({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-slate-200
                        bg-white
                        text-slate-500
                        shadow-sm
                        transition-all
                        duration-200

                        hover:-translate-y-1
                        hover:border-[#18a999]/40
                        hover:bg-[#18a999]
                        hover:text-white

                        dark:border-white/10
                        dark:bg-white/5
                        dark:text-white/60
                        dark:hover:border-[#35d0bd]/40
                        dark:hover:bg-[#18a999]
                        dark:hover:text-white
                      "
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  )
                )}

              </div>

              {/* Trust Badge */}

              <div
                className="
                  mt-6
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[#18a999]/15
                  bg-[#18a999]/5
                  px-3
                  py-2
                  dark:border-[#18a999]/20
                  dark:bg-[#18a999]/10
                "
              >
                <ShieldCheck
                  className="
                    h-4
                    w-4
                    text-[#18a999]
                    dark:text-[#35d0bd]
                  "
                />

                <span
                  className="
                    text-xs
                    text-slate-500
                    dark:text-white/55
                  "
                >
                  {t("brand.trust")}
                </span>
              </div>

            </div>

            {/* =================================================
                QUICK LINKS
            ================================================= */}

            <FooterAccordion
              title={t("quickLinks.title")}
              isOpen={openSection === 0}
              onToggle={() => toggle(0)}
            >
              <ul className="space-y-3">

                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>

                    <Link
                      href={link.href}
                      className="
                        group
                        inline-flex
                        items-center
                        gap-1
                        text-sm
                        text-slate-500
                        transition-colors
                        hover:text-[#18a999]
                        dark:text-white/55
                        dark:hover:text-[#35d0bd]
                      "
                    >
                      {t(`quickLinks.items.${link.key}`)}

                      <ArrowUpRight
                        className="
                          h-3
                          w-3
                          opacity-0
                          transition-all
                          group-hover:translate-x-0.5
                          group-hover:-translate-y-0.5
                          group-hover:opacity-100
                        "
                      />
                    </Link>

                  </li>
                ))}

              </ul>
            </FooterAccordion>

            {/* =================================================
                SERVICES
            ================================================= */}

            <FooterAccordion
              title={t("services.title")}
              isOpen={openSection === 1}
              onToggle={() => toggle(1)}
            >
              <ul className="space-y-3">

                {SERVICE_LINKS.map((link) => (
                  <li key={link.href}>

                    <Link
                      href={link.href}
                      className="
                        group
                        inline-flex
                        items-center
                        gap-1
                        text-sm
                        text-slate-500
                        transition-colors
                        hover:text-[#18a999]
                        dark:text-white/55
                        dark:hover:text-[#35d0bd]
                      "
                    >
                      {t(`services.items.${link.key}`)}

                      <ArrowUpRight
                        className="
                          h-3
                          w-3
                          opacity-0
                          transition-all
                          group-hover:translate-x-0.5
                          group-hover:-translate-y-0.5
                          group-hover:opacity-100
                        "
                      />
                    </Link>

                  </li>
                ))}

              </ul>
            </FooterAccordion>

            {/* =================================================
                CONTACT
            ================================================= */}

            <FooterAccordion
              title={t("contact.title")}
              isOpen={openSection === 2}
              onToggle={() => toggle(2)}
            >

              <ul
                className="
                  space-y-4
                  text-sm
                  text-slate-500
                  dark:text-white/55
                "
              >

                {/* Address */}

                <li className="flex items-start gap-3">

                  <span
                    className="
                      mt-0.5
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#18a999]/10
                    "
                  >
                    <MapPin
                      className="
                        h-4
                        w-4
                        text-[#18a999]
                        dark:text-[#35d0bd]
                      "
                    />
                  </span>

                  <span className="pt-1">
                    {t("contact.address")}
                  </span>

                </li>

                {/* Phone */}

                <li className="flex items-center gap-3">

                  <span
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#18a999]/10
                    "
                  >
                    <Phone
                      className="
                        h-4
                        w-4
                        text-[#18a999]
                        dark:text-[#35d0bd]
                      "
                    />
                  </span>

                  <span>
                    +251 911 000 000
                  </span>

                </li>

                {/* Email */}

                <li className="flex items-center gap-3">

                  <span
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#18a999]/10
                    "
                  >
                    <Mail
                      className="
                        h-4
                        w-4
                        text-[#18a999]
                        dark:text-[#35d0bd]
                      "
                    />
                  </span>

                  <span className="break-all">
                    care@afilasgroup.com
                  </span>

                </li>

                {/* Opening Hours */}

                <li className="flex items-center gap-3">

                  <span
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#18a999]/10
                    "
                  >
                    <Clock
                      className="
                        h-4
                        w-4
                        text-[#18a999]
                        dark:text-[#35d0bd]
                      "
                    />
                  </span>

                  <span>
                    {t("contact.hours")}
                  </span>

                </li>

              </ul>

              {/* Emergency */}

              <div
                className="
                  mt-5
                  rounded-2xl
                  border
                  border-[#18a999]/20
                  bg-[#18a999]/5
                  p-4
                  dark:bg-[#18a999]/10
                "
              >

                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-[#18a999]
                    dark:text-[#35d0bd]
                  "
                >
                  {t("contact.emergency")}
                </p>

                <a
                  href="tel:+251911000000"
                  className="
                    mt-1
                    block
                    text-sm
                    font-semibold
                    text-[#071f46]
                    transition-colors
                    hover:text-[#18a999]
                    dark:text-white
                    dark:hover:text-[#35d0bd]
                  "
                >
                  +251 911 000 000
                </a>

              </div>

              {/* Privacy */}

              <p
                className="
                  mt-5
                  flex
                  items-start
                  gap-2
                  text-xs
                  leading-relaxed
                  text-slate-400
                  dark:text-white/35
                "
              >
                <ShieldCheck
                  className="
                    mt-0.5
                    h-3.5
                    w-3.5
                    shrink-0
                  "
                />

                {t("contact.privacy")}
              </p>

            </FooterAccordion>

          </div>
        </div>

        {/* =====================================================
            BOTTOM BAR
        ===================================================== */}

        <div
          className="
            border-t
            border-slate-200
            dark:border-white/10
          "
        >

          <div
            className="
              mx-auto
              flex
              max-w-7xl
              flex-col
              gap-4
              px-6
              py-6
              text-xs
              text-slate-400
              sm:flex-row
              sm:items-center
              sm:justify-between
              dark:text-white/40
            "
          >

            <p className="text-center sm:text-left">
              {t("bottom.copyright", {
                year: new Date().getFullYear(),
              })}
            </p>

            <div className="flex items-center justify-center gap-5">

              <Link
                href="/privacy"
                className="
                  transition-colors
                  hover:text-[#18a999]
                  dark:hover:text-[#35d0bd]
                "
              >
                {t("bottom.privacy")}
              </Link>

              <Link
                href="/terms"
                className="
                  transition-colors
                  hover:text-[#18a999]
                  dark:hover:text-[#35d0bd]
                "
              >
                {t("bottom.terms")}
              </Link>

            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}