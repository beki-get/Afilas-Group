// components/HowItWorksSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import {
  CalendarCheck,
  MapPin,
  Microscope,
  HeartPulse,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type Step = {
  number: string;
  icon: React.ElementType;
  key: "appointment" | "visit" | "diagnosis" | "treatment";
  hasTag?: boolean;
};

const STEPS: Step[] = [
  {
    number: "01",
    icon: CalendarCheck,
    key: "appointment",
    hasTag: true,
  },
  {
    number: "02",
    icon: MapPin,
    key: "visit",
  },
  {
    number: "03",
    icon: Microscope,
    key: "diagnosis",
    hasTag: true,
  },
  {
    number: "04",
    icon: HeartPulse,
    key: "treatment",
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

export default function HowItWorksSection() {
  const t = useTranslations("Home.howItWorks");

  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  const step1 = useReveal();
  const step2 = useReveal();
  const step3 = useReveal();
  const step4 = useReveal();

  const reveals = [step1, step2, step3, step4];

  useEffect(() => {
    const updateProgress = () => {
      const section = sectionRef.current;

      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const start = viewportHeight * 0.75;

      const current = viewportHeight - rect.top;

      const calculated =
        (current - start) /
        (viewportHeight - start + rect.height * 0.2);

      setProgress(Math.min(Math.max(calculated, 0), 1));
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, {
      passive: true,
    });

    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative overflow-hidden
        bg-white
        py-20
        transition-colors duration-300
        dark:bg-[#071f46]
        lg:py-28
      "
    >
      {/* =========================================================
          DECORATIVE BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Left glow */}
        <div
          className="
            absolute -left-32 top-20
            h-80 w-80
            rounded-full
            bg-[#18a999]/10
            blur-3xl
            dark:bg-[#18a999]/10
          "
        />

        {/* Right glow */}
        <div
          className="
            absolute -right-32 bottom-10
            h-80 w-80
            rounded-full
            bg-blue-500/10
            blur-3xl
            dark:bg-[#35d0bd]/10
          "
        />

        {/* Center glow */}
        <div
          className="
            absolute left-1/2 top-1/2
            h-64 w-64
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#18a999]/5
            blur-3xl
          "
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* =========================================================
            SECTION HEADING
        ========================================================= */}

        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div
            className="
              inline-flex items-center gap-2
              rounded-full
              border border-[#18a999]/20
              bg-[#18a999]/10
              px-4 py-2
              text-xs font-semibold
              uppercase tracking-[0.18em]
              text-[#128f82]
              dark:border-[#35d0bd]/20
              dark:bg-[#18a999]/10
              dark:text-[#35d0bd]
            "
          >
            <span
              className="
                h-2 w-2
                rounded-full
                bg-[#18a999]
                shadow-[0_0_0_5px_rgba(24,169,153,0.12)]
                dark:bg-[#35d0bd]
              "
            />

            {t("badge")}
          </div>

          {/* Title */}
          <h2
            className="
              mt-4
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

          {/* Description */}
          <p
            className="
              mx-auto mt-5
              max-w-2xl
              text-base leading-relaxed
              text-slate-600
              transition-colors duration-300
              dark:text-white/65
              sm:text-lg
            "
          >
            {t("description")}
          </p>
        </div>

        {/* =========================================================
            DESKTOP TIMELINE
        ========================================================= */}

        <div className="relative mt-20 hidden md:block">
          {/* Base timeline */}
          <div
            className="
              absolute
              left-[12.5%]
              right-[12.5%]
              top-10
              h-[2px]
              rounded-full
              bg-slate-200
              dark:bg-white/10
            "
          />

          {/* Animated progress */}
          <div
            className="
              absolute
              left-[12.5%]
              top-10
              h-[2px]
              rounded-full
              bg-gradient-to-r
              from-[#18a999]
              to-[#35d0bd]
              transition-[width]
              duration-100
            "
            style={{
              width: `${progress * 75}%`,
            }}
          />

          {/* Progress dot */}
          <div
            className="
              absolute
              top-10
              h-4 w-4
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border-4
              border-white
              bg-[#18a999]
              shadow-[0_0_0_5px_rgba(24,169,153,0.15)]
              transition-[left]
              duration-100
              dark:border-[#071f46]
              dark:bg-[#35d0bd]
              dark:shadow-[0_0_0_5px_rgba(53,208,189,0.15)]
            "
            style={{
              left: `${12.5 + progress * 75}%`,
            }}
          >
            <span
              className="
                absolute inset-0
                animate-ping
                rounded-full
                bg-[#18a999]/40
                dark:bg-[#35d0bd]/40
              "
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-4 gap-6">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const { ref, visible } = reveals[index];

              return (
                <div
                  key={step.number}
                  ref={ref}
                  className={`
                    group
                    flex flex-col items-center text-center
                    transition-all duration-700 ease-out
                    ${
                      visible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }
                  `}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  {/* Number + icon */}
                  <div className="relative flex h-20 w-20 items-center justify-center">
                    {/* Large background number */}
                    <span
                      className="
                        absolute
                        select-none
                        text-[4.2rem]
                        font-bold
                        leading-none
                        text-[#18a999]/10
                        transition-all duration-300
                        group-hover:text-[#18a999]/20
                        dark:text-[#35d0bd]/10
                        dark:group-hover:text-[#35d0bd]/20
                      "
                    >
                      {step.number}
                    </span>

                    {/* Icon */}
                    <div
                      className="
                        relative z-10
                        flex h-12 w-12
                        items-center justify-center
                        rounded-full
                        border border-[#18a999]/20
                        bg-white
                        shadow-[0_8px_25px_rgba(7,31,70,0.10)]
                        ring-4 ring-white
                        transition-all duration-300
                        group-hover:scale-110
                        group-hover:border-[#18a999]/40
                        group-hover:shadow-[0_12px_30px_rgba(24,169,153,0.18)]
                        dark:border-white/10
                        dark:bg-[#12365d]
                        dark:ring-[#071f46]
                        dark:group-hover:border-[#35d0bd]/40
                      "
                    >
                      <Icon
                        className="
                          h-5 w-5
                          text-[#128f82]
                          transition-transform duration-300
                          group-hover:scale-110
                          dark:text-[#35d0bd]
                        "
                        strokeWidth={1.8}
                      />
                    </div>
                  </div>

                  {/* Text card */}
                  <div
                    className="
                      mt-5
                      rounded-2xl
                      px-4 py-4
                      transition-all duration-300
                      group-hover:bg-slate-50
                      dark:group-hover:bg-white/5
                    "
                  >
                    <h3
                      className="
                        text-lg font-semibold
                        text-[#071f46]
                        dark:text-white
                      "
                    >
                      {t(`steps.${step.key}.title`)}
                    </h3>

                    <p
                      className="
                        mt-2
                        max-w-[240px]
                        text-sm leading-relaxed
                        text-slate-600
                        dark:text-white/60
                      "
                    >
                      {t(`steps.${step.key}.description`)}
                    </p>

                    {step.hasTag && (
                      <span
                        className="
                          mt-4
                          inline-flex items-center gap-1.5
                          rounded-full
                          border border-[#18a999]/15
                          bg-[#18a999]/10
                          px-3 py-1
                          text-xs font-medium
                          text-[#128f82]
                          dark:border-[#35d0bd]/20
                          dark:bg-[#18a999]/15
                          dark:text-[#35d0bd]
                        "
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />

                        {t(`steps.${step.key}.tag`)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            MOBILE TIMELINE
        ========================================================= */}

        <div className="relative mt-14 md:hidden">
          {/* Base timeline */}
          <div
            className="
              absolute
              bottom-0 left-6 top-0
              w-[2px]
              rounded-full
              bg-slate-200
              dark:bg-white/10
            "
          />

          {/* Progress */}
          <div
            className="
              absolute
              left-6 top-0
              w-[2px]
              origin-top
              rounded-full
              bg-gradient-to-b
              from-[#18a999]
              to-[#35d0bd]
              transition-[height]
              duration-100
            "
            style={{
              height: `${progress * 100}%`,
            }}
          />

          {/* Mobile progress dot */}
          <div
            className="
              absolute left-6
              h-4 w-4
              -translate-x-1/2
              rounded-full
              border-4
              border-white
              bg-[#18a999]
              shadow-[0_0_0_5px_rgba(24,169,153,0.12)]
              dark:border-[#071f46]
              dark:bg-[#35d0bd]
            "
            style={{
              top: `${progress * 100}%`,
            }}
          />

          {/* Steps */}
          <div className="flex flex-col gap-12">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const { ref, visible } = reveals[index];

              return (
                <div
                  key={step.number}
                  ref={ref}
                  className={`
                    group
                    relative pl-16
                    transition-all duration-700 ease-out
                    ${
                      visible
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-5 opacity-0"
                    }
                  `}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  {/* Icon circle */}
                  <div
                    className="
                      absolute left-0 top-0
                      flex h-12 w-12
                      items-center justify-center
                      rounded-full
                      border border-[#18a999]/20
                      bg-white
                      shadow-[0_8px_25px_rgba(7,31,70,0.10)]
                      ring-4 ring-white
                      transition-all duration-300
                      group-hover:scale-110
                      dark:border-white/10
                      dark:bg-[#12365d]
                      dark:ring-[#071f46]
                    "
                  >
                    <Icon
                      className="
                        h-5 w-5
                        text-[#128f82]
                        dark:text-[#35d0bd]
                      "
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* Step number */}
                  <span
                    className="
                      text-xs font-semibold
                      uppercase tracking-[0.16em]
                      text-[#128f82]
                      dark:text-[#35d0bd]
                    "
                  >
                    {t("stepLabel")} {step.number}
                  </span>

                  {/* Title */}
                  <h3
                    className="
                      mt-1
                      text-lg font-semibold
                      text-[#071f46]
                      dark:text-white
                    "
                  >
                    {t(`steps.${step.key}.title`)}
                  </h3>

                  {/* Description */}
                  <p
                    className="
                      mt-2
                      max-w-lg
                      text-sm leading-relaxed
                      text-slate-600
                      dark:text-white/60
                    "
                  >
                    {t(`steps.${step.key}.description`)}
                  </p>

                  {/* Tag */}
                  {step.hasTag && (
                    <span
                      className="
                        mt-3
                        inline-flex items-center gap-1.5
                        rounded-full
                        border border-[#18a999]/15
                        bg-[#18a999]/10
                        px-3 py-1
                        text-xs font-medium
                        text-[#128f82]
                        dark:border-[#35d0bd]/20
                        dark:bg-[#18a999]/15
                        dark:text-[#35d0bd]
                      "
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />

                      {t(`steps.${step.key}.tag`)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            BOTTOM CTA
        ========================================================= */}

        <div
          className="
            relative mt-16
            overflow-hidden
            rounded-3xl
            border border-[#18a999]/10
            bg-gradient-to-r
            from-[#eefaf8]
            via-white
            to-[#f0f7ff]
            px-6 py-7
            transition-colors duration-300
            dark:border-white/10
            dark:from-[#0d2b50]
            dark:via-[#102f55]
            dark:to-[#12365d]
            sm:px-8
          "
        >
          {/* Decorative glow */}
          <div
            className="
              pointer-events-none
              absolute -right-10 -top-16
              h-40 w-40
              rounded-full
              bg-[#18a999]/10
              blur-3xl
              dark:bg-[#35d0bd]/10
            "
          />

          <div
            className="
              relative
              flex flex-col
              items-center
              justify-between
              gap-5
              sm:flex-row
            "
          >
            {/* CTA text */}
            <div className="text-center sm:text-left">
              <p
                className="
                  text-base font-semibold
                  text-[#071f46]
                  dark:text-white
                "
              >
                {t("cta.title")}
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-600
                  dark:text-white/60
                "
              >
                {t("cta.description")}
              </p>
            </div>

            {/* CTA button */}
            <Link
              href="/book"
              className="
                group
                inline-flex
                shrink-0
                items-center gap-2
                rounded-full
                bg-[#18a999]
                px-6 py-3
                text-sm font-semibold
                text-white
                shadow-[0_8px_25px_rgba(24,169,153,0.22)]
                transition-all duration-200
                hover:-translate-y-0.5
                hover:bg-[#128f82]
                hover:shadow-[0_12px_30px_rgba(24,169,153,0.30)]
                dark:bg-[#18a999]
                dark:hover:bg-[#35d0bd]
                dark:hover:text-[#071f46]
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
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}