// components/TestimonialsSection.tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Star, Quote } from "lucide-react";

type Featured = {
  name: string;
  role: string;
  quote: string;
  rating: number;
  photo: string;
};

type Mini = {
  name: string;
  quote: string;
  rating: number;
  photo: string;
};

const FEATURED: Featured[] = [
  {
    name: "Selamawit Bekele",
    role: "Cardiology Patient",
    quote:
      "The team walked me through every step of my treatment with patience and honesty. I never once felt like just another appointment.",
    rating: 5,
    photo: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Daniel Tesfaye",
    role: "Diagnostics Patient",
    quote:
      "I had lab results back the same afternoon, explained clearly by a real doctor — not just a printout. That made all the difference.",
    rating: 5,
    photo: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Marta Alemu",
    role: "Maternity Patient",
    quote:
      "From my first prenatal visit to delivery, the same team was with me the whole way. It felt like being cared for by family.",
    rating: 5,
    photo: "https://i.pravatar.cc/150?img=45",
  },
  {
    name: "Yonas Girma",
    role: "Orthopedics Patient",
    quote:
      "Booking was simple, the clinic was on time, and my recovery plan was clear from day one. Exactly what I needed after my injury.",
    rating: 4,
    photo: "https://i.pravatar.cc/150?img=51",
  },
];

const MINI: Mini[] = [
  {
    name: "Hana Tadesse",
    quote: "Fast, kind, and thorough every time.",
    rating: 5,
    photo: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "Abel Kebede",
    quote: "Best diagnostic turnaround I've had.",
    rating: 5,
    photo: "https://i.pravatar.cc/150?img=15",
  },
  {
    name: "Ruth Mekonnen",
    quote: "My kids actually don't mind check-ups now.",
    rating: 4,
    photo: "https://i.pravatar.cc/150?img=25",
  },
  {
    name: "Samuel Wolde",
    quote: "Clear pricing, no surprises at all.",
    rating: 5,
    photo: "https://i.pravatar.cc/150?img=35",
  },
  {
    name: "Bethlehem Assefa",
    quote: "Felt heard from the very first visit.",
    rating: 5,
    photo: "https://i.pravatar.cc/150?img=45",
  },
  {
    name: "Kalkidan Fikru",
    quote: "Follow-up calls made me feel cared for.",
    rating: 4,
    photo: "https://i.pravatar.cc/150?img=56",
  },
  {
    name: "Nathnael Yohannes",
    quote: "Modern equipment, zero long waits.",
    rating: 5,
    photo: "https://i.pravatar.cc/150?img=60",
  },
  {
    name: "Eden Getachew",
    quote: "Booking online took under a minute.",
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
          className={`h-4 w-4 ${i < rating ? "fill-sage-600 text-sage-600" : "fill-sage-100 text-sage-200"}`}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-rotate featured testimonial every 5s, paused on hover.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % FEATURED.length);
    }, 5000);
    return () => clearInterval(id);
  }, [paused]);

  // Horizontal drag-scroll + proximity-to-center scaling for the mini strip.
  const trackRef = useRef<HTMLDivElement>(null);
  const [scales, setScales] = useState<number[]>(() => MINI.map(() => 0.92));
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const scrollStart = useRef(0);

  const updateScales = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const trackRect = track.getBoundingClientRect();
    const center = trackRect.left + trackRect.width / 2;
    const cards = Array.from(track.children) as HTMLElement[];
    const next = cards.map((card) => {
      const r = card.getBoundingClientRect();
      const cardCenter = r.left + r.width / 2;
      const dist = Math.abs(cardCenter - center);
      const norm = Math.min(dist / (trackRect.width / 2), 1);
      return 1.06 - norm * 0.14; // ~1.06 at center, ~0.92 at edges
    });
    setScales(next);
  }, []);

  useEffect(() => {
    updateScales();
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => requestAnimationFrame(updateScales);
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [updateScales]);

  const onPointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    isDragging.current = true;
    dragStartX.current = e.clientX;
    scrollStart.current = track.scrollLeft;
    track.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    const dx = e.clientX - dragStartX.current;
    trackRef.current.scrollLeft = scrollStart.current - dx;
  };
  const onPointerUp = () => {
    isDragging.current = false;
  };

  return (
    <section className="bg-sage-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-semibold text-ink sm:text-4xl">
            Stories From Our Patients
          </h2>
        </div>

        {/* Featured testimonial */}
        <div
          className="relative mx-auto mt-14 max-w-2xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative min-h-[320px] overflow-hidden rounded-3xl bg-white p-10 shadow-[0_4px_24px_rgba(15,23,18,0.08)] sm:p-12">
            <Quote
              className="pointer-events-none absolute -top-4 left-6 h-28 w-28 text-sage-100"
              fill="currentColor"
              strokeWidth={0}
            />
            {FEATURED.map((item, i) => (
              <div
                key={item.name}
                className={`absolute inset-0 flex flex-col items-center justify-center p-10 text-center transition-opacity duration-700 ease-out sm:p-12 ${
                  i === index
                    ? "z-10 opacity-100"
                    : "pointer-events-none z-0 opacity-0"
                }`}
              >
                <img
                  src={item.photo}
                  alt={item.name}
                  className="h-16 w-16 rounded-full object-cover shadow-sm"
                />
                <p className="relative mt-5 max-w-lg text-lg leading-relaxed text-ink/80 sm:text-xl">
                  {item.quote}
                </p>
                <div className="mt-5">
                  <StarRow rating={item.rating} />
                </div>
                <p className="mt-3 text-sm font-semibold text-ink">
                  {item.name}
                </p>
                <p className="text-xs text-ink/50">{item.role}</p>
              </div>
            ))}
          </div>

          {/* Dot navigation */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {FEATURED.map((_, i) => (
              <button
                key={i}
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-6 bg-sage-600"
                    : "w-2 bg-sage-200 hover:bg-sage-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scrollable mini testimonials */}
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          className="mt-16 flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto pb-4 active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {MINI.map((item, i) => (
            <div
              key={item.name}
              className="w-[240px] shrink-0 snap-center rounded-2xl bg-white p-6 shadow-[0_2px_14px_rgba(15,23,18,0.06)] transition-transform duration-150 ease-out"
              style={{ transform: `scale(${scales[i] ?? 0.92})` }}
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.photo}
                  alt={item.name}
                  className="h-10 w-10 rounded-full object-cover"
                  draggable={false}
                />
                <div>
                  <p className="text-sm font-semibold text-ink">{item.name}</p>
                  <StarRow rating={item.rating} />
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink/65">
                `&quot;`{item.quote}`&quot;`
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
