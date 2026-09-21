// components/HeroSection.tsx
import { ArrowRight, CalendarCheck, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="bg-[#FBFAF7] pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        {/* Left — Content */}
        <div className="text-center lg:text-left">
          {/* Eyebrow */}
          <div className="animate-[fadeUp_0.6s_ease-out_0.05s_both] inline-flex items-center gap-2 rounded-full bg-sage-50 px-4 py-2">
            <ShieldCheck className="h-4 w-4 text-sage-700" />
            <span className="text-sm font-medium text-sage-700">
              Integrated Healthcare Services
            </span>
          </div>

          {/* Heading */}
          <h1 className="animate-[fadeUp_0.6s_ease-out_0.15s_both] mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Complete Healthcare Solutions,
            <br />
            <span className="text-sage-600">Under One Umbrella</span>
          </h1>

          {/* Description */}
          <p className="animate-[fadeUp_0.6s_ease-out_0.25s_both] mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink/65 sm:text-lg lg:mx-0">
            From advanced clinical care and precision diagnostics to local
            pharmaceutical manufacturing, Afilas is dedicated to elevating
            health standards
          </p>

          {/* Actions */}
          <div className="animate-[fadeUp_0.6s_ease-out_0.35s_both] mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <a
              href="/book"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sage-600 px-7 py-3.5 text-base font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-sage-700 hover:shadow-md sm:w-auto"
            >
              Book an Appointment
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="#services"
              className="group inline-flex items-center gap-2 text-base font-medium text-ink transition-colors duration-200 hover:text-sage-700"
            >
              Explore our services
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Trust / service indicators */}
          <div className="animate-[fadeUp_0.6s_ease-out_0.45s_both] mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-ink/60 lg:justify-start">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-sage-600" />
              <span>Hospital Care</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-sage-600" />
              <span>Diagnostics</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-sage-600" />
              <span>Pharmaceuticals</span>
            </div>
          </div>
        </div>

        {/* Right — Hero Image */}
        <div className="animate-[fadeIn_0.8s_ease-out_0.3s_both] relative mx-auto w-full max-w-xl">
          <div className="relative aspect-[4/4.5] overflow-hidden rounded-[2rem] bg-sage-50">
            <Image
              src="/images/hero-image.jpg"
              alt="Healthcare professional caring for a patient"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            {/* Soft image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
          </div>

          {/* Floating appointment card */}
          <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3.5 shadow-[0_12px_35px_rgba(15,23,18,0.12)] sm:left-6 sm:px-5 sm:py-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-50">
              <CalendarCheck className="h-5 w-5 text-sage-700" />
            </span>

            <div className="leading-tight">
              <p className="text-xs font-medium text-ink/50">
                Need medical care?
              </p>
              <p className="mt-1 text-sm font-semibold text-ink">
                Book an appointment
              </p>
            </div>
          </div>

          {/* Decorative background shape */}
          <div className="absolute -right-4 -top-4 -z-10 h-28 w-28 rounded-full bg-sage-100/70 blur-2xl" />
          <div className="absolute -bottom-8 -right-8 -z-10 h-40 w-40 rounded-full bg-sage-100/50 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
