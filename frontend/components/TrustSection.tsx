// components/TrustSection.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import { Clock, Users, Star, Headset } from "lucide-react";
import { useTranslations } from "next-intl";

type Stat = {
  icon: React.ElementType;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  key: string;
};

const STATS: Stat[] = [
  {
    icon: Clock,
    value: 15,
    suffix: "+",
    key: "experience",
  },
  {
    icon: Users,
    value: 50000,
    suffix: "+",
    key: "patients",
  },
  {
    icon: Star,
    value: 4.9,
    decimals: 1,
    suffix: "★",
    key: "rating",
  },
  {
    icon: Headset,
    value: 24,
    suffix: "/7",
    key: "support",
  },
];

function formatValue(value: number, decimals = 0) {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export default function TrustSection() {
  const t = useTranslations("Home.trust");

  const sectionRef = useRef<HTMLDivElement>(null);

  const [inView, setInView] = useState(false);

  const [counts, setCounts] = useState(
    STATS.map(() => 0)
  );

  /* =========================================================
     Detect when section enters viewport
  ========================================================= */

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
      {
        threshold: 0.25,
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  /* =========================================================
     Animated counters
  ========================================================= */

  useEffect(() => {
    if (!inView) return;

    const duration = 1400;
    const start = performance.now();

    let animationFrame: number;

    const tick = (now: number) => {
      const progress = Math.min(
        (now - start) / duration,
        1
      );

      const eased =
        1 - Math.pow(1 - progress, 3);

      setCounts(
        STATS.map(
          (stat) => stat.value * eased
        )
      );

      if (progress < 1) {
        animationFrame =
          requestAnimationFrame(tick);
      }
    };

    animationFrame =
      requestAnimationFrame(tick);

    return () =>
      cancelAnimationFrame(animationFrame);
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      className="
        relative overflow-hidden
        border-y
        border-[#18a999]/10
        bg-[#f3f9f8]
        transition-colors duration-300
        dark:border-white/10
        dark:bg-[#0a294d]
      "
    >
      {/* =====================================================
          Background decoration
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute -left-32 top-1/2
          h-72 w-72
          -translate-y-1/2
          rounded-full
          bg-[#18a999]/10
          blur-3xl
          dark:bg-[#18a999]/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute -right-32 top-0
          h-72 w-72
          rounded-full
          bg-[#35d0bd]/10
          blur-3xl
          dark:bg-[#35d0bd]/10
        "
      />

      <div
        className="
          relative mx-auto
          max-w-7xl
          px-6 py-16
          lg:py-20
        "
      >

        {/* ===================================================
            Stats
        =================================================== */}

        <div
          className="
            grid
            grid-cols-2
            gap-y-10
            lg:grid-cols-4
            lg:gap-y-0
          "
        >
          {STATS.map((stat, i) => {
            const Icon = stat.icon;

            const isLast =
              i === STATS.length - 1;

            return (
              <div
                key={stat.key}
                className={`
                  group
                  relative
                  flex flex-col
                  items-center
                  px-4
                  text-center

                  lg:border-r
                  lg:border-[#18a999]/15

                  dark:lg:border-white/10

                  ${
                    isLast
                      ? "lg:border-r-0"
                      : ""
                  }
                `}
              >
                {/* Icon container */}

                <div
                  className="
                    flex h-12 w-12
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-[#18a999]/15
                    bg-white
                    shadow-sm
                    transition-all duration-300

                    group-hover:-translate-y-1
                    group-hover:border-[#18a999]/30
                    group-hover:shadow-md

                    dark:border-white/10
                    dark:bg-white/5
                  "
                >
                  <Icon
                    className="
                      h-6 w-6
                      text-[#18a999]
                      transition-transform duration-300
                      group-hover:scale-110
                      dark:text-[#35d0bd]
                    "
                    strokeWidth={1.75}
                  />
                </div>

                {/* Number */}

                <p
                  className="
                    mt-4
                    text-3xl
                    font-bold
                    tracking-tight
                    text-[#071f46]
                    dark:text-white
                    sm:text-4xl
                  "
                >
                  {stat.prefix}

                  {formatValue(
                    counts[i],
                    stat.decimals
                  )}

                  {stat.suffix}
                </p>

                {/* Label */}

                <p
                  className="
                    mt-1.5
                    text-sm
                    font-medium
                    text-[#071f46]/55
                    dark:text-white/60
                  "
                >
                  {t(`stats.${stat.key}`)}
                </p>
              </div>
            );
          })}
        </div>

        {/* ===================================================
            Trust message
        =================================================== */}

        <div
          className="
            mt-16
            border-t
            border-[#18a999]/15
            pt-10
            text-center
            dark:border-white/10
            lg:mt-20
            lg:pt-12
          "
        >
          {/* Small label */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#18a999]/15
              bg-[#18a999]/5
              px-4 py-2
              dark:border-[#35d0bd]/20
              dark:bg-white/5
            "
          >
            <span
              className="
                h-2
                w-2
                animate-pulse
                rounded-full
                bg-[#18a999]
                dark:bg-[#35d0bd]
              "
            />

            <span
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.16em]
                text-[#18a999]
                dark:text-[#35d0bd]
              "
            >
              {t("trustBadge")}
            </span>
          </div>

          {/* Heading */}

          <h2
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-2xl
              font-semibold
              tracking-tight
              text-[#071f46]
              dark:text-white
              sm:text-3xl
            "
          >
            {t("title")}
          </h2>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-3
              max-w-2xl
              text-sm
              leading-relaxed
              text-[#071f46]/60
              dark:text-white/60
              sm:text-base
            "
          >
            {t("description")}
          </p>

          {/* Healthcare pillars */}

          <div
            className="
              mt-8
              flex
              flex-wrap
              items-center
              justify-center
              gap-3
            "
          >
            {[
              "hospital",
              "diagnostics",
              "manufacturing",
            ].map((key) => (
              <div
                key={key}
                className="
                  rounded-full
                  border
                  border-[#18a999]/15
                  bg-white
                  px-4 py-2
                  text-sm
                  font-medium
                  text-[#071f46]/70
                  shadow-sm
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:border-[#18a999]/30
                  hover:text-[#18a999]

                  dark:border-white/10
                  dark:bg-white/5
                  dark:text-white/65
                  dark:hover:text-[#35d0bd]
                "
              >
                {t(`pillars.${key}`)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}