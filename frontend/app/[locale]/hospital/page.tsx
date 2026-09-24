"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  HeartPulse,
  Hospital,
  Phone,
  ShieldCheck,
  Stethoscope,
  Syringe,
  Users,
  Baby,
  Activity,
  Bone,
  Ambulance,
  PhoneCall,
  BriefcaseBusiness,
  CircleHelp,
  AlertTriangle,
  Bed,
  ClipboardCheck,
  FlaskConical,
  Pill,
  GraduationCap,
} from "lucide-react";

import AfilasPageShell from "@/components/AfilasPageShell";

export default function GeneralHospitalPage() {
  const t = useTranslations("Hospital");

  const heroImages = [
    "/images/hospital/hospital-hero1.jpg",
    "/images/hospital/hospital-hero2.jpg",
    "/images/hospital/hospital-hero3.jpg",
    "/images/hospital/hospital-hero4.jpg",
  ];

  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero(
        (previous) => (previous + 1) % heroImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // =====================================================
  // DEPARTMENTS
  // =====================================================

  const departments = [
    {
      key: "internalMedicine",
      slug: "internal-medicine",
      icon: Stethoscope,
      gradient: "from-teal-500 to-emerald-600",
    },
    {
      key: "surgery",
      slug: "surgery",
      icon: Syringe,
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      key: "pediatrics",
      slug: "pediatrics",
      icon: Baby,
      gradient: "from-pink-500 to-rose-500",
    },
    {
      key: "gynecology",
      slug: "gynecology-obstetrics",
      icon: HeartPulse,
      gradient: "from-purple-500 to-fuchsia-600",
    },
    {
      key: "cardiology",
      slug: "cardiology",
      icon: Activity,
      gradient: "from-red-500 to-orange-500",
    },
    {
      key: "orthopedics",
      slug: "orthopedics",
      icon: Bone,
      gradient: "from-amber-500 to-yellow-600",
    },
  ];

  // =====================================================
  // MEDICAL SERVICES
  // =====================================================

  const medicalServices = [
    {
      key: "outpatient",
      icon: Stethoscope,
      gradient: "from-teal-500 to-emerald-600",
      bg: "bg-teal-50 dark:bg-teal-950/30",
      iconColor: "text-teal-600",
    },
    {
      key: "inpatient",
      icon: Bed,
      gradient: "from-blue-500 to-indigo-600",
      bg: "bg-blue-50 dark:bg-blue-950/30",
      iconColor: "text-blue-600",
    },
    {
      key: "emergency",
      icon: Ambulance,
      gradient: "from-red-500 to-rose-600",
      bg: "bg-red-50 dark:bg-red-950/30",
      iconColor: "text-red-600",
    },
    {
      key: "consultation",
      icon: ClipboardCheck,
      gradient: "from-purple-500 to-fuchsia-600",
      bg: "bg-purple-50 dark:bg-purple-950/30",
      iconColor: "text-purple-600",
    },
    {
      key: "laboratory",
      icon: FlaskConical,
      gradient: "from-orange-500 to-amber-600",
      bg: "bg-orange-50 dark:bg-orange-950/30",
      iconColor: "text-orange-600",
    },
    {
      key: "pharmacy",
      icon: Pill,
      gradient: "from-cyan-500 to-blue-600",
      bg: "bg-cyan-50 dark:bg-cyan-950/30",
      iconColor: "text-cyan-600",
    },
  ];

  // =====================================================
  // DOCTORS
  // =====================================================

  const doctors = [
    {
      key: "internalMedicine",
      slug: "dr-abebe-kebede",
      image: "/images/hospital/doctors/doctor-1.jpg",
      gradient: "from-teal-500 to-emerald-600",
    },
    {
      key: "pediatrics",
      slug: "dr-hana-tesfaye",
      image: "/images/hospital/doctors/doctor-2.jpg",
      gradient: "from-pink-500 to-rose-600",
    },
    {
      key: "cardiology",
      slug: "dr-dawit-alemu",
      image: "/images/hospital/doctors/doctor-3.jpg",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      key: "gynecology",
      slug: "dr-selamawit-mekonnen",
      image: "/images/hospital/doctors/doctor-4.jpg",
      gradient: "from-purple-500 to-fuchsia-600",
    },
  ];

  // =====================================================
  // QUICK LINKS
  // =====================================================

  const quickLinks = [
    {
      key: "departments",
      icon: Hospital,
      href: "#departments",
    },
    {
      key: "doctors",
      icon: Users,
      href: "#doctors",
    },
    {
      key: "services",
      icon: Stethoscope,
      href: "#services",
    },
    {
      key: "appointments",
      icon: CalendarDays,
      href: "/appointment",
    },
    {
      key: "emergency",
      icon: HeartPulse,
      href: "#emergency",
    },
  ];

  return (
    <AfilasPageShell>
      <main className="overflow-hidden bg-[var(--background)]">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="relative min-h-[760px] overflow-hidden">

          {/* Background Images */}
          {heroImages.map((image, index) => (
            <div
              key={image}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentHero
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            >
              <Image
                src={image}
                alt={`${t("hero.badge")} - Slide ${index + 1}`}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}

          {/* Text Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071b3a]/35 via-[#071b3a]/10 to-transparent" />

          {/* Hero Content */}
          <div className="relative z-10 mx-auto flex min-h-[760px] max-w-7xl items-center px-6 py-24 lg:px-8">

            <div className="max-w-3xl text-white">

              {/* Small Label */}
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-[var(--surface)]/10 px-5 py-2 backdrop-blur-md">

                <span className="h-2.5 w-2.5 rounded-full bg-[#64D6C5]" />

                <span className="text-sm font-semibold tracking-[0.2em] text-white/90">
                  {t("hero.badge")}
                </span>

              </div>

              {/* Heading */}
              <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">

                {t("hero.titleLine1")}

                <span className="block text-[#64D6C5]">
                  {t("hero.titleLine2")}
                </span>

              </h1>

              {/* Description */}
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
                {t("hero.description")}
              </p>

              {/* Buttons */}
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">

                <Link
                  href="/appointment"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#18A999] px-7 py-4 font-semibold text-white shadow-lg shadow-[#18A999]/20 transition hover:-translate-y-1 hover:bg-[#159889]"
                >
                  {t("hero.bookAppointment")}

                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="#departments"
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-white/30 bg-[var(--surface)]/10 px-7 py-4 font-semibold text-white backdrop-blur-md transition hover:-translate-y-1 hover:bg-[var(--surface)]/20"
                >
                  {t("hero.exploreDepartments")}
                </Link>

              </div>

              {/* Trust Indicators */}
              <div className="mt-12 flex flex-wrap gap-8 border-t border-white/15 pt-7">

                <div>
                  <p className="font-semibold text-white">
                    {t("hero.trust.trustedCare")}
                  </p>

                  <p className="mt-1 text-sm text-white/60">
                    {t("hero.trust.trustedCareDescription")}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-white">
                    {t("hero.trust.emergency")}
                  </p>

                  <p className="mt-1 text-sm text-white/60">
                    {t("hero.trust.emergencyDescription")}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-white">
                    {t("hero.trust.expertDoctors")}
                  </p>

                  <p className="mt-1 text-sm text-white/60">
                    {t("hero.trust.expertDoctorsDescription")}
                  </p>
                </div>

              </div>

            </div>
          </div>

          {/* Slider Controls */}
          <div className="absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">

            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentHero(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  index === currentHero
                    ? "w-10 bg-[#64D6C5]"
                    : "w-2.5 bg-[var(--surface)]/50 hover:bg-[var(--surface)]/80"
                }`}
              />
            ))}

          </div>

        </section>

        {/* =====================================================
            QUICK LINKS
        ===================================================== */}

        <section className="relative z-20 -mt-8 px-5">

          <div className="mx-auto max-w-6xl">

            <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_20px_50px_rgba(16,40,80,0.10)] md:grid-cols-5">

              {quickLinks.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`
                      group
                      flex items-center gap-3
                      p-5
                      transition
                      hover:bg-[#f3fbf9]
                      dark:hover:bg-[#12356b]/30
                      ${
                        index < quickLinks.length - 1
                          ? "md:border-r md:border-[var(--border)]"
                          : ""
                      }
                    `}
                  >

                    <div
                      className="
                        flex h-11 w-11 shrink-0
                        items-center justify-center
                        rounded-2xl
                        bg-teal-50 dark:bg-teal-950/30
                        text-[#129985]
                        transition
                        group-hover:bg-[#129985]
                        group-hover:text-white
                      "
                    >
                      <Icon size={19} />
                    </div>

                    <div>

                      <p className="text-sm font-semibold text-[var(--foreground)]">
                        {t(`quickLinks.${item.key}.title`)}
                      </p>

                      <p className="mt-1 text-[11px] text-[var(--muted)]">
                        {t(`quickLinks.${item.key}.description`)}
                      </p>

                    </div>

                  </Link>
                );
              })}

            </div>

          </div>
        </section>

        {/* =====================================================
            INTRODUCTION / ABOUT AFILAS
        ===================================================== */}

        <section className="relative overflow-hidden px-6 py-24 lg:px-8">

          {/* Decorative background */}
          <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#18a999]/5 blur-3xl" />

          <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-[#1261c9]/5 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">

            <div className="grid items-center gap-16 lg:grid-cols-2">

              {/* LEFT CONTENT */}
              <div>

                {/* Section label */}
                <div className="mb-5 flex items-center gap-3">

                  <span className="h-px w-12 bg-[#18a999]" />

                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#18a999]">
                    {t("intro.label")}
                  </span>

                </div>

                {/* Heading */}
                <h2 className="max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight text-[var(--foreground)] sm:text-5xl">

                  {t("intro.titleLine1")}

                  <span className="text-[#18a999]">
                    {" "}
                    {t("intro.titleLine2")}
                  </span>

                </h2>

                {/* Description */}
                <p className="mt-7 max-w-xl text-base leading-8 text-[var(--muted)]">
                  {t("intro.paragraph1")}
                </p>

                <p className="mt-4 max-w-xl text-base leading-8 text-[var(--muted)]">
                  {t("intro.paragraph2")}
                </p>

                {/* HEALTHCARE FEATURES */}
                <div className="mt-10 grid gap-4 sm:grid-cols-2">

                  {/* Patient-Centered Care */}
                  <div className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-teal-50 dark:bg-teal-950/30 transition-transform duration-500 group-hover:scale-150" />

                    <div className="relative">

                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-950/30 text-[#18a999] transition-all duration-300 group-hover:bg-[#18a999] group-hover:text-white">

                        <HeartPulse
                          size={24}
                          strokeWidth={1.8}
                        />

                      </div>

                      <h3 className="font-bold text-[var(--foreground)]">
                        {t("intro.features.patient.title")}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                        {t("intro.features.patient.description")}
                      </p>

                      <div className="mt-4 h-1 w-8 rounded-full bg-[#18a999] transition-all duration-300 group-hover:w-16" />

                    </div>
                  </div>

                  {/* Trusted Professionals */}
                  <div className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-50 dark:bg-blue-950/30 transition-transform duration-500 group-hover:scale-150" />

                    <div className="relative">

                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">

                        <ShieldCheck
                          size={24}
                          strokeWidth={1.8}
                        />

                      </div>

                      <h3 className="font-bold text-[var(--foreground)]">
                        {t("intro.features.professionals.title")}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                        {t("intro.features.professionals.description")}
                      </p>

                      <div className="mt-4 h-1 w-8 rounded-full bg-blue-600 transition-all duration-300 group-hover:w-16" />

                    </div>
                  </div>

                  {/* Modern Facilities */}
                  <div className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-orange-50 dark:bg-orange-950/30 transition-transform duration-500 group-hover:scale-150" />

                    <div className="relative">

                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-950/30 text-orange-500 transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white">

                        <Hospital
                          size={24}
                          strokeWidth={1.8}
                        />

                      </div>

                      <h3 className="font-bold text-[var(--foreground)]">
                        {t("intro.features.facilities.title")}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                        {t("intro.features.facilities.description")}
                      </p>

                      <div className="mt-4 h-1 w-8 rounded-full bg-orange-500 transition-all duration-300 group-hover:w-16" />

                    </div>
                  </div>

                  {/* Continuous Support */}
                  <div className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-50 dark:bg-indigo-950/30 transition-transform duration-500 group-hover:scale-150" />

                    <div className="relative">

                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white">

                        <Clock3
                          size={24}
                          strokeWidth={1.8}
                        />

                      </div>

                      <h3 className="font-bold text-[var(--foreground)]">
                        {t("intro.features.support.title")}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                        {t("intro.features.support.description")}
                      </p>

                      <div className="mt-4 h-1 w-8 rounded-full bg-indigo-600 transition-all duration-300 group-hover:w-16" />

                    </div>
                  </div>

                </div>

                {/* CTA */}
                <div className="mt-9 flex flex-wrap items-center gap-5">

                  <Link
                    href="/about"
                    className="
                      group inline-flex items-center gap-3
                      rounded-full bg-[#12356b]
                      px-6 py-3.5
                      text-sm font-semibold text-white
                      shadow-lg shadow-[#12356b]/10
                      transition-all duration-300
                      hover:-translate-y-0.5
                      hover:bg-[#0d4d91]
                    "
                  >
                    {t("intro.learnMore")}

                    <span
                      className="
                        flex h-7 w-7 items-center justify-center
                        rounded-full bg-[var(--surface)]/10
                        transition
                        group-hover:bg-[var(--surface)]/20
                      "
                    >
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>

                  </Link>

                  <div className="flex items-center gap-3">

                    <div className="flex -space-x-2">

                      <div className="h-8 w-8 rounded-full border-2 border-white bg-[#dcecff]" />

                      <div className="h-8 w-8 rounded-full border-2 border-white bg-[#d9f5ef]" />

                      <div className="h-8 w-8 rounded-full border-2 border-white bg-[#ffe6d2]" />

                    </div>

                    <p className="text-xs text-[var(--muted)]">

                      <span className="font-semibold text-[var(--foreground)]">
                        {t("intro.patientFocused")}
                      </span>

                      <br />

                      {t("intro.healthcareExperience")}

                    </p>

                  </div>

                </div>

              </div>

              {/* RIGHT VISUAL */}
              <div className="relative">

                {/* Main image */}
                <div
                  className="
                    relative overflow-hidden
                    rounded-[36px]
                    border border-[var(--border)]
                    bg-[var(--surface-soft)]
                    shadow-[0_30px_70px_rgba(18,53,107,0.12)]
                  "
                >

                  <Image
                    src="/images/hospital/hospital-hero1.jpg"
                    alt={t("intro.imageLabel")}
                    width={1000}
                    height={750}
                    className="
                      h-[560px] w-full
                      object-cover
                      transition duration-700
                      hover:scale-[1.02]
                    "
                  />

                  {/* Image overlay */}
                  <div
                    className="
                      absolute inset-0
                      bg-gradient-to-t
                      from-[#071b3a]/45
                      via-transparent
                      to-transparent
                    "
                  />

                  {/* Image label */}
                  <div className="absolute left-6 top-6">

                    <div
                      className="
                        inline-flex items-center gap-3
                        rounded-full border border-white/30
                        bg-[#12356b]/90 px-5 py-3
                        text-sm font-bold tracking-wide text-white
                        shadow-lg backdrop-blur-md
                      "
                    >

                      <span className="h-2.5 w-2.5 rounded-full bg-[#62d4d4] shadow-[0_0_10px_#62d4d4]" />

                      <span>
                        {t("intro.qualityHealthcare")}
                      </span>

                    </div>

                  </div>

                  {/* Bottom image information */}
                  <div className="absolute bottom-6 left-6 right-6">

                    <div
                      className="
                        rounded-2xl
                        border border-white/20
                        bg-[var(--surface)]/10
                        p-5
                        backdrop-blur-md
                      "
                    >

                      <div className="flex items-center justify-between gap-4">

                        <div>

                          <p className="text-xs text-white/70">
                            {t("intro.imageLabel")}
                          </p>

                          <p className="mt-1 text-lg font-bold text-white">
                            {t("intro.imageTitle")}
                          </p>

                        </div>

                        <div
                          className="
                            flex h-11 w-11 shrink-0
                            items-center justify-center
                            rounded-full
                            bg-[#18a999]
                            text-white
                          "
                        >
                          <HeartPulse size={20} />
                        </div>

                      </div>

                    </div>

                  </div>

                </div>

                {/* Floating statistics card */}
                <div
                  className="
                    absolute -bottom-8 -left-5
                    rounded-2xl
                    border border-[var(--border)]
                    bg-[var(--surface)]
                    p-5
                    shadow-[0_20px_45px_rgba(18,53,107,0.15)]
                    sm:left-[-28px]
                  "
                >

                  <div className="flex items-center gap-4">

                    <div
                      className="
                        flex h-12 w-12
                        items-center justify-center
                        rounded-xl
                        bg-teal-50 dark:bg-teal-950/30
                        text-[#18a999]
                      "
                    >
                      <Users size={22} />
                    </div>

                    <div>

                      <p className="text-2xl font-bold text-[var(--foreground)]">
                        24/7
                      </p>

                      <p className="text-xs text-[var(--muted)]">
                        {t("intro.emergencySupport")}
                      </p>

                    </div>

                  </div>

                </div>

                {/* Decorative circle */}
                <div
                  className="
                    pointer-events-none
                    absolute -right-8 -top-8
                    -z-10
                    h-32 w-32
                    rounded-full
                    border-[14px]
                    border-[#18a999]/10
                  "
                />

              </div>

            </div>
          </div>

        </section>

     {/* =========================================================
    4. MEDICAL DEPARTMENTS
========================================================= */}
<section
  id="departments"
  className="relative overflow-hidden bg-slate-50 py-24 dark:bg-[#071f46]"
>
  {/* Decorative background */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl" />
    <div className="absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

    <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />
  </div>

  <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

    {/* Section Header */}
    <div className="mx-auto mb-16 max-w-3xl text-center">

      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-2 text-sm font-semibold text-teal-700 dark:text-teal-300">
        <Stethoscope className="h-4 w-4" />
        {t("departments.badge")}
      </div>

      <h2 className="text-3xl font-bold tracking-tight text-[#071f46] sm:text-4xl lg:text-5xl dark:text-white">
        {t("departments.titleLine1")}{" "}
        <span className="bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
          {t("departments.titleLine2")}
        </span>
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
        {t("departments.description")}
      </p>
    </div>

    {/* Department Cards */}
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {departments.map((department) => {
        const Icon = department.icon;

        return (
          <div
            key={department.key}
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:border-white/10 dark:bg-white/[0.06]"
          >
            {/* Hover gradient */}
            <div
              className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${department.gradient}`}
            />

            {/* Decorative circle */}
            <div
              className={`absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${department.gradient} opacity-10 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-20`}
            />

            <div className="relative">

              {/* Icon */}
              <div
                className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${department.gradient} text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
              >
                <Icon className="h-8 w-8" />
              </div>

              {/* Specialty label */}
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-teal-600 dark:text-teal-400">
                {t("departments.specialty")}
              </p>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#071f46] dark:text-white">
                {t(`departments.items.${department.key}.title`)}
              </h3>

              {/* Description */}
              <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-600 dark:text-slate-300">
                {t(`departments.items.${department.key}.description`)}
              </p>

              {/* Link */}
              <Link
                href={`/hospital/departments/${department.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-600 transition-all duration-300 group-hover:gap-3 dark:text-teal-400"
              >
                {t("departments.explore")}

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>

    {/* Bottom Help CTA */}
    <div className="mt-14 overflow-hidden rounded-3xl border border-teal-500/20 bg-gradient-to-r from-teal-500/10 via-white to-blue-500/10 p-8 dark:from-teal-500/10 dark:via-white/[0.04] dark:to-blue-500/10 sm:p-10">
      <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">

        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
            <CircleHelp className="h-6 w-6" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#071f46] dark:text-white">
              {t("departments.helpTitle")}
            </h3>

            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {t("departments.helpDescription")}
            </p>
          </div>
        </div>

        <Link
          href="/appointment"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#071f46] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-teal-600 hover:shadow-xl dark:bg-teal-500 dark:text-[#071f46] dark:hover:bg-teal-400"
        >
          {t("departments.bookAppointment")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </div>
</section>

   {/* =========================================================
    5. HEALTHCARE SERVICES
========================================================= */}
<section
  id="services"
  className="relative overflow-hidden bg-white py-24 dark:bg-[#061a3a]"
>
  {/* Decorative background */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute left-[-120px] top-20 h-80 w-80 rounded-full bg-teal-400/10 blur-3xl" />

    <div className="absolute right-[-120px] bottom-10 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

    <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
  </div>

  <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

    {/* Section Header */}
    <div className="mx-auto mb-16 max-w-3xl text-center">

      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-2 text-sm font-semibold text-teal-700 dark:text-teal-300">
        <HeartPulse className="h-4 w-4" />
        {t("services.badge")}
      </div>

      <h2 className="text-3xl font-bold tracking-tight text-[#071f46] sm:text-4xl lg:text-5xl dark:text-white">
        {t("services.titleLine1")}{" "}
        <span className="bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
          {t("services.titleLine2")}
        </span>
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
        {t("services.description")}
      </p>
    </div>

    {/* Services Grid */}
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {medicalServices.map((service) => {
        const Icon = service.icon;

        return (
          <div
            key={service.key}
            className={`group relative overflow-hidden rounded-3xl border border-slate-200 ${service.bg} p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:border-white/10`}
          >
            {/* Top gradient line */}
            <div
              className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${service.gradient}`}
            />

            {/* Decorative circle */}
            <div
              className={`absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${service.gradient} opacity-10 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-20`}
            />

            <div className="relative">

              {/* Icon */}
              <div
                className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-white/10 ${service.iconColor} transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
              >
                <Icon className="h-7 w-7" />
              </div>

              {/* Label */}
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-teal-600 dark:text-teal-400">
                {t("services.coreServices")}
              </p>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#071f46] dark:text-white">
                {t(`services.items.${service.key}.title`)}
              </h3>

              {/* Description */}
              <p className="mt-3 min-h-[96px] text-sm leading-6 text-slate-600 dark:text-slate-300">
                {t(`services.items.${service.key}.description`)}
              </p>

              {/* Link */}
              <Link
                href={`/hospital/services/${service.key}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal-600 transition-all duration-300 group-hover:gap-3 dark:text-teal-400"
              >
                {t("services.learnMore")}

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>

    {/* Emergency Banner */}
    <div
      id="emergency"
      className="relative mt-16 overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#071f46] via-[#12356b] to-teal-700 p-8 shadow-2xl sm:p-10 lg:p-12"
    >
      {/* Decorative elements */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full border border-white/10" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        {/* Emergency information */}
        <div className="max-w-2xl">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
            <Ambulance className="h-4 w-4" />
            {t("services.emergencyBanner.label")}
          </div>

          <h3 className="text-2xl font-bold text-white sm:text-3xl">
            {t("services.emergencyBanner.title")}
          </h3>

          <p className="mt-4 text-sm leading-7 text-blue-100 sm:text-base">
            {t("services.emergencyBanner.description")}
          </p>
        </div>

        {/* Emergency button */}
        <Link
          href="#emergency"
          className="inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-[#071f46] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-teal-50 hover:shadow-2xl"
        >
          <PhoneCall className="h-5 w-5" />
          {t("services.emergencyBanner.button")}
        </Link>
      </div>
    </div>

    {/* Explore all services */}
    <div className="mt-10 text-center">
      <Link
        href="/hospital/services"
        className="group inline-flex items-center gap-3 rounded-full border border-teal-500/30 bg-teal-500/5 px-7 py-3.5 text-sm font-bold text-teal-700 transition-all duration-300 hover:border-teal-500 hover:bg-teal-500 hover:text-white dark:text-teal-300 dark:hover:text-white"
      >
        {t("services.exploreAll")}

        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  </div>
</section>

     {/* =========================================================
    6. MEDICAL TEAM / DOCTORS
========================================================= */}
<section
  id="doctors"
  className="relative overflow-hidden bg-slate-50 py-24 dark:bg-[#071f46]"
>
  {/* Decorative background */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute -left-32 top-32 h-80 w-80 rounded-full bg-teal-400/10 blur-3xl" />

    <div className="absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

    <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
  </div>

  <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

    {/* Section Header */}
    <div className="mx-auto mb-16 max-w-3xl text-center">

      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-2 text-sm font-semibold text-teal-700 dark:text-teal-300">
        <Users className="h-4 w-4" />
        {t("doctors.badge")}
      </div>

      <h2 className="text-3xl font-bold tracking-tight text-[#071f46] sm:text-4xl lg:text-5xl dark:text-white">
        {t("doctors.titleLine1")}{" "}
        <span className="bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
          {t("doctors.titleLine2")}
        </span>
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
        {t("doctors.description")}
      </p>
    </div>

    {/* Doctors Grid */}
    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
      {doctors.map((doctor) => {
        const doctorData = t.raw(
          `doctors.specialists.${doctor.key}`
        ) as {
          name: string;
          specialization: string;
          experience: string;
          description: string;
          department: string;
        };

        return (
          <div
            key={doctor.key}
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:border-white/10 dark:bg-white/[0.06]"
          >
            {/* Top gradient */}
            <div
              className={`absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r ${doctor.gradient}`}
            />

            {/* Doctor image */}
            <div className="relative h-72 overflow-hidden">
              <Image
                src={doctor.image}
                alt={doctorData.name}
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#071f46]/90 via-[#071f46]/10 to-transparent" />

              {/* Department badge */}
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                  {doctorData.department}
                </span>
              </div>
            </div>

            {/* Doctor information */}
            <div className="p-6">

              <h3 className="text-xl font-bold text-[#071f46] dark:text-white">
                {doctorData.name}
              </h3>

              <p className="mt-1 text-sm font-semibold text-teal-600 dark:text-teal-400">
                {doctorData.specialization}
              </p>

              {/* Experience */}
              <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                <BriefcaseBusiness className="h-4 w-4 text-teal-500" />
                {doctorData.experience}
              </div>

              {/* Description */}
              <p className="mt-4 min-h-[72px] text-sm leading-6 text-slate-600 dark:text-slate-300">
                {doctorData.description}
              </p>

              {/* Actions */}
              <div className="mt-6 flex flex-col gap-2">
                <Link
                  href={`/hospital/doctors/${doctor.slug}`}
                  className="group/link inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-[#071f46] transition-all duration-300 hover:border-teal-500 hover:bg-teal-500 hover:text-white dark:border-white/10 dark:text-white dark:hover:border-teal-500 dark:hover:bg-teal-500"
                >
                  {t("doctors.viewProfile")}

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>

                <Link
                  href="/appointment"
                  className={`inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r ${doctor.gradient} px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg`}
                >
                  <CalendarDays className="h-4 w-4" />
                  {t("doctors.bookAppointment")}
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>

    {/* Specialist Help CTA */}
    <div className="mt-14 overflow-hidden rounded-3xl border border-teal-500/20 bg-white p-8 shadow-sm dark:bg-white/[0.05] sm:p-10">
      <div className="flex flex-col items-center justify-between gap-7 md:flex-row">

        {/* Left */}
        <div className="flex items-start gap-4 text-center md:text-left">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
            <CircleHelp className="h-6 w-6" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#071f46] dark:text-white">
              {t("doctors.helpTitle")}
            </h3>

            <p className="mt-1 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              {t("doctors.helpDescription")}
            </p>
          </div>
        </div>

        {/* Button */}
        <Link
          href="/appointment"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#071f46] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-teal-600 hover:shadow-xl dark:bg-teal-500 dark:text-[#071f46] dark:hover:bg-teal-400"
        >
          {t("doctors.findCare")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </div>
</section>

     {/* =========================================================
    7. EMERGENCY MEDICAL CARE
========================================================= */}
<section
  id="emergency"
  className="relative overflow-hidden bg-white py-24 dark:bg-[#061a3a]"
>
  {/* Decorative background */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-red-500/10 blur-3xl" />

    <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />

    <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
  </div>

  <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

    <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">

      {/* =====================================================
          LEFT CONTENT
      ===================================================== */}
      <div>

        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400">
          <Ambulance className="h-4 w-4" />
          {t("emergencyCare.badge")}
        </div>

        {/* Title */}
        <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-[#071f46] sm:text-4xl lg:text-5xl dark:text-white">
          {t("emergencyCare.titleLine1")}{" "}
          <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            {t("emergencyCare.titleLine2")}
          </span>
        </h2>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
          {t("emergencyCare.description")}
        </p>

        {/* Support cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">

          {/* Emergency Support */}
          <div className="rounded-2xl border border-red-500/20 bg-red-50/70 p-5 dark:bg-red-950/20">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400">
              <PhoneCall className="h-5 w-5" />
            </div>

            <h3 className="font-bold text-[#071f46] dark:text-white">
              {t("emergencyCare.supportTitle")}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {t("emergencyCare.supportDescription")}
            </p>
          </div>

          {/* Patient Focused */}
          <div className="rounded-2xl border border-teal-500/20 bg-teal-50/70 p-5 dark:bg-teal-950/20">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <HeartPulse className="h-5 w-5" />
            </div>

            <h3 className="font-bold text-[#071f46] dark:text-white">
              {t("emergencyCare.patientTitle")}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {t("emergencyCare.patientDescription")}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">

          <a
            href={`tel:${t("emergencyCare.number")}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <PhoneCall className="h-5 w-5" />
            {t("emergencyCare.callButton")}
          </a>

          <Link
            href="/appointment"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#071f46]/20 bg-white px-7 py-3.5 text-sm font-bold text-[#071f46] transition-all duration-300 hover:-translate-y-1 hover:border-teal-500 hover:bg-teal-500 hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-teal-500 dark:hover:bg-teal-500"
          >
            <CalendarDays className="h-5 w-5" />
            {t("emergencyCare.appointmentButton")}
          </Link>
        </div>
      </div>

      {/* =====================================================
          RIGHT EMERGENCY CARD
      ===================================================== */}
      <div className="relative">

        {/* Glow */}
        <div className="absolute -inset-4 rounded-[2rem] bg-red-500/10 blur-2xl" />

        <div className="relative overflow-hidden rounded-[2rem] border border-red-500/20 bg-gradient-to-br from-[#071f46] via-[#12356b] to-red-900 p-8 text-white shadow-2xl sm:p-10">

          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />

          <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full border border-white/10" />

          <div className="pointer-events-none absolute bottom-[-80px] left-[-80px] h-48 w-48 rounded-full bg-red-500/20 blur-3xl" />

          <div className="relative">

            {/* Icon */}
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500 shadow-lg shadow-red-500/30">
              <Ambulance className="h-8 w-8 text-white" />
            </div>

            {/* Label */}
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-200">
              {t("emergencyCare.cardLabel")}
            </p>

            {/* Title */}
            <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
              {t("emergencyCare.cardTitle")}
            </h3>

            {/* Description */}
            <p className="mt-4 text-sm leading-7 text-blue-100">
              {t("emergencyCare.cardDescription")}
            </p>

            {/* Telephone */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                  <PhoneCall className="h-5 w-5 text-red-300" />
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-blue-200">
                    {t("emergencyCare.telephone")}
                  </p>

                  <a
                    href={`tel:${t("emergencyCare.number")}`}
                    className="mt-1 block text-xl font-bold text-white transition-colors hover:text-red-300"
                  >
                    {t("emergencyCare.number")}
                  </a>
                </div>
              </div>
            </div>

            {/* Emergency warning */}
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-300/20 bg-red-500/10 p-4">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-300" />

              <p className="text-xs leading-5 text-red-100">
                {t("emergencyCare.cardDescription")}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* ================================
    APPOINTMENT CTA SECTION
================================= */}
<section
  id="appointment-cta"
  className="relative overflow-hidden bg-[#12356b] px-6 py-20 lg:px-8"
>
  {/* Decorative Background */}
  <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#18a999]/30 blur-3xl" />
  <div className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-[#1261c9]/30 blur-3xl" />

  <div className="relative mx-auto max-w-5xl text-center">

    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--surface)]/15 text-[#64d6c5]">
      <CalendarDays size={32} />
    </div>

    <h2 className="mt-7 text-4xl font-extrabold leading-tight text-white md:text-5xl">
      Your Health Deserves
      <span className="block text-[#64d6c5]">
        The Right Care
      </span>
    </h2>

    <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-blue-100">
      Schedule your appointment with our healthcare team and take
      the next step toward better health.
    </p>

    <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
      <Link
        href="/appointment"
        className="inline-flex items-center justify-center gap-3 rounded-full bg-[#18a999] px-8 py-4 font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-[#64d6c5]"
      >
        Book an Appointment
        <ArrowRight size={19} />
      </Link>

      <a
        href="tel:+251000000000"
        className="inline-flex items-center justify-center gap-3 rounded-full border border-white/40 px-8 py-4 font-bold text-white transition-all hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
      >
        <Phone size={18} />
        Contact Hospital
      </a>
    </div>

    <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-blue-200">
      <span className="flex items-center gap-2">
        <ShieldCheck size={17} />
        Patient-Centered Care
      </span>

      <span className="flex items-center gap-2">
        <HeartPulse size={17} />
        Professional Healthcare
      </span>

      <span className="flex items-center gap-2">
        <Hospital size={17} />
        Modern Facilities
      </span>
    </div>

  </div>
</section>

    </main>
  </AfilasPageShell>
  );
}