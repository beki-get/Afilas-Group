// components/TrustSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Clock, Users, Star, Headset } from "lucide-react";

type Stat = {
  icon: React.ElementType;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

const STATS: Stat[] = [
  { icon: Clock, value: 15, suffix: "+", label: "Years Experience" },
  { icon: Users, value: 50000, suffix: "+", label: "Patients Treated" },
  { icon: Star, value: 4.9, decimals: 1, suffix: "★", label: "Average Rating" },
  { icon: Headset, value: 24, suffix: "/7", label: "Support Available" },
];

// Fictional placeholder names — swap in real partner/insurer logos later.
const PARTNERS = [
  "MedInsure",
  "CarePlus Health",
  "Global Health Alliance",
  "Nile Assurance",
  "WellNet",
];

function formatValue(value: number, decimals = 0) {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export default function TrustSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [counts, setCounts] = useState(STATS.map(() => 0));

  // Trigger once when the section scrolls into view.
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
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Animate the counters once in view.
  useEffect(() => {
    if (!inView) return;

    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic

      setCounts(STATS.map((stat) => stat.value * eased));

      if (progress < 1) requestAnimationFrame(tick);
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return (
    <section ref={sectionRef} className="bg-sage-50">
      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .marquee {
          animation: marquee 20s linear infinite;
        }

        .marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        {/* Stats row */}
        <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:gap-y-0">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            const isLast = i === STATS.length - 1;
            return (
              <div
                key={stat.label}
                className={[
                  "flex flex-col items-center px-4 text-center lg:border-sage-200",
                  !isLast ? "lg:border-r" : "",
                ].join(" ")}
              >
                <Icon className="h-6 w-6 text-sage-600" strokeWidth={1.75} />
                <p className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
                  {stat.prefix}
                  {formatValue(counts[i], stat.decimals)}
                  {stat.suffix}
                </p>
                <p className="mt-1.5 text-sm text-ink/60">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Partners row */}
        {/* Partners row */}
        <div className="mt-16 overflow-hidden border-t border-sage-200 pt-10 text-center lg:mt-20 lg:pt-12">
          <p className="text-sm font-medium tracking-wide text-ink/60">
            Certified & Accepted By
          </p>

          <div className="mt-7 overflow-hidden">
            <div className="marquee flex w-max items-center gap-x-12">
              {[...PARTNERS, ...PARTNERS].map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="shrink-0 text-lg font-semibold text-ink/40 transition-colors duration-300 hover:text-sage-700"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
