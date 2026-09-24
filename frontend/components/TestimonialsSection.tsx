"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  MessageCircleHeart,
} from "lucide-react";
import { useTranslations } from "next-intl";

type Featured = {
  key: string;
  rating: number;
  photo: string;
};

type Mini = {
  key: string;
  rating: number;
  photo: string;
};

const FEATURED: Featured[] = [
  {
    key: "selamawit",
    rating: 5,
    photo: "https://i.pravatar.cc/150?img=32",
  },
  {
    key: "daniel",
    rating: 5,
    photo: "https://i.pravatar.cc/150?img=12",
  },
  {
    key: "marta",
    rating: 5,
    photo: "https://i.pravatar.cc/150?img=45",
  },
  {
    key: "yonas",
    rating: 4,
    photo: "https://i.pravatar.cc/150?img=51",
  },
];

const MINI: Mini[] = [
  {
    key: "hana",
    rating: 5,
    photo: "https://i.pravatar.cc/150?img=5",
  },
  {
    key: "abel",
    rating: 5,
    photo: "https://i.pravatar.cc/150?img=15",
  },
  {
    key: "ruth",
    rating: 4,
    photo: "https://i.pravatar.cc/150?img=25",
  },
  {
    key: "samuel",
    rating: 5,
    photo: "https://i.pravatar.cc/150?img=35",
  },
  {
    key: "bethlehem",
    rating: 5,
    photo: "https://i.pravatar.cc/150?img=45",
  },
  {
    key: "kalkidan",
    rating: 4,
    photo: "https://i.pravatar.cc/150?img=56",
  },
  {
    key: "nathnael",
    rating: 5,
    photo: "https://i.pravatar.cc/150?img=60",
  },
  {
    key: "eden",
    rating: 5,
    photo: "https://i.pravatar.cc/150?img=65",
  },
];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`
            h-4 w-4
            transition-colors duration-300
            ${
              i < rating
                ? "fill-[#18a999] text-[#18a999] dark:fill-[#35d0bd] dark:text-[#35d0bd]"
                : "fill-slate-100 text-slate-200 dark:fill-white/5 dark:text-white/15"
            }
          `}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const t = useTranslations("Home.testimonials");

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  /*
   * ============================================================
   * FEATURED TESTIMONIAL AUTO ROTATION
   * ============================================================
   */

  useEffect(() => {
    if (paused) return;

    const id = setInterval(() => {
      setIndex(
        (current) => (current + 1) % FEATURED.length,
      );
    }, 5000);

    return () => clearInterval(id);
  }, [paused]);

  /*
   * ============================================================
   * MINI TESTIMONIAL TRACK
   * ============================================================
   */

  const trackRef = useRef<HTMLDivElement>(null);

  const [scales, setScales] = useState<number[]>(
    () => MINI.map(() => 0.94),
  );

  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const scrollStart = useRef(0);

  const updateScales = useCallback(() => {
    const track = trackRef.current;

    if (!track) return;

    const trackRect = track.getBoundingClientRect();

    const center =
      trackRect.left + trackRect.width / 2;

    const cards = Array.from(
      track.children,
    ) as HTMLElement[];

    const next = cards.map((card) => {
      const rect = card.getBoundingClientRect();

      const cardCenter =
        rect.left + rect.width / 2;

      const distance = Math.abs(
        cardCenter - center,
      );

      const normalized = Math.min(
        distance / (trackRect.width / 2),
        1,
      );

      return 1.04 - normalized * 0.1;
    });

    setScales(next);
  }, []);

  useEffect(() => {
    updateScales();

    const track = trackRef.current;

    if (!track) return;

    const onScroll = () => {
      requestAnimationFrame(updateScales);
    };

    track.addEventListener("scroll", onScroll, {
      passive: true,
    });

    window.addEventListener("resize", onScroll);

    return () => {
      track.removeEventListener(
        "scroll",
        onScroll,
      );

      window.removeEventListener(
        "resize",
        onScroll,
      );
    };
  }, [updateScales]);

  /*
   * ============================================================
   * DRAG SCROLLING
   * ============================================================
   */

  const onPointerDown = (
    event: React.PointerEvent,
  ) => {
    const track = trackRef.current;

    if (!track) return;

    isDragging.current = true;

    dragStartX.current = event.clientX;

    scrollStart.current = track.scrollLeft;

    track.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (
    event: React.PointerEvent,
  ) => {
    if (
      !isDragging.current ||
      !trackRef.current
    ) {
      return;
    }

    const distance =
      event.clientX - dragStartX.current;

    trackRef.current.scrollLeft =
      scrollStart.current - distance;
  };

  const onPointerUp = () => {
    isDragging.current = false;
  };

  /*
   * ============================================================
   * FEATURED NAVIGATION
   * ============================================================
   */

  const previous = () => {
    setIndex(
      (current) =>
        (current - 1 + FEATURED.length) %
        FEATURED.length,
    );
  };

  const next = () => {
    setIndex(
      (current) =>
        (current + 1) % FEATURED.length,
    );
  };

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <section
      className="
        relative overflow-hidden
        bg-slate-50
        py-20
        transition-colors duration-300
        dark:bg-[#071f46]
        lg:py-28
      "
    >
      {/* ========================================================
          DECORATIVE BACKGROUND
      ======================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Left glow */}
        <div
          className="
            absolute -left-40 top-10
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
            absolute -right-40 bottom-10
            h-96 w-96
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
            h-72 w-72
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#18a999]/5
            blur-3xl
          "
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* ========================================================
            SECTION HEADING
        ======================================================== */}

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
            <MessageCircleHeart className="h-4 w-4" />

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

        {/* ========================================================
            FEATURED TESTIMONIAL
        ======================================================== */}

        <div
          className="relative mx-auto mt-14 max-w-4xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="
              relative min-h-[390px]
              overflow-hidden
              rounded-[2rem]
              border
              border-slate-200
              bg-white
              p-8
              shadow-[0_20px_60px_rgba(7,31,70,0.09)]
              transition-all duration-300
              dark:border-white/10
              dark:bg-[#0d2b50]
              dark:shadow-[0_20px_60px_rgba(0,0,0,0.25)]
              sm:min-h-[370px]
              sm:p-12
            "
          >
            {/* Top accent */}
            <div
              className="
                absolute left-1/2 top-0
                h-1 w-32
                -translate-x-1/2
                rounded-b-full
                bg-gradient-to-r
                from-[#18a999]
                to-[#35d0bd]
              "
            />

            {/* Decorative quote */}
            <Quote
              className="
                pointer-events-none
                absolute
                -left-3
                -top-6
                h-40 w-40
                text-[#18a999]/8
                dark:text-[#18a999]/10
              "
              fill="currentColor"
              strokeWidth={0}
            />

            <Quote
              className="
                pointer-events-none
                absolute
                -bottom-10
                -right-4
                h-32 w-32
                rotate-180
                text-[#18a999]/5
                dark:text-[#35d0bd]/5
              "
              fill="currentColor"
              strokeWidth={0}
            />

            {/* Featured testimonials */}
            {FEATURED.map((item, i) => (
              <div
                key={item.key}
                className={`
                  absolute inset-0
                  flex flex-col
                  items-center justify-center
                  p-8 text-center
                  transition-all duration-700
                  ease-out
                  sm:p-12
                  ${
                    i === index
                      ? "z-10 translate-y-0 opacity-100"
                      : "pointer-events-none z-0 translate-y-3 opacity-0"
                  }
                `}
              >
                {/* Avatar */}
                <div
                  className="
                    rounded-full
                    p-1
                    ring-2
                    ring-[#18a999]/20
                    dark:ring-[#35d0bd]/30
                  "
                >
                  <img
                    src={item.photo}
                    alt={t(
                      `featured.${item.key}.name`,
                    )}
                    className="
                      h-16 w-16
                      rounded-full
                      object-cover
                    "
                  />
                </div>

                {/* Quote */}
                <p
                  className="
                    relative mt-6
                    max-w-2xl
                    text-lg
                    leading-relaxed
                    text-slate-700
                    transition-colors duration-300
                    dark:text-white/80
                    sm:text-xl
                  "
                >
                  “
                  {t(
                    `featured.${item.key}.quote`,
                  )}
                  ”
                </p>

                {/* Rating */}
                <div className="mt-5">
                  <StarRow rating={item.rating} />
                </div>

                {/* Name */}
                <p
                  className="
                    mt-4
                    text-sm font-semibold
                    text-[#071f46]
                    dark:text-white
                  "
                >
                  {t(
                    `featured.${item.key}.name`,
                  )}
                </p>

                {/* Role */}
                <p
                  className="
                    mt-1
                    text-xs
                    text-slate-500
                    dark:text-white/45
                  "
                >
                  {t(
                    `featured.${item.key}.role`,
                  )}
                </p>
              </div>
            ))}

            {/* Previous */}
            <button
              type="button"
              onClick={previous}
              aria-label={t("controls.previous")}
              className="
                absolute left-4 top-1/2 z-20
                flex h-10 w-10
                -translate-y-1/2
                items-center justify-center
                rounded-full
                border
                border-slate-200
                bg-white/90
                text-[#071f46]
                shadow-sm
                backdrop-blur
                transition-all duration-200
                hover:scale-105
                hover:border-[#18a999]
                hover:text-[#18a999]
                dark:border-white/10
                dark:bg-[#12365d]/90
                dark:text-white
                dark:hover:border-[#35d0bd]
                dark:hover:text-[#35d0bd]
              "
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={next}
              aria-label={t("controls.next")}
              className="
                absolute right-4 top-1/2 z-20
                flex h-10 w-10
                -translate-y-1/2
                items-center justify-center
                rounded-full
                border
                border-slate-200
                bg-white/90
                text-[#071f46]
                shadow-sm
                backdrop-blur
                transition-all duration-200
                hover:scale-105
                hover:border-[#18a999]
                hover:text-[#18a999]
                dark:border-white/10
                dark:bg-[#12365d]/90
                dark:text-white
                dark:hover:border-[#35d0bd]
                dark:hover:text-[#35d0bd]
              "
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* ======================================================
              DOT NAVIGATION
          ====================================================== */}

          <div className="mt-7 flex items-center justify-center gap-2">
            {FEATURED.map((item, i) => (
              <button
                key={item.key}
                type="button"
                aria-label={t(
                  "controls.showTestimonial",
                  {
                    number: i + 1,
                  },
                )}
                onClick={() => setIndex(i)}
                className={`
                  h-2.5 rounded-full
                  transition-all duration-300
                  ${
                    i === index
                      ? "w-8 bg-[#18a999] dark:bg-[#35d0bd]"
                      : "w-2.5 bg-slate-200 hover:bg-slate-300 dark:bg-white/15 dark:hover:bg-white/30"
                  }
                `}
              />
            ))}
          </div>
        </div>

        {/* ========================================================
            MINI TESTIMONIALS HEADING
        ======================================================== */}

        <div className="mt-20 text-center">
          <p
            className="
              text-sm font-medium
              text-slate-500
              dark:text-white/50
            "
          >
            {t("moreTitle")}
          </p>
        </div>

        {/* ========================================================
            MINI TESTIMONIALS
        ======================================================== */}

        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          className="
            mt-7
            flex
            cursor-grab
            snap-x snap-mandatory
            gap-5
            overflow-x-auto
            pb-6
            active:cursor-grabbing
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {MINI.map((item, i) => (
            <div
              key={item.key}
              className="
                w-[250px]
                shrink-0
                snap-center
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-[0_8px_25px_rgba(7,31,70,0.06)]
                transition-all duration-200
                dark:border-white/10
                dark:bg-[#0d2b50]
                dark:shadow-[0_10px_30px_rgba(0,0,0,0.18)]
              "
              style={{
                transform: `scale(${
                  scales[i] ?? 0.94
                })`,
              }}
            >
              {/* Person */}
              <div className="flex items-center gap-3">
                <div
                  className="
                    rounded-full
                    p-0.5
                    ring-1
                    ring-[#18a999]/20
                    dark:ring-[#35d0bd]/20
                  "
                >
                  <img
                    src={item.photo}
                    alt={t(
                      `mini.${item.key}.name`,
                    )}
                    className="
                      h-10 w-10
                      rounded-full
                      object-cover
                    "
                    draggable={false}
                  />
                </div>

                <div>
                  <p
                    className="
                      text-sm font-semibold
                      text-[#071f46]
                      dark:text-white
                    "
                  >
                    {t(
                      `mini.${item.key}.name`,
                    )}
                  </p>

                  <div className="mt-1">
                    <StarRow
                      rating={item.rating}
                    />
                  </div>
                </div>
              </div>

              {/* Quote */}
              <p
                className="
                  mt-4
                  text-sm leading-relaxed
                  text-slate-600
                  dark:text-white/60
                "
              >
                “
                {t(
                  `mini.${item.key}.quote`,
                )}
                ”
              </p>
            </div>
          ))}
        </div>

        {/* ========================================================
            BOTTOM STATEMENT
        ======================================================== */}

        <div
          className="
            mx-auto mt-10
            flex max-w-2xl
            items-center justify-center
            gap-3
            rounded-2xl
            border
            border-[#18a999]/10
            bg-white/70
            px-5 py-4
            text-center
            backdrop-blur-sm
            dark:border-white/10
            dark:bg-white/5
          "
        >
          <span
            className="
              flex h-9 w-9
              shrink-0
              items-center justify-center
              rounded-full
              bg-[#18a999]/10
              dark:bg-[#35d0bd]/10
            "
          >
            <Star
              className="
                h-4 w-4
                fill-[#18a999]
                text-[#18a999]
                dark:fill-[#35d0bd]
                dark:text-[#35d0bd]
              "
            />
          </span>

          <p
            className="
              text-sm
              text-slate-600
              dark:text-white/55
            "
          >
            {t("bottomStatement")}
          </p>
        </div>
      </div>
    </section>
  );
}