// components/WhyChooseUs.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  ScanLine,
  ArrowRight,
  HeartPulse,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function WhyChooseUsSection() {
  const t = useTranslations("Home.whyChooseUs");

  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;

    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const base =
    "rounded-3xl p-8 shadow-[0_8px_30px_rgba(7,31,70,0.07)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(7,31,70,0.14)]";

  const reveal = (delay: number) => ({
    className: inView
      ? "opacity-100 scale-100 translate-y-0"
      : "opacity-0 scale-95 translate-y-6",
    style: {
      transitionDelay: inView ? `${delay}ms` : "0ms",
    },
  });

  return (
    <section
      ref={sectionRef}
      className="
        relative overflow-hidden
        bg-slate-50
        py-20
        transition-colors duration-300
        dark:bg-[#071f46]
        lg:py-28
      "
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute -left-32 top-20
            h-72 w-72 rounded-full
            bg-[#18a999]/10
            blur-3xl
          "
        />

        <div
          className="
            absolute -right-32 bottom-0
            h-80 w-80 rounded-full
            bg-blue-500/10
            blur-3xl
          "
        />

        <div
          className="
            absolute left-1/2 top-1/2
            h-64 w-64
            -translate-x-1/2 -translate-y-1/2
            rounded-full
            bg-[#35d0bd]/5
            blur-3xl
          "
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="
              mb-4 inline-flex items-center gap-2
              rounded-full
              border border-[#18a999]/20
              bg-[#18a999]/10
              px-4 py-2
              text-xs font-semibold uppercase
              tracking-[0.18em]
              text-[#128f82]
              dark:border-[#35d0bd]/20
              dark:bg-[#18a999]/10
              dark:text-[#35d0bd]
            "
          >
            <HeartPulse className="h-4 w-4" />

            {t("badge")}
          </div>

          <h2
            className="
              text-3xl font-semibold
              tracking-tight
              text-[#071f46]
              transition-colors duration-300
              dark:text-white
              sm:text-4xl
              lg:text-[2.75rem]
            "
          >
            {t("titleLine1")}
            <span className="block text-[#18a999] dark:text-[#35d0bd]">
              {t("titleLine2")}
            </span>
          </h2>

          <p
            className="
              mx-auto mt-5
              max-w-2xl
              text-base leading-relaxed
              text-slate-600
              dark:text-white/65
              sm:text-lg
            "
          >
            {t("description")}
          </p>
        </div>

        {/* Feature Grid */}
        <div
          className="
            mt-14
            grid grid-cols-1 gap-6
            md:auto-rows-[minmax(170px,auto)]
            md:grid-cols-4
          "
        >
          {/* Feature 1 — End-to-End Healthcare */}
          <div
            {...reveal(0)}
            className={`
              ${base}
              ${reveal(0).className}
              relative flex min-h-[300px]
              flex-col justify-end
              overflow-hidden
              border border-white/10
              p-8
              md:col-start-1
              md:row-start-1
              md:col-span-2
              md:row-span-2
            `}
          >
            <Image
              src="/images/hero-image.jpg"
              alt={t("endToEnd.imageAlt")}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="
                object-cover
                transition-transform duration-700
                hover:scale-105
              "
            />

            {/* Image overlay */}
            <div
              className="
                absolute inset-0
                bg-gradient-to-t
                from-[#071f46]/95
                via-[#071f46]/50
                to-[#071f46]/10
              "
            />

            {/* Teal glow */}
            <div
              className="
                absolute -right-16 -top-16
                h-40 w-40
                rounded-full
                bg-[#18a999]/20
                blur-3xl
              "
            />

            <div className="relative z-10">
              <div
                className="
                  mb-4 inline-flex
                  rounded-full
                  border border-white/20
                  bg-white/10
                  px-3 py-1.5
                  text-xs font-semibold
                  uppercase tracking-wider
                  text-white/90
                  backdrop-blur-md
                "
              >
                {t("endToEnd.badge")}
              </div>

              <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                {t("endToEnd.title")}
              </h3>

              <p
                className="
                  mt-3 max-w-lg
                  text-base leading-relaxed
                  text-white/75
                "
              >
                {t("endToEnd.description")}
              </p>
            </div>
          </div>

          {/* Stat — 24/7 */}
          <div
            {...reveal(100)}
            className={`
              ${base}
              ${reveal(100).className}
              relative flex min-h-[150px]
              flex-col justify-center
              overflow-hidden
              bg-[#071f46]
              dark:bg-[#12365d]
              md:col-start-3
              md:row-start-1
              md:col-span-2
            `}
          >
            <div
              className="
                absolute -right-10 -top-10
                h-32 w-32
                rounded-full
                bg-[#18a999]/20
                blur-2xl
              "
            />

            <div className="relative">
              <p
                className="
                  text-4xl font-semibold
                  tracking-tight
                  text-white
                  sm:text-5xl
                "
              >
                24/7
              </p>

              <p className="mt-2 text-sm text-white/70 sm:text-base">
                {t("stats.emergency")}
              </p>

              <div className="mt-4 h-1 w-16 rounded-full bg-[#35d0bd]" />
            </div>
          </div>

          {/* Feature 2 — Cutting-Edge Technology */}
          <div
            {...reveal(200)}
            className={`
              ${base}
              ${reveal(200).className}
              flex min-h-[180px]
              flex-col justify-center
              border border-blue-100
              bg-white
              dark:border-white/10
              dark:bg-[#12365d]
              md:col-start-3
              md:row-start-2
              md:col-span-2
            `}
          >
            <span
              className="
                flex h-12 w-12
                items-center justify-center
                rounded-2xl
                bg-[#18a999]/10
                ring-1 ring-[#18a999]/15
                dark:bg-[#18a999]/15
              "
            >
              <ScanLine
                className="
                  h-6 w-6
                  text-[#128f82]
                  dark:text-[#35d0bd]
                "
                strokeWidth={1.8}
              />
            </span>

            <p
              className="
                mt-4 text-xl font-semibold
                text-[#071f46]
                dark:text-white
              "
            >
              {t("technology.title")}
            </p>

            <p
              className="
                mt-2 text-base leading-relaxed
                text-slate-600
                dark:text-white/65
              "
            >
              {t("technology.description")}
            </p>
          </div>

          {/* Stat — 50,000+ */}
          <div
            {...reveal(300)}
            className={`
              ${base}
              ${reveal(300).className}
              relative flex min-h-[150px]
              flex-col justify-center
              overflow-hidden
              border border-[#18a999]/10
              bg-[#eefaf8]
              dark:border-white/10
              dark:bg-[#102f55]
              md:col-start-1
              md:row-start-3
            `}
          >
            <div
              className="
                absolute -bottom-12 -right-12
                h-32 w-32
                rounded-full
                bg-[#18a999]/10
                blur-2xl
              "
            />

            <div className="relative">
              <p
                className="
                  text-3xl font-semibold
                  tracking-tight
                  text-[#071f46]
                  dark:text-white
                  sm:text-4xl
                "
              >
                50,000+
              </p>

              <p
                className="
                  mt-2 text-sm
                  text-slate-600
                  dark:text-white/60
                "
              >
                {t("stats.patients")}
              </p>
            </div>
          </div>

          {/* Feature 3 — Quality & Safety */}
          <div
            {...reveal(400)}
            className={`
              ${base}
              ${reveal(400).className}
              flex min-h-[180px]
              flex-col justify-center
              border border-slate-200
              bg-white
              dark:border-white/10
              dark:bg-[#0d2b50]
              md:col-start-2
              md:row-start-3
              md:col-span-2
            `}
          >
            <span
              className="
                flex h-12 w-12
                items-center justify-center
                rounded-2xl
                bg-[#18a999]/10
                ring-1 ring-[#18a999]/15
                dark:bg-[#17466a]
              "
            >
              <ShieldCheck
                className="
                  h-6 w-6
                  text-[#128f82]
                  dark:text-[#35d0bd]
                "
                strokeWidth={1.8}
              />
            </span>

            <p
              className="
                mt-4 text-xl font-semibold
                text-[#071f46]
                dark:text-white
              "
            >
              {t("quality.title")}
            </p>

            <p
              className="
                mt-2 text-base leading-relaxed
                text-slate-600
                dark:text-white/65
              "
            >
              {t("quality.description")}
            </p>
          </div> 

          {/* CTA */}
          <Link
            href="/book"
            {...reveal(500)}
            className={`
              ${base}
              ${reveal(500).className}
              group relative flex min-h-[150px]
              flex-col justify-center
              overflow-hidden
              border border-[#35d0bd]/20
              bg-gradient-to-br
              from-[#18a999]
              to-[#0f8f82]
              md:col-start-4
              md:row-start-3
            `}
          >
            {/* Decorative circle */}
            <div
              className="
                absolute -right-8 -top-8
                h-28 w-28
                rounded-full
                bg-white/10
                transition-transform duration-500
                group-hover:scale-125
              "
            />

            <div className="relative z-10">
              <p
                className="
                  text-lg font-semibold
                  leading-snug text-white
                "
              >
                {t("cta.title")}
              </p>

              <span
                className="
                  mt-3 inline-flex
                  items-center gap-2
                  text-sm font-medium
                  text-white/90
                "
              >
                {t("cta.button")}

                <ArrowRight
                  className="
                    h-4 w-4
                    transition-transform duration-200
                    group-hover:translate-x-1
                  "
                />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}