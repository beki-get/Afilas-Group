// components/HowItWorksSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarCheck, MapPin, Microscope, HeartPulse } from "lucide-react";

type Step = {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
  tag?: string;
};

const STEPS: Step[] = [
  {
    number: "01",
    icon: CalendarCheck,
    title: "Book Appointment",
    description:
      "Choose a doctor or service and pick a time that works for you.",
    tag: "Takes 2 minutes",
  },
  {
    number: "02",
    icon: MapPin,
    title: "Visit Clinic",
    description: "Arrive at the nearest Afilas facility, or connect virtually.",
  },
  {
    number: "03",
    icon: Microscope,
    title: "Diagnosis & Tests",
    description:
      "Get accurate lab work and imaging, with fast digital results.",
    tag: "Same-day results",
  },
  {
    number: "04",
    icon: HeartPulse,
    title: "Treatment & Follow-up",
    description:
      "Receive personalized care and ongoing support after your visit.",
  },
];

// Horizontal (desktop) center positions of each step, as % of track width.
const CENTERS = [12.5, 37.5, 62.5, 87.5];

function useStepReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Scroll-linked progress (0 → 1) as the section transits the viewport.
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const scrolled = vh - rect.top;
      setProgress(Math.min(Math.max(scrolled / total, 0), 1));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const step1 = useStepReveal();
  const step2 = useStepReveal();
  const step3 = useStepReveal();
  const step4 = useStepReveal();
  const reveals = [step1, step2, step3, step4];

  const dotLeft = CENTERS[0] + progress * (CENTERS[3] - CENTERS[0]);

  return (
    <section ref={sectionRef} className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-medium tracking-wide text-sage-700">
            Getting Started
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
            How It Works
          </h2>
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="relative mt-20 hidden md:block">
          {/* Track line (full width, faint) */}
          <svg
            className="absolute top-10 h-[2px] w-full"
            style={{
              left: `${CENTERS[0]}%`,
              width: `${CENTERS[3] - CENTERS[0]}%`,
            }}
            preserveAspectRatio="none"
          >
            <line
              x1="0"
              y1="1"
              x2="100%"
              y2="1"
              stroke="#D9E3D4"
              strokeWidth="2"
              strokeDasharray="6 6"
            />
          </svg>
          {/* Drawn portion, scroll-linked */}
          <svg
            className="absolute top-10 h-[2px] w-full"
            style={{
              left: `${CENTERS[0]}%`,
              width: `${CENTERS[3] - CENTERS[0]}%`,
            }}
            preserveAspectRatio="none"
          >
            <line
              x1="0"
              y1="1"
              x2="100%"
              y2="1"
              stroke="#6B8E5A"
              strokeWidth="2"
              strokeDasharray="6 6"
              pathLength={100}
              strokeDashoffset={100 - progress * 100}
              style={{ transition: "stroke-dashoffset 60ms linear" }}
            />
          </svg>
          {/* Traveling pulsing dot */}
          <div
            className="absolute top-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sage-600"
            style={{ left: `${dotLeft}%` }}
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-sage-600/70" />
          </div>

          <div className="grid grid-cols-4 gap-6">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const { ref, inView } = reveals[i];
              return (
                <div
                  key={step.number}
                  ref={ref}
                  className={`flex flex-col items-center text-center transition-all duration-500 ease-out ${
                    inView
                      ? "opacity-100 translate-y-0"
                      : "opacity-2000 translate-y-6"
                  }`}
                  style={{ transitionDelay: inView ? `${i * 150}ms` : "0ms" }}
                >
                  <div className="relative flex h-20 w-20 items-center justify-center">
                    <span
                      className="absolute select-none text-6xl font-bold text-transparent opacity-40"
                      style={{ WebkitTextStroke: "1.5px #6B8E5A" }}
                    >
                      {step.number}
                    </span>
                    <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-sage-50 shadow-sm">
                      <Icon
                        className="h-5 w-5 text-sage-700"
                        strokeWidth={1.75}
                      />
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/60">
                    {step.description}
                  </p>

                  {step.tag && (
                    <span className="mt-3 rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-sage-700">
                      {step.tag}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="relative mt-14 md:hidden">
          <svg
            className="absolute left-5 top-0 h-full w-[2px]"
            preserveAspectRatio="none"
          >
            <line
              x1="1"
              y1="0"
              x2="1"
              y2="100%"
              stroke="#D9E3D4"
              strokeWidth="2"
              strokeDasharray="6 6"
            />
          </svg>
          <svg
            className="absolute left-5 top-0 h-full w-[2px]"
            preserveAspectRatio="none"
          >
            <line
              x1="1"
              y1="0"
              x2="1"
              y2="100%"
              stroke="#6B8E5A"
              strokeWidth="2"
              strokeDasharray="6 6"
              pathLength={100}
              strokeDashoffset={100 - progress * 100}
              style={{ transition: "stroke-dashoffset 60ms linear" }}
            />
          </svg>
          <div
            className="absolute left-5 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sage-600"
            style={{ top: `${progress * 100}%` }}
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-sage-600/70" />
          </div>

          <div className="flex flex-col gap-10 pl-14">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const { ref, inView } = reveals[i];
              return (
                <div
                  key={step.number}
                  ref={ref}
                  className={`relative transition-all duration-500 ease-out ${
                    inView
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: inView ? `${i * 150}ms` : "0ms" }}
                >
                  <span className="absolute -left-14 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-sage-50 shadow-sm">
                    <Icon
                      className="h-4 w-4 text-sage-700"
                      strokeWidth={1.75}
                    />
                  </span>
                  <h3 className="text-lg font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/60">
                    {step.description}
                  </p>
                  {step.tag && (
                    <span className="mt-2 inline-block rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-sage-700">
                      {step.tag}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
