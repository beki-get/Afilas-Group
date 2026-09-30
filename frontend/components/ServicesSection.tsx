// components/ServicesSection.tsx

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type Service = {
  image: string;
  key: "hospital" | "diagnosis" | "pharma";
  href: "/hospital" | "/diagnosis" | "/pharma";
  bookingKey: "hospital" | "diagnosis" | "pharma";
  accent: string;
};

const SERVICES: Service[] = [
  {
    image: "/images/hospital/hospital-hero1.jpg",
    key: "hospital",
    href: "/hospital",
    bookingKey: "hospital",
    accent: "from-[#18a999] to-[#35d0bd]",
  },
  {
    image: "/images/diagnosis/diagnosis-hero1.jpg",
    key: "diagnosis",
    href: "/diagnosis",
    bookingKey: "diagnosis",
    accent: "from-[#2563eb] to-[#38bdf8]",
  },
  {
    image: "/images/manufacturing/manufacture11.jpg",
    key: "pharma",
    href: "/pharma",
    bookingKey: "pharma",
    accent: "from-[#8b5cf6] to-[#c084fc]",
  },
];

export default function ServicesSection() {
  const t = useTranslations("Home.services");

  const sectionRef = useRef<HTMLDivElement>(null);

  const [inView, setInView] = useState(false);

  /* =========================================================
     Detect section visibility
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
        threshold: 0.15,
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="
        relative overflow-hidden
        bg-[#FBFAF7]
        py-20
        transition-colors duration-300
        dark:bg-[#071f46]
        lg:py-28
      "
    >
      {/* =====================================================
          Background decoration
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute -left-40 top-20
          h-80 w-80
          rounded-full
          bg-[#18a999]/8
          blur-3xl
          dark:bg-[#18a999]/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute -right-40 bottom-20
          h-96 w-96
          rounded-full
          bg-[#35d0bd]/8
          blur-3xl
          dark:bg-[#35d0bd]/10
        "
      />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* ===================================================
            Section heading
        =================================================== */}

        <div className="mx-auto max-w-3xl text-center">

          {/* Badge */}

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
              {t("badge")}
            </span>
          </div>

          <h2
            className="
              mt-5
              text-3xl
              font-semibold
              tracking-tight
              text-[#071f46]
              transition-colors duration-300
              dark:text-white
              sm:text-4xl
              lg:text-[2.75rem]
            "
          >
            {t("title")}
          </h2>

          <p
            className="
              mt-5
              text-lg
              leading-relaxed
              text-[#071f46]/65
              transition-colors duration-300
              dark:text-white/70
              sm:text-xl
            "
          >
            {t("description")}
          </p>
        </div>

        {/* ===================================================
            Service cards
        =================================================== */}

        <div
          className="
            mt-14
            grid
            grid-cols-1
            gap-6
            md:grid-cols-3
            lg:gap-8
          "
        >
          {SERVICES.map((service, i) => {
            const highlights = t.raw(
              `items.${service.key}.highlights`
            ) as string[];

            return (
              <article
                key={service.key}
                className={`
                  group
                  relative
                  flex flex-col
                  overflow-hidden
                  rounded-[1.75rem]
                  border
                  border-[#071f46]/8
                  bg-white
                  shadow-[0_8px_35px_rgba(7,31,70,0.07)]

                  transition-all
                  duration-700
                  ease-out

                  hover:-translate-y-2
                  hover:shadow-[0_22px_55px_rgba(7,31,70,0.13)]

                  dark:border-white/10
                  dark:bg-[#0d2b50]
                  dark:shadow-[0_12px_35px_rgba(0,0,0,0.20)]
                  dark:hover:shadow-[0_22px_55px_rgba(0,0,0,0.32)]

                  ${
                    inView
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }
                `}
                style={{
                  transitionDelay: inView
                    ? `${i * 150}ms`
                    : "0ms",
                }}
              >
                {/* =================================================
                    Image
                ================================================= */}

                <div className="relative h-56 w-full overflow-hidden">

                  <Image
                    src={service.image}
                    alt={t(
                      `items.${service.key}.title`
                    )}
                    fill
                    sizes="
                      (max-width: 768px) 100vw,
                      (max-width: 1280px) 33vw,
                      400px
                    "
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-105
                    "
                  />

                  {/* Image overlay */}

                  <div
                    className="
                      absolute inset-0
                      bg-gradient-to-t
                      from-[#071f46]/70
                      via-[#071f46]/10
                      to-transparent
                    "
                  />

                  {/* Accent line */}

                  <div
                    className={`
                      absolute
                      bottom-0 left-0
                      h-1
                      w-full
                      bg-gradient-to-r
                      ${service.accent}
                      scale-x-0
                      origin-left
                      transition-transform
                      duration-500
                      group-hover:scale-x-100
                    `}
                  />

                  {/* Division badge */}

                  <div
                    className="
                      absolute
                      left-5
                      top-5
                      rounded-full
                      border
                      border-white/20
                      bg-black/20
                      px-3 py-1.5
                      text-xs
                      font-semibold
                      text-white
                      backdrop-blur-md
                    "
                  >
                    {t(
                      `items.${service.key}.shortLabel`
                    )}
                  </div>
                </div>

                {/* =================================================
                    Content
                ================================================= */}

                <div className="flex flex-1 flex-col p-7 sm:p-8">

                  {/* Title */}

                  <h3
                    className="
                      text-2xl
                      font-semibold
                      leading-snug
                      text-[#071f46]
                      dark:text-white
                    "
                  >
                    {t(
                      `items.${service.key}.title`
                    )}
                  </h3>

                  {/* Tagline */}

                  <p
                    className="
                      mt-2
                      text-[0.95rem]
                      font-medium
                      text-[#18a999]
                      dark:text-[#35d0bd]
                    "
                  >
                    {t(
                      `items.${service.key}.tagline`
                    )}
                  </p>

                  {/* Description */}

                  <p
                    className="
                      mt-3
                      text-base
                      leading-relaxed
                      text-[#071f46]/65
                      dark:text-white/65
                    "
                  >
                    {t(
                      `items.${service.key}.description`
                    )}
                  </p>

                  {/* Highlights */}

                  <ul className="mt-6 flex flex-col gap-3">

                    {highlights.map(
                      (point, index) => (
                        <li
                          key={`${service.key}-${index}`}
                          className="
                            flex
                            items-start
                            gap-2.5
                            text-sm
                            leading-relaxed
                            text-[#071f46]/70
                            dark:text-white/70
                          "
                        >
                          <CheckCircle2
                            className="
                              mt-0.5
                              h-4 w-4
                              shrink-0
                              text-[#18a999]
                              dark:text-[#35d0bd]
                            "
                            strokeWidth={2}
                          />

                          <span>{point}</span>
                        </li>
                      )
                    )}

                  </ul>

                  {/* =================================================
                      Buttons
                  ================================================= */}

                  <div className="mt-auto pt-7">

                    {/* Main button */}

                    <Link
                      href={service.href}
                      className="
                        group/button
                        inline-flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-full
                        bg-[#18a999]
                        px-6 py-3.5
                        text-sm
                        font-semibold
                        text-white
                        shadow-[0_8px_22px_rgba(24,169,153,0.20)]
                        transition-all
                        duration-300
                        hover:bg-[#138f82]
                        hover:shadow-[0_12px_28px_rgba(24,169,153,0.28)]
                      "
                    >
                      {t(
                        `items.${service.key}.cta`
                      )}

                      <ArrowRight
                        className="
                          h-4 w-4
                          transition-transform
                          duration-300
                          group-hover/button:translate-x-1
                        "
                      />
                    </Link>

                    {/* Appointment */}

                    <Link
                      href={{
                        pathname: "/book",
                        query: {
                          service: service.bookingKey,
                        },
                      }}
                      className="
                        group/appointment
                        mt-4
                        inline-flex
                        w-full
                        items-center
                        justify-center
                        gap-1.5
                        text-sm
                        font-medium
                        text-[#18a999]
                        transition-colors
                        duration-200
                        hover:text-[#138f82]
                        dark:text-[#35d0bd]
                        dark:hover:text-white
                      "
                    >
                      {t("bookAppointment")}

                      <ArrowRight
                        className="
                          h-3.5 w-3.5
                          transition-transform
                          duration-200
                          group-hover/appointment:translate-x-1
                        "
                      />
                    </Link>

                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ===================================================
            Bottom message
        =================================================== */}

        <div
          className="
            mt-12
            flex
            flex-col
            items-center
            justify-center
            gap-3
            text-center
            sm:flex-row
          "
        >
          <span
            className="
              h-2
              w-2
              rounded-full
              bg-[#18a999]
              dark:bg-[#35d0bd]
            "
          />

          <p
            className="
              text-sm
              text-[#071f46]/55
              dark:text-white/55
            "
          >
            {t("bottomMessage")}
          </p>
        </div>
      </div>
    </section>
  );
}