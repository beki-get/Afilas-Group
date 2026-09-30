"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "@/components/ThemeProvider";
import Image from "next/image";
import {
  Menu,
  X,
  Phone,
  Search,
  LogIn,
  CalendarDays,
  Globe2,
} from "lucide-react";

import ThemeToggle from "@/components/ThemeToggle";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

const SCROLL_THRESHOLD = 50;

const EMERGENCY_PHONE = "+251 911 000 000";
const EMERGENCY_TEL_HREF = "tel:+251911000000";

type NavLink = {
  label: string;
  href: string;
  shortLines?: [string, string];
};

export default function Navbar() {
  const t = useTranslations("Navbar");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const pathname = usePathname();
  const router = useRouter();

  /*
   * =========================================================
   * TRANSLATED NAVIGATION LINKS
   * =========================================================
   */
  const NAV_LINKS: NavLink[] = [
    {
      label: t("home"),
      href: "/",
    },
    {
      label: t("hospital"),
      href: "/hospital",
      shortLines: [
        t("hospitalShort1"),
        t("hospitalShort2"),
      ],
    },
    {
      label: t("diagnosis"),
      href: "/diagnosis",
      shortLines: [
        t("diagnosisShort1"),
        t("diagnosisShort2"),
      ],
    },
    {
      label: t("manufacturing"),
      href: "/pharma",
      shortLines: [
        t("manufacturingShort1"),
        t("manufacturingShort2"),
      ],
    },
     {
        label: t("blog"),
        href: "/blog",
    },
    {
      label: t("about"),
      href: "/about",
    },
    {
      label: t("contact"),
      href: "/contact",
    },
  ];

  /* =========================================================
     SCROLL DETECTION
  ========================================================= */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* =========================================================
     LOCK BODY SCROLL WHEN MOBILE MENU IS OPEN
  ========================================================= */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* =========================================================
     CLOSE MENUS WHEN ROUTE CHANGES
  ========================================================= */
  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  /* =========================================================
     ACTIVE LINK
  ========================================================= */
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  /* =========================================================
     LANGUAGE SWITCH
  ========================================================= */
  const switchLanguage = (locale: "en" | "am") => {
    router.replace(pathname, { locale });
  };

  /* =========================================================
     SEARCH
  ========================================================= */
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = searchQuery.trim();

    if (!query) {
      return;
    }

    router.push(`/search?q=${encodeURIComponent(query)}`);

    setSearchQuery("");
    setSearchOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">

      {/* =====================================================
          EMERGENCY TOP BAR
      ===================================================== */}
      <div className="bg-[#071f46] text-white dark:bg-[#041936]">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-6 py-1.5 text-xs sm:justify-end">

          <Phone
            className="h-3.5 w-3.5 shrink-0 text-[#35d0bd]"
            aria-hidden="true"
          />

          <a
            href={EMERGENCY_TEL_HREF}
            className="tracking-wide transition-colors hover:text-[#35d0bd]"
          >
            {t("emergencyLine")}: {EMERGENCY_PHONE}
          </a>

        </div>
      </div>

      {/* =====================================================
          MAIN NAVBAR
      ===================================================== */}
      <nav
        className={[
          "border-b transition-all duration-300",

          scrolled
            ? "border-slate-200/70 bg-white/95 shadow-[0_4px_25px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-[#071f46]/95"
            : "border-transparent bg-white/90 backdrop-blur-md dark:bg-[#071f46]/90",
        ].join(" ")}
      >

        <div className="mx-auto flex max-w-[1600px] items-center gap-5 px-4 py-3 sm:px-6 xl:px-8">

          {/* =================================================
              LOGO
          ================================================= */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5"
            aria-label={t("homeAriaLabel")}
          >

            <div className="relative h-11 w-11 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200/60 dark:ring-white/10">

              <Image
                src="/afilas-logo.jpg"
                alt={t("logoAlt")}
                fill
                priority
                sizes="44px"
                className="object-cover"
              />

            </div>

            <div className="hidden sm:block">

              <div className="text-lg font-bold leading-none tracking-tight text-[#071f46] dark:text-white">
                Afilas
              </div>

              <div className="mt-1 text-[9px] font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-white/60">
                Healthcare Group
              </div>

            </div>

          </Link>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}
          <ul className="hidden flex-1 items-center justify-center gap-6 xl:flex 2xl:gap-7">

            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);

              return (
                <li
                  key={link.href}
                  className="flex h-12 items-center"
                >

                  <Link
                    href={link.href}
                    className={[
                      "relative flex items-center justify-center text-center text-[0.99rem] font-medium leading-tight transition-colors duration-200",

                      "after:absolute after:-bottom-1 after:left-1/2 after:h-0.5 after:-translate-x-1/2 after:rounded-full after:bg-[#18a999] after:transition-all after:duration-300",

                      active
                        ? "text-[#12356b] after:w-7 dark:text-[#35d0bd]"
                        : "text-slate-600 after:w-0 hover:text-[#12356b] hover:after:w-5 dark:text-white/75 dark:hover:text-white",
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

          {/* =================================================
              DESKTOP ACTIONS
          ================================================= */}
          <div className="hidden items-center gap-2 xl:flex">

            {/* SEARCH */}
            <button
              type="button"
              onClick={() => setSearchOpen((value) => !value)}
              aria-label={t("search")}
              aria-expanded={searchOpen}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#12356b] transition-all hover:scale-105 hover:border-[#18a999] hover:bg-[#e9fffb] dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              {searchOpen ? (
                <X className="h-4.5 w-4.5" />
              ) : (
                <Search className="h-4.5 w-4.5" />
              )}
            </button>

            {/* LANGUAGE SWITCHER */}
            <div className="flex items-center rounded-full border border-slate-200 bg-white p-1 shadow-sm dark:border-white/10 dark:bg-white/5">

              <Globe2 className="ml-2 h-4 w-4 text-[#18a999]" />

              <button
                type="button"
                onClick={() => switchLanguage("en")}
                className="rounded-full px-2.5 py-1 text-xs font-semibold text-[#12356b] transition-colors hover:bg-slate-100 dark:text-white dark:hover:bg-white/10"
              >
                EN
              </button>

              <span className="text-slate-300 dark:text-white/20">
                |
              </span>

              <button
                type="button"
                onClick={() => switchLanguage("am")}
                className="rounded-full px-2.5 py-1 text-xs font-semibold text-slate-500 transition-colors hover:text-[#12356b] dark:text-white/60 dark:hover:text-white"
              >
                አማ
              </button>

            </div>

            {/* DARK / LIGHT MODE */}
            <ThemeToggle />

            {/* LOGIN */}
            <Link
              href="/login"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-[#12356b] transition-all hover:border-[#18a999] hover:bg-[#e9fffb] dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              <LogIn className="h-4 w-4" />
              {t("login")}
            </Link>

            {/* BOOK APPOINTMENT */}
            <Link
              href="/book"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#18a999] px-5 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#128f82]"
            >
              <CalendarDays className="h-5 w-5" />
              {t("appointment")}
            </Link>

          </div>

          {/* =================================================
              MOBILE ACTIONS
          ================================================= */}
          <div className="ml-auto flex items-center gap-2 xl:hidden">

            {/* Theme on small/medium mobile */}
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            {/* Mobile menu */}
            <button
              type="button"
              aria-label={
                mobileOpen
                  ? t("closeMenu")
                  : t("openMenu")
              }
              aria-expanded={mobileOpen}
              onClick={() =>
                setMobileOpen((value) => !value)
              }
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#12356b] transition-all hover:border-[#18a999] dark:border-white/10 dark:bg-white/5 dark:text-white"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

          </div>

        </div>

        {/* =====================================================
            DESKTOP SEARCH PANEL
        ===================================================== */}
        <div
          className={[
            "overflow-hidden border-t transition-all duration-300",

            searchOpen
              ? "max-h-24 opacity-100"
              : "pointer-events-none max-h-0 opacity-0",

            "border-slate-200/70 bg-white/95 dark:border-white/10 dark:bg-[#071f46]/95",
          ].join(" ")}
        >

          <div className="mx-auto max-w-3xl px-6 py-3">

            <form
              onSubmit={handleSearch}
              className="relative"
            >

              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="search"
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                placeholder={t("desktopSearchPlaceholder")}
                className="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-11 pr-5 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-[#18a999] focus:bg-white focus:ring-4 focus:ring-[#18a999]/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40 dark:focus:bg-white/10"
                autoFocus={searchOpen}
              />

            </form>

          </div>

        </div>

      </nav>

      {/* =========================================================
          MOBILE FULL-SCREEN MENU
      ========================================================= */}
      <div
        aria-hidden={!mobileOpen}
        className={[
          "fixed inset-0 z-40 xl:hidden",
          "backdrop-blur-xl transition-all duration-300",

          isDark
            ? "bg-[#071f46]/98"
            : "bg-[#FBFAF7]/98",

          mobileOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0",
        ].join(" ")}
      >

        {/* MOBILE CLOSE BUTTON */}
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          aria-label={t("closeMenu")}
          className={[
            "absolute right-5 top-20 z-50 flex h-11 w-11",
            "items-center justify-center rounded-full border shadow-lg",
            "backdrop-blur-md transition-all duration-200",
            "hover:scale-105",
            isDark
              ? "border-white/15 bg-white/10 text-white hover:bg-white/15 hover:text-[#35d0bd]"
              : "border-slate-200 bg-white text-[#071f46] hover:border-[#18a999] hover:text-[#18a999]",
          ].join(" ")}
        >
          <X className="h-6 w-6" />
        </button>

        <div
          className={[
            "flex h-full flex-col overflow-y-auto px-6 pb-10 pt-28",
            "transition-all duration-300",
            isDark ? "text-white" : "text-[#071f46]",

            mobileOpen
              ? "translate-y-0"
              : "-translate-y-4",
          ].join(" ")}
        >

          {/* MOBILE SEARCH */}
          <form
            onSubmit={handleSearch}
            className="mb-8"
          >

            <div className="relative">

              <Search
                className={[
                  "absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2",
                  isDark ? "text-white/50" : "text-slate-400",
                ].join(" ")}
              />

              <input
                type="search"
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                placeholder={t("mobileSearchPlaceholder")}
                className={[
                  "w-full rounded-2xl border py-3.5 pl-12 pr-4 text-sm outline-none",
                  "focus:border-[#18a999]",
                  isDark
                    ? "border-white/10 bg-white/10 text-white placeholder:text-white/40"
                    : "border-slate-200 bg-white text-[#071f46] placeholder:text-slate-400",
                ].join(" ")}
              />

            </div>

          </form>

          {/* MOBILE NAV LINKS */}
          <ul className="flex flex-col gap-1">

            {NAV_LINKS.map((link) => (
              <li key={link.href}>

                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={[
                    "block rounded-2xl px-5 py-3.5 text-lg font-medium transition-all",

                    isActive(link.href)
                      ? "bg-[#18a999]/15 text-[#18a999] dark:text-[#35d0bd]"
                      : isDark
                        ? "text-white/85 hover:bg-white/5 hover:text-white"
                        : "text-[#071f46]/85 hover:bg-slate-200/60 hover:text-[#071f46]",
                  ].join(" ")}
                >
                  {link.label}
                </Link>

              </li>
            ))}

          </ul>

          {/* MOBILE CONTROLS */}
          <div
            className={[
              "mt-8 space-y-4 border-t pt-7",
              isDark
                ? "border-white/10"
                : "border-slate-200",
            ].join(" ")}
          >

            {/* LANGUAGE */}
            <div
              className={[
                "flex items-center justify-between rounded-2xl border px-5 py-4",
                isDark
                  ? "border-white/10 bg-white/5"
                  : "border-slate-200 bg-white shadow-sm",
              ].join(" ")}
            >

              <div
                className={[
                  "flex items-center gap-3",
                  isDark
                    ? "text-white/80"
                    : "text-[#071f46]",
                ].join(" ")}
              >

                <Globe2 className="h-5 w-5 text-[#35d0bd]" />

                <span className="text-sm font-medium">
                  {t("language")}
                </span>

              </div>

              <div
                className={[
                  "flex items-center rounded-full p-1",
                  isDark
                    ? "bg-white/10"
                    : "bg-slate-100",
                ].join(" ")}
              >

                <button
                  type="button"
                  onClick={() => switchLanguage("en")}
                  className="rounded-full bg-white px-4 py-1.5 text-xs font-bold text-[#071f46]"
                >
                  EN
                </button>

                <button
                  type="button"
                  onClick={() => switchLanguage("am")}
                  className={[
                    "rounded-full px-4 py-1.5 text-xs font-bold",
                    isDark
                      ? "text-white/80 hover:text-white"
                      : "text-slate-600 hover:text-[#071f46]",
                  ].join(" ")}
                >
                  አማ
                </button>

              </div>

            </div>

            {/* THEME */}
            <div
              className={[
                "flex items-center justify-between rounded-2xl border px-5 py-4",
                isDark
                  ? "border-white/10 bg-white/5"
                  : "border-slate-200 bg-white shadow-sm",
              ].join(" ")}
            >

              <span
                className={[
                  "text-sm font-medium",
                  isDark
                    ? "text-white/80"
                    : "text-[#071f46]",
                ].join(" ")}
              >
                {t("appearance")}
              </span>

              <ThemeToggle />

            </div>

            {/* LOGIN
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              <LogIn className="h-4 w-4" />
              {t("login")}
            </Link> */}

            {/* BOOK APPOINTMENT */}
            <Link
              href="/book"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#18a999] px-5 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#128f82]"
            >
              <CalendarDays className="h-5 w-5" />
              {t("appointment")}
            </Link>

            {/* EMERGENCY */}
            <a
              href={EMERGENCY_TEL_HREF}
              className={[
                "flex items-center justify-center gap-2 pt-3 text-sm transition-colors",
                isDark
                  ? "text-white/60 hover:text-[#35d0bd]"
                  : "text-slate-600 hover:text-[#18a999]",
              ].join(" ")}
            >
              <Phone className="h-4 w-4" />

              {t("emergency")}: {EMERGENCY_PHONE}
            </a>

          </div>

        </div>

      </div>

    </header>
  );
}