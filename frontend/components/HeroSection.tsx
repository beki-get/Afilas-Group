// components/HeroSection.tsx

"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, CalendarCheck, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function HeroSection() {
  const t = useTranslations("Home.hero");

  return (
    <section
      className="
        relative overflow-hidden
        bg-[#FBFAF7]
        pt-28 pb-20
        transition-colors duration-300
        dark:bg-[#071f46]
        lg:pt-36 lg:pb-28
      "
    >
      {/* Background decorative elements */}
      <div
        className="
          pointer-events-none absolute -left-32 top-20
          h-72 w-72 rounded-full
          bg-[#18a999]/10 blur-3xl
          dark:bg-[#18a999]/10
        "
      />

      <div
        className="
          pointer-events-none absolute -right-32 bottom-0
          h-96 w-96 rounded-full
          bg-[#35d0bd]/10 blur-3xl
          dark:bg-[#35d0bd]/10
        "
      />

      <div
        className="
          relative mx-auto grid max-w-7xl
          grid-cols-1 items-center gap-14
          px-6 lg:grid-cols-[0.95fr_1.05fr]
          lg:gap-16
        "
      >
        {/* ===================================================== */}
        {/* LEFT — CONTENT */}
        {/* ===================================================== */}

        <div className="text-center lg:text-left">

          {/* Eyebrow */}
          <div
            className="
              animate-[fadeUp_0.6s_ease-out_0.05s_both]
              inline-flex items-center gap-2
              rounded-full
              border border-[#18a999]/15
              bg-[#18a999]/8
              px-4 py-2
              dark:border-[#35d0bd]/20
              dark:bg-white/10
            "
          >
            <ShieldCheck
              className="
                h-4 w-4
                text-[#18a999]
                dark:text-[#35d0bd]
              "
            />

            <span
              className="
                text-sm font-medium
                text-[#18a999]
                dark:text-[#35d0bd]
              "
            >
              {t("badge")}
            </span>
          </div>

          {/* Heading */}
          <h1
            className="
              animate-[fadeUp_0.6s_ease-out_0.15s_both]
              mt-6
              text-4xl font-semibold
              leading-[1.08]
              tracking-tight
              text-[#071f46]
              transition-colors duration-300
              dark:text-white
              sm:text-5xl
              lg:text-6xl
              xl:text-7xl
            "
          >
            {t("titleLine1")}

            <br />

            <span
              className="
                bg-gradient-to-r
                from-[#18a999]
                to-[#35d0bd]
                bg-clip-text
                text-transparent
              "
            >
              {t("titleLine2")}
            </span>
          </h1>

          {/* Description */}
          <p
            className="
              animate-[fadeUp_0.6s_ease-out_0.25s_both]
              mx-auto mt-6 max-w-xl
              text-base leading-relaxed
              text-[#071f46]/65
              transition-colors duration-300
              dark:text-white/70
              sm:text-lg
              lg:mx-0
            "
          >
            {t("description")}
          </p>

          {/* Actions */}
          <div
            className="
              animate-[fadeUp_0.6s_ease-out_0.35s_both]
              mt-8
              flex flex-col
              items-center gap-4
              sm:flex-row
              lg:justify-start
            "
          >
            {/* Book Appointment */}
            <Link
              href="/book"
              className="
                group
                inline-flex w-full
                items-center justify-center
                gap-2
                rounded-full
                bg-[#18a999]
                px-7 py-3.5
                text-base font-medium
                text-white
                shadow-[0_10px_30px_rgba(24,169,153,0.22)]
                transition-all duration-300
                hover:-translate-y-1
                hover:bg-[#138f82]
                hover:shadow-[0_14px_35px_rgba(24,169,153,0.30)]
                sm:w-auto
              "
            >
              {t("bookAppointment")}

              <ArrowRight
                className="
                  h-4 w-4
                  transition-transform duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>

            {/* Explore Services */}
            <a
              href="#services"
              className="
                group
                inline-flex
                items-center gap-2
                text-base font-medium
                text-[#071f46]
                transition-colors duration-200
                hover:text-[#18a999]
                dark:text-white/85
                dark:hover:text-[#35d0bd]
              "
            >
              {t("exploreServices")}

              <ArrowRight
                className="
                  h-4 w-4
                  transition-transform duration-200
                  group-hover:translate-x-1
                "
              />
            </a>
          </div>

          {/* ================================================= */}
          {/* TRUST / SERVICE INDICATORS */}
          {/* ================================================= */}

          <div
            className="
              animate-[fadeUp_0.6s_ease-out_0.45s_both]
              mt-9
              flex flex-wrap
              items-center
              justify-center
              gap-x-6 gap-y-3
              text-sm
              text-[#071f46]/60
              transition-colors duration-300
              dark:text-white/60
              lg:justify-start
            "
          >
            {[
              "hospital",
              "diagnostics",
              "pharmaceuticals",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2"
              >
                <span
                  className="
                    h-2 w-2
                    rounded-full
                    bg-[#18a999]
                    dark:bg-[#35d0bd]
                  "
                />

                <span>{t(`services.${item}`)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ===================================================== */}
        {/* RIGHT — HERO IMAGE */}
        {/* ===================================================== */}

        <div
          className="
            animate-[fadeIn_0.8s_ease-out_0.3s_both]
            relative mx-auto w-full max-w-xl
          "
        >
          {/* Main image container */}
          <div
            className="
              relative
              aspect-[4/4.5]
              overflow-hidden
              rounded-[2rem]
              border
              border-[#18a999]/10
              bg-[#18a999]/5
              shadow-[0_25px_70px_rgba(7,31,70,0.12)]
              dark:border-white/10
              dark:bg-[#0b2b55]
              dark:shadow-[0_25px_70px_rgba(0,0,0,0.30)]
            "
          >
            <Image
              src="/images/hero-image.jpg"
              alt={t("imageAlt")}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="
                object-cover
                transition-transform duration-700
                hover:scale-[1.03]
              "
            />

            {/* Image overlay */}
            <div
              className="
                absolute inset-0
                bg-gradient-to-t
                from-[#071f46]/35
                via-transparent
                to-transparent
                dark:from-[#041936]/50
              "
            />

            {/* Image top glow */}
            <div
              className="
                pointer-events-none
                absolute inset-x-0 top-0 h-32
                bg-gradient-to-b
                from-[#18a999]/15
                to-transparent
              "
            />
          </div>

          {/* ================================================= */}
          {/* FLOATING APPOINTMENT CARD */}
          {/* ================================================= */}

          <div
            className="
              absolute
              -bottom-5
              left-4
              flex items-center gap-3
              rounded-2xl
              border
              border-slate-100
              bg-white/95
              px-4 py-3.5
              shadow-[0_15px_40px_rgba(15,23,18,0.14)]
              backdrop-blur-md
              transition-all duration-300
              hover:-translate-y-1
              dark:border-white/10
              dark:bg-[#102f55]/95
              dark:shadow-[0_15px_40px_rgba(0,0,0,0.35)]
              sm:left-6
              sm:px-5 sm:py-4
            "
          >
            <span
              className="
                flex h-10 w-10
                shrink-0
                items-center justify-center
                rounded-full
                bg-[#18a999]/10
                dark:bg-[#17466a]
              "
            >
              <CalendarCheck
                className="
                  h-5 w-5
                  text-[#18a999]
                  dark:text-[#35d0bd]
                "
              />
            </span>

            <div className="leading-tight">
              <p
                className="
                  text-xs font-medium
                  text-[#071f46]/50
                  dark:text-white/50
                "
              >
                {t("floatingCard.eyebrow")}
              </p>

              <p
                className="
                  mt-1
                  text-sm font-semibold
                  text-[#071f46]
                  dark:text-white
                "
              >
                {t("floatingCard.title")}
              </p>
            </div>
          </div>

          {/* ================================================= */}
          {/* DECORATIVE SHAPES */}
          {/* ================================================= */}

          <div
            className="
              absolute
              -right-4 -top-4
              -z-10
              h-28 w-28
              rounded-full
              bg-[#18a999]/15
              blur-2xl
              dark:bg-[#18a999]/20
            "
          />

          <div
            className="
              absolute
              -bottom-8 -right-8
              -z-10
              h-40 w-40
              rounded-full
              bg-[#35d0bd]/15
              blur-3xl
              dark:bg-[#35d0bd]/10
            "
          />

          {/* Small decorative circle */}
          <div
            className="
              absolute
              -right-3
              top-1/2
              hidden
              h-6 w-6
              rounded-full
              border-4
              border-white
              bg-[#18a999]
              shadow-lg
              dark:border-[#071f46]
              sm:block
            "
          />
        </div>
      </div>
    </section>
  );
}