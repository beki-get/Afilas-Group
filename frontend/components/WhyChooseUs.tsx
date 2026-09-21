// components/WhyChooseUsSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck, ScanLine, ArrowRight } from "lucide-react";

export default function WhyChooseUsSection() {
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
    "rounded-3xl p-8 shadow-[0_2px_16px_rgba(15,23,18,0.06)] transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-[0_16px_40px_rgba(15,23,18,0.12)]";
  const reveal = (delay: number) => ({
    className: inView
      ? "opacity-100 scale-100 translate-y-0"
      : "opacity-0 scale-95 translate-y-6",
    style: { transitionDelay: inView ? `${delay}ms` : "0ms" },
  });

  return (
    <section ref={sectionRef} className="bg-sage-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-ink sm:text-4xl lg:text-[2.75rem]">
            Why Trust Afilas With Your Health?
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-4 md:auto-rows-[minmax(170px,auto)]">
          {/* Feature 1 — End-to-End Healthcare (large photo block, 2x2) */}
          <div
            {...reveal(0)}
            className={`${base} ${reveal(0).className} relative flex min-h-[280px] flex-col justify-end overflow-hidden md:col-start-1 md:row-start-1 md:col-span-2 md:row-span-2`}
          >
            <img
              src="/images/hero-image.jpg"
              alt="Doctor caring for a patient"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />
            <div className="relative">
              <h3 className="text-2xl font-semibold text-white">
                End-to-End Healthcare
              </h3>
              <p className="mt-2 max-w-sm text-base leading-relaxed text-white/80">
                From diagnosis and inpatient clinical care to post-treatment
                pharmaceuticals, we manage the entire care journey seamlessly.
              </p>
            </div>
          </div>

          {/* Stat — 24/7 */}
          <div
            {...reveal(100)}
            className={`${base} ${reveal(100).className} flex min-h-[140px] flex-col justify-center bg-ink md:col-start-3 md:row-start-1 md:col-span-2`}
          >
            <p className="text-4xl font-semibold text-white">24/7</p>
            <p className="mt-1.5 text-sm text-white/70">
              Emergency Support Always Available
            </p>
          </div>

          {/* Feature 2 — Cutting-Edge Technology */}
          <div
            {...reveal(200)}
            className={`${base} ${reveal(200).className} flex min-h-[160px] flex-col justify-center bg-sage-100 md:col-start-3 md:row-start-2 md:col-span-2`}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
              <ScanLine className="h-5 w-5 text-sage-700" strokeWidth={1.75} />
            </span>
            <p className="mt-4 text-xl font-semibold text-ink">
              Cutting-Edge Technology
            </p>
            <p className="mt-2 text-base leading-relaxed text-ink/65">
              Equipped with modern diagnostic tools, modern surgical theaters,
              and automated pharmaceutical machinery.
            </p>
          </div>

          {/* Stat — 50,000+ */}
          <div
            {...reveal(300)}
            className={`${base} ${reveal(300).className} flex min-h-[140px] flex-col justify-center bg-ivory md:col-start-1 md:row-start-3`}
          >
            <p className="text-3xl font-semibold text-ink">50,000+</p>
            <p className="mt-1.5 text-sm text-ink/60">Happy Patients</p>
          </div>

          {/* Feature 3 — Uncompromising Quality & Safety */}
          <div
            {...reveal(400)}
            className={`${base} ${reveal(400).className} flex min-h-[160px] flex-col justify-center bg-white md:col-start-2 md:row-start-3 md:col-span-2`}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage-50">
              <ShieldCheck
                className="h-5 w-5 text-sage-700"
                strokeWidth={1.75}
              />
            </span>
            <p className="mt-4 text-xl font-semibold text-ink">
              Uncompromising Quality & Safety
            </p>
            <p className="mt-2 text-base leading-relaxed text-ink/65">
              Driven by international clinical standards, strict infection
              control, and Good Manufacturing Practice (GMP) compliance.
            </p>
          </div>

          {/* CTA */}
          <a
            href="/book"
            {...reveal(500)}
            className={`${base} ${reveal(500).className} group flex min-h-[140px] flex-col justify-center bg-sage-600 hover:bg-sage-700 md:col-start-4 md:row-start-3`}
          >
            <p className="text-lg font-semibold leading-snug text-white">
              Ready when you are
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-white/90">
              Start now
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
