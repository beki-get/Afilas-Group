"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

import {
  ArrowRight,
  Award,
  BadgeCheck,
  BarChart3,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileCheck2,
  HeartPulse,
  Microscope,
  ScanLine,
  ShieldCheck,
  Stethoscope,
  TestTube2,
  Users,
  Zap,
} from "lucide-react";

import AfilasPageShell from "@/components/AfilasPageShell";

export default function DiagnosisPage() {
  const t = useTranslations("Diagnosis");

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // =========================================================
  // SERVICES
  // =========================================================

  const services = [
    {
      icon: TestTube2,
      key: "laboratory",
      color: "teal",
    },
    {
      icon: ScanLine,
      key: "radiology",
      color: "blue",
    },
    {
      icon: HeartPulse,
      key: "cardiac",
      color: "teal",
    },
    {
      icon: Stethoscope,
      key: "specialized",
      color: "blue",
    },
    {
      icon: Microscope,
      key: "checkups",
      color: "teal",
    },
    {
      icon: FileCheck2,
      key: "reports",
      color: "blue",
    },
  ];

  // =========================================================
  // PROCESS STEPS
  // =========================================================

  const processSteps = [
    {
      number: "01",
      icon: CalendarCheck,
      key: "book",
    },
    {
      number: "02",
      icon: Users,
      key: "visit",
    },
    {
      number: "03",
      icon: Microscope,
      key: "assessment",
    },
    {
      number: "04",
      icon: FileCheck2,
      key: "results",
    },
  ];

  // =========================================================
  // FAQS
  // =========================================================

  const faqs = [
    {
      key: "appointment",
    },
    {
      key: "services",
    },
    {
      key: "online",
    },
    {
      key: "results",
    },
  ];

  // =========================================================
  // HERO HIGHLIGHTS
  // =========================================================

  const heroHighlights = [
    {
      icon: ShieldCheck,
      key: "quality",
    },
    {
      icon: Zap,
      key: "modern",
    },
    {
      icon: Users,
      key: "patient",
    },
    {
      icon: FileCheck2,
      key: "results",
    },
  ];

  // =========================================================
  // WHY CHOOSE AFILAS
  // =========================================================

  const whyChooseItems = [
    {
      icon: ShieldCheck,
      key: "quality",
    },
    {
      icon: Users,
      key: "patient",
    },
    {
      icon: BarChart3,
      key: "connected",
    },
    {
      icon: Zap,
      key: "digital",
    },
  ];

  // =========================================================
  // INTRO HIGHLIGHTS
  // =========================================================

  const introHighlights = [
    {
      number: "01",
      key: "services",
    },
    {
      number: "02",
      key: "patient",
    },
    {
      number: "03",
      key: "connected",
    },
    {
      number: "04",
      key: "future",
    },
  ];

  // =========================================================
  // DIGITAL HEALTHCARE FEATURES
  // =========================================================

  const digitalFeatures = [
    "appointment",
    "discovery",
    "journey",
    "connected",
  ];

  // =========================================================
  // FLOATING DIAGNOSTIC CARD
  // =========================================================

  const diagnosticCardServices = [
    "laboratory",
    "radiology",
    "cardiac",
    "checkups",
  ];

  return (
    <AfilasPageShell>
      <main className="overflow-hidden bg-[var(--background)]">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="relative min-h-[720px] overflow-hidden bg-[#071f46]">

          <Image
            src="/images/diagnosis/diagnosis-hero1.jpg"
            alt={t("hero.imageAlt")}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#071f46]/95 via-[#071f46]/80 to-[#071f46]/30" />

          {/* Decorative circles */}

          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-[#18a999]/20" />

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-[#18a999]/20" />

          <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-center px-6 py-24 lg:px-8">

            <div className="grid w-full items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">

              {/* Hero text */}

              <div>

                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-[#5eead4] backdrop-blur-md">

                  <Microscope className="h-4 w-4" />

                  {t("hero.badge")}

                </div>

                <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-7xl">

                  {t("hero.titleLine1")}

                  <span className="block text-[#18a999]">
                    {t("hero.titleLine2")}
                  </span>

                </h1>

                <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
                  {t("hero.description")}
                </p>

                <div className="mt-9 flex flex-wrap gap-4">

                  <Link
                    href="/book?service=diagnosis"
                    className="group inline-flex items-center gap-2 rounded-xl bg-[#18a999] px-7 py-4 font-semibold text-white shadow-xl shadow-[#18a999]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#20bbaa]"
                  >
                    {t("hero.bookAppointment")}

                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <a
                    href="#services"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                  >
                    {t("hero.exploreServices")}
                  </a>

                </div>

                {/* Hero highlights */}

                <div className="mt-12 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">

                  {heroHighlights.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.key}
                        className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md"
                      >

                        <Icon className="h-5 w-5 text-[#5eead4]" />

                        <p className="mt-3 text-xs font-medium leading-5 text-white/70">
                          {t(`hero.highlights.${item.key}`)}
                        </p>

                      </div>
                    );
                  })}

                </div>

              </div>

              {/* Floating diagnostic card */}

              <div className="hidden justify-center lg:flex">

                <div className="relative h-[440px] w-[380px]">

                  {/* Main glass card */}

                  <div className="absolute right-0 top-8 w-[330px] rounded-[2rem] border border-white/15 bg-white/10 p-7 shadow-2xl backdrop-blur-xl">

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#5eead4]">
                          {t("hero.card.eyebrow")}
                        </p>

                        <h3 className="mt-2 text-2xl font-bold text-white">
                          {t("hero.card.title")}
                        </h3>

                      </div>

                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#18a999]/20">

                        <ScanLine className="h-6 w-6 text-[#5eead4]" />

                      </div>

                    </div>

                    <div className="mt-8 space-y-3">

                      {diagnosticCardServices.map((service) => (
                        <div
                          key={service}
                          className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                        >

                          <CheckCircle2 className="h-4 w-4 text-[#5eead4]" />

                          <span className="text-sm text-white/75">
                            {t(`hero.card.services.${service}`)}
                          </span>

                        </div>
                      ))}

                    </div>

                    <div className="mt-7 rounded-2xl bg-[#18a999]/15 p-4">

                      <p className="text-sm font-semibold text-white">
                        {t("hero.card.messageTitle")}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-white/50">
                        {t("hero.card.messageDescription")}
                      </p>

                    </div>

                  </div>

                  {/* Floating mini card */}

                  <div className="absolute bottom-8 left-0 rounded-2xl border border-white/10 bg-white p-5 shadow-2xl">

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#18a999]/10">

                        <BarChart3 className="h-5 w-5 text-[#18a999]" />

                      </div>

                      <div>

                        <p className="text-xs text-slate-500">
                          {t("hero.miniCard.label")}
                        </p>

                        <p className="text-sm font-bold text-[#071f46]">
                          {t("hero.miniCard.title")}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            INTRO / STATS
        ===================================================== */}

        <section className="relative bg-[var(--surface)] py-20">

          <div className="mx-auto max-w-7xl px-6 lg:px-8">

            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">

              <div className="max-w-3xl">

                <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#18a999]/10 px-4 py-2 text-sm font-semibold text-[var(--foreground)]">

                  <Award className="h-4 w-4 text-[#18a999]" />

                  {t("intro.badge")}

                </div>

                <h2 className="text-3xl font-bold leading-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl">

                  {t("intro.titleLine1")}

                  <span className="block text-[#18a999]">
                    {t("intro.titleLine2")}
                  </span>

                </h2>

                <p className="mt-6 leading-8 text-[var(--muted)]">
                  {t("intro.description")}
                </p>

              </div>

              <Link
                href="/book?service=diagnosis"
                className="group inline-flex items-center gap-2 font-semibold text-[#18a999]"
              >

                {t("intro.appointment")}

                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />

              </Link>

            </div>

            {/* Highlights */}

            <div className="mt-14 grid overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface-soft)] sm:grid-cols-2 lg:grid-cols-4">

              {introHighlights.map((item) => (

                <div
                  key={item.number}
                  className="border-b border-[var(--border)] p-7 last:border-b-0 sm:nth-[2]:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
                >

                  <span className="text-sm font-bold text-[#18a999]">
                    {item.number}
                  </span>

                  <h3 className="mt-4 font-bold text-[var(--foreground)]">
                    {t(`intro.highlights.${item.key}.title`)}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    {t(`intro.highlights.${item.key}.description`)}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* =====================================================
            SERVICES
        ===================================================== */}

        <section
          id="services"
          className="relative overflow-hidden bg-[var(--surface-soft)] py-28"
        >

          {/* Background decoration */}

          <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#18a999]/5 blur-3xl" />

          <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-[#12356b]/5 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

            {/* Section Header */}

            <div className="mx-auto max-w-3xl text-center">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#18a999]/20 bg-[#18a999]/5 px-4 py-2 text-sm font-semibold text-[var(--foreground)]">

                <Microscope className="h-4 w-4 text-[#18a999]" />

                {t("services.badge")}

              </div>

              <h2 className="text-3xl font-bold leading-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl">

                {t("services.titleLine1")}

                <span className="block text-[#18a999]">
                  {t("services.titleLine2")}
                </span>

              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
                {t("services.description")}
              </p>

            </div>

            {/* Service Cards */}

            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {services.map((service, index) => {

                const Icon = service.icon;

                return (
                  <div
                    key={service.key}
                    className="group relative min-h-[390px] overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:border-[#18a999]/30 hover:shadow-2xl"
                  >

                    {/* Large background number */}

                    <span className="pointer-events-none absolute -right-2 -top-7 select-none text-[150px] font-black leading-none text-slate-100 transition-all duration-500 group-hover:-translate-y-3 group-hover:text-[#18a999]/10 dark:text-white/5">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Top accent */}

                    <div className="absolute left-0 right-0 top-0 h-1.5 origin-left scale-x-0 bg-gradient-to-r from-[#18a999] to-[#12356b] transition-transform duration-500 group-hover:scale-x-100" />

                    {/* Icon */}

                    <div className="relative">

                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#18a999]/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-[#18a999]">

                        <Icon className="h-8 w-8 text-[#18a999] transition-colors duration-500 group-hover:text-white" />

                      </div>

                    </div>

                    {/* Category */}

                    <div className="relative mt-7">

                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#18a999]">
                        {t("services.category")}
                      </span>

                      <h3 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] transition-colors duration-300 group-hover:text-[#18a999]">
                        {t(`services.items.${service.key}.title`)}
                      </h3>

                      <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                        {t(`services.items.${service.key}.description`)}
                      </p>

                    </div>

                    {/* Bottom action */}

                    <div className="absolute bottom-8 left-8 right-8">

                      <div className="flex items-center justify-between border-t border-[var(--border)] pt-5">

                        <span className="text-sm font-semibold text-[var(--foreground)]">
                          {t("services.explore")}
                        </span>

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--surface-soft)] transition-all duration-300 group-hover:bg-[#18a999]">

                          <ArrowRight className="h-4 w-4 text-[var(--muted)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white" />

                        </div>

                      </div>

                    </div>

                    {/* Hover glow */}

                    <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-[#18a999]/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                  </div>
                );
              })}

            </div>

            {/* Bottom service banner */}

            <div className="relative mt-10 overflow-hidden rounded-3xl bg-[#071f46] p-7 sm:p-9">

              <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full border border-[#18a999]/20" />

              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#18a999]/15">

                    <ShieldCheck className="h-6 w-6 text-[#5eead4]" />

                  </div>

                  <div>

                    <h3 className="text-lg font-bold text-white">
                      {t("services.banner.title")}
                    </h3>

                    <p className="mt-1 max-w-xl text-sm leading-6 text-white/50">
                      {t("services.banner.description")}
                    </p>

                  </div>

                </div>

                <Link
                  href="/contact"
                  className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-[#071f46] transition-all duration-300 hover:-translate-y-1 hover:bg-[#5eead4]"
                >

                  {t("services.banner.button")}

                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

                </Link>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            WHY CHOOSE US
        ===================================================== */}

        <section className="bg-[var(--surface)] py-24">

          <div className="mx-auto max-w-7xl px-6 lg:px-8">

            <div className="grid items-center gap-14 lg:grid-cols-2">

              {/* Image */}

              <div className="relative">

                <div className="absolute -left-5 -top-5 h-28 w-28 rounded-3xl bg-[#18a999]/10" />

                <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">

                  <Image
                    src="/images/diagnosis/diagnosis-lab.jpg"
                    alt={t("whyChoose.imageAlt")}
                    width={900}
                    height={700}
                    className="h-[520px] w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#071f46]/80 via-transparent to-transparent" />

                  <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">

                    <div className="flex items-center gap-3">

                      <BadgeCheck className="h-7 w-7 text-[#5eead4]" />

                      <div>

                        <p className="font-semibold text-white">
                          {t("whyChoose.imageCard.title")}
                        </p>

                        <p className="text-sm text-white/60">
                          {t("whyChoose.imageCard.description")}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              {/* Content */}

              <div>

                <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#18a999]/10 px-4 py-2 text-sm font-semibold text-[var(--foreground)]">

                  <ShieldCheck className="h-4 w-4 text-[#18a999]" />

                  {t("whyChoose.badge")}

                </div>

                <h2 className="text-3xl font-bold leading-tight text-[var(--foreground)] sm:text-4xl">

                  {t("whyChoose.titleLine1")}

                  <span className="block text-[#18a999]">
                    {t("whyChoose.titleLine2")}
                  </span>

                </h2>

                <p className="mt-6 leading-8 text-[var(--muted)]">
                  {t("whyChoose.description")}
                </p>

                <div className="mt-8 space-y-5">

                  {whyChooseItems.map((item) => {

                    const Icon = item.icon;

                    return (
                      <div
                        key={item.key}
                        className="group flex gap-4 rounded-2xl p-3 transition-colors hover:bg-[var(--surface-soft)]"
                      >

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#18a999]/10">

                          <Icon className="h-5 w-5 text-[#18a999]" />

                        </div>

                        <div>

                          <h3 className="font-bold text-[var(--foreground)]">
                            {t(`whyChoose.items.${item.key}.title`)}
                          </h3>

                          <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                            {t(`whyChoose.items.${item.key}.description`)}
                          </p>

                        </div>

                      </div>
                    );
                  })}

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            PROCESS
        ===================================================== */}

        <section className="bg-[#071f46] py-24">

          <div className="mx-auto max-w-7xl px-6 lg:px-8">

            <div className="mx-auto max-w-3xl text-center">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-[#5eead4]">

                <Clock3 className="h-4 w-4" />

                {t("process.badge")}

              </div>

              <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">

                {t("process.titleLine1")}

                <span className="block text-[#18a999]">
                  {t("process.titleLine2")}
                </span>

              </h2>

              <p className="mt-5 leading-8 text-white/55">
                {t("process.description")}
              </p>

            </div>

            <div className="relative mt-16">

              {/* Connecting line */}

              <div className="absolute left-[12%] right-[12%] top-8 hidden h-px bg-white/10 lg:block" />

              <div className="grid gap-10 lg:grid-cols-4">

                {processSteps.map((step) => {

                  const Icon = step.icon;

                  return (
                    <div
                      key={step.number}
                      className="relative text-center"
                    >

                      <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#18a999]/30 bg-[#12356b]">

                        <Icon className="h-7 w-7 text-[#5eead4]" />

                      </div>

                      <span className="mt-5 block text-xs font-bold tracking-[0.2em] text-[#18a999]">

                        {t("process.stepLabel")} {step.number}

                      </span>

                      <h3 className="mt-3 text-xl font-bold text-white">
                        {t(`process.steps.${step.key}.title`)}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-white/50">
                        {t(`process.steps.${step.key}.description`)}
                      </p>

                    </div>
                  );
                })}

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            TECHNOLOGY / QUALITY
        ===================================================== */}

        <section className="bg-[var(--surface-soft)] py-24">

          <div className="mx-auto max-w-7xl px-6 lg:px-8">

            <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#12356b] to-[#071f46]">

              <div className="grid lg:grid-cols-2">

                <div className="p-8 sm:p-12 lg:p-16">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#18a999]/15">

                    <ScanLine className="h-7 w-7 text-[#5eead4]" />

                  </div>

                  <h2 className="mt-7 text-3xl font-bold text-white sm:text-4xl">

                    {t("technology.titleLine1")}

                    <span className="block text-[#18a999]">
                      {t("technology.titleLine2")}
                    </span>

                  </h2>

                  <p className="mt-6 leading-8 text-white/60">
                    {t("technology.description")}
                  </p>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">

                    {digitalFeatures.map((feature) => (

                      <div
                        key={feature}
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
                      >

                        <CheckCircle2 className="h-5 w-5 shrink-0 text-[#5eead4]" />

                        <span className="text-sm text-white/70">
                          {t(`technology.features.${feature}`)}
                        </span>

                      </div>

                    ))}

                  </div>

                </div>

                <div className="relative min-h-[400px] overflow-hidden">

                  <Image
                    src="/images/diagnosis/diagnosis-hero1.jpg"
                    alt={t("technology.imageAlt")}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-[#071f46]/35" />

                  <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">

                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5eead4]">
                      {t("technology.approachLabel")}
                    </p>

                    <p className="mt-2 font-semibold leading-7 text-white">
                      {t("technology.approachText")}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            FAQ
        ===================================================== */}

        <section className="bg-[var(--surface)] py-24">

          <div className="mx-auto max-w-4xl px-6 lg:px-8">

            <div className="text-center">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#18a999]/10 px-4 py-2 text-sm font-semibold text-[var(--foreground)]">

                <FileCheck2 className="h-4 w-4 text-[#18a999]" />

                {t("faq.badge")}

              </div>

              <h2 className="text-3xl font-bold text-[var(--foreground)] sm:text-4xl">

                {t("faq.titleLine1")}

                <span className="text-[#18a999]">
                  {" "}
                  {t("faq.titleLine2")}
                </span>

              </h2>

            </div>

            <div className="mt-12 space-y-4">

              {faqs.map((faq, index) => {

                const isOpen = openFaq === index;

                return (
                  <div
                    key={faq.key}
                    className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm"
                  >

                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaq(isOpen ? null : index)
                      }
                      className="flex w-full items-center justify-between gap-5 p-6 text-left"
                    >

                      <span className="font-bold text-[var(--foreground)]">
                        {t(`faq.items.${faq.key}.question`)}
                      </span>

                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-[#18a999] transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />

                    </button>

                    <div
                      className={`grid transition-all duration-300 ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >

                      <div className="overflow-hidden">

                        <p className="border-t border-[var(--border)] px-6 pb-6 pt-5 text-sm leading-7 text-[var(--muted)]">
                          {t(`faq.items.${faq.key}.answer`)}
                        </p>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

        </section>

        {/* =====================================================
            FINAL CTA
        ===================================================== */}

        <section className="relative overflow-hidden bg-[#071f46] py-24">

          <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#18a999]/10 blur-3xl" />

          <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#18a999]/10 blur-3xl" />

          <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#18a999]/15">

              <CalendarCheck className="h-8 w-8 text-[#5eead4]" />

            </div>

            <h2 className="mt-7 text-4xl font-bold leading-tight text-white sm:text-5xl">

              {t("cta.titleLine1")}

              <span className="block text-[#18a999]">
                {t("cta.titleLine2")}
              </span>

            </h2>

            <p className="mx-auto mt-6 max-w-2xl leading-8 text-white/60">
              {t("cta.description")}
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">

              <Link
                href="/book?service=diagnosis"
                className="group inline-flex items-center gap-2 rounded-xl bg-[#18a999] px-8 py-4 font-semibold text-white shadow-xl shadow-[#18a999]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#20bbaa]"
              >

                {t("cta.bookAppointment")}

                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />

              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-white/10"
              >
                {t("cta.contact")}
              </Link>

            </div>

          </div>

        </section>

      </main>
    </AfilasPageShell>
  );
}