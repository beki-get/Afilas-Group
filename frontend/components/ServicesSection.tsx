// components/ServicesSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";


type Service = {
  image: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  href: string;
  ctaLabel: string;
  hoverBg: string;
   bookingKey: "hospital" | "diagnosis" | "pharma";
};

const SERVICES: Service[] = [
  {
    image: "/images/hero-image.jpg",
    title: "Afilas General Hospital",
    tagline: "Compassionate, specialized patient care available 24/7.",
    description:
      "Delivering patient-centered care with state-of-the-art medical technology and highly qualified specialists.",
    highlights: [
      "Inpatient & Outpatient Care",
      "24/7 Emergency & Surgical Suites",
      "Maternal & Child Health Care",
    ],
    href: "/hospital",
    ctaLabel: "Explore Hospital Services",
    hoverBg: "hover:bg-sage-50" ,
     bookingKey: "hospital"
  },
  {
    image: "/images/diagnostic-center.jpg",
    title: "Afilas Diagnosis Center",
    tagline: "High-precision imaging and automated laboratory testing.",
    description:
      "Equipping clinicians and patients with accurate, timely diagnostic insights to ensure early detection and targeted treatments.",
    highlights: [
      "Advanced Imaging (CT Scan, MRI, Digital X-Ray)",
      "Automated Pathology & Hematology",
      "Molecular Diagnostics & Special Lab Tests",
    ],
    href: "/diagnosis",
    ctaLabel: "Explore Diagnostic Center",
    hoverBg: "hover:bg-amber-50",
    bookingKey: "diagnosis"
  },
  {
    image: "/images/drug-manufacturing.jpg",
    title: "Afilas Drug Manufacturing",
    tagline: "Quality-driven, accessible pharmaceutical production meeting international standards.",
    description:
      "Strengthening healthcare resilience by producing safe, effective, and affordable essential medicines locally.",
    highlights: [
      "High-Standard Formulation & Packaging",
      "Strict Quality Control & GMP Adherence",
      "B2B & Institutional Wholesale Distribution",
    ],
    href: "/pharma",
    ctaLabel: "Explore Manufacturing",
    hoverBg: "hover:bg-stone-100",
    bookingKey: "pharma"
  },
];

export default function ServicesSection() {
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
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-ivory py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-ink sm:text-4xl lg:text-[2.75rem]">
            Integrated Excellence Across Healthcare
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink/65 sm:text-xl">
            Discover how our three dedicated divisions work together to deliver comprehensive care and reliable pharmaceutical solutions.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {SERVICES.map((service, i) => (
            <div
              key={service.title}
              className={[
                "flex flex-col items-start rounded-3xl bg-white p-8 shadow-[0_2px_16px_rgba(15,23,18,0.06)]",
                "transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(15,23,18,0.12)]",
                "transition-colors", service.hoverBg,
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              ].join(" ")}
              style={{ transitionDelay: inView ? `${i * 150}ms` : "0ms" }}
            >
              <div className="h-48 w-full overflow-hidden rounded-2xl">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <h3 className="mt-6 text-2xl font-semibold leading-snug text-ink">
                {service.title}
              </h3>
              <p className="mt-2 text-[0.95rem] font-medium text-sage-700">
                {service.tagline}
              </p>
              <p className="mt-3 text-base leading-relaxed text-ink/65">
                {service.description}
              </p>

              <ul className="mt-5 flex flex-col gap-2.5">
                {service.highlights.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-ink/70">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage-600" strokeWidth={2} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
        <a
              
                href={service.href}
                className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-sage-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-transform duration-200 hover:scale-[1.03] hover:bg-sage-700"
              >
                {service.ctaLabel}
              </a>

              <a
                href={`/book?service=${service.bookingKey}`}
                className="group mt-4 inline-flex items-center gap-1.5 self-center text-sm font-medium text-sage-700 hover:text-sage-600"
              >
                Book Appointment
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}