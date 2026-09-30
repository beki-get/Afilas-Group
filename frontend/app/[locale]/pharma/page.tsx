"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

import {
  ArrowRight,
  FlaskConical,
  ShieldCheck,
  Factory,
  Lightbulb,
  CheckCircle2,
  Target,
  Eye,
  Users,
  HeartHandshake,
  FileCheck2,
  Microscope,
  PackageCheck,
  Settings2,
  ClipboardCheck,
  Search,
} from "lucide-react";

import AfilasPageShell from "@/components/AfilasPageShell";

export default function ManufacturingPage() {
  const t = useTranslations("Pharma");

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const capabilities = [
    {
      number: "01",
      key: "research",
      icon: Microscope,
    },
    {
      number: "02",
      key: "production",
      icon: Factory,
    },
    {
      number: "03",
      key: "quality",
      icon: ShieldCheck,
    },
    {
      number: "04",
      key: "packaging",
      icon: PackageCheck,
    },
    {
      number: "05",
      key: "improvement",
      icon: Settings2,
    },
    {
      number: "06",
      key: "innovation",
      icon: Lightbulb,
    },
  ];

  const qualityPoints = [
    {
      key: "documentation",
      icon: FileCheck2,
    },
    {
      key: "inspection",
      icon: Search,
    },
    {
      key: "improvement",
      icon: Settings2,
    },
    {
      key: "responsibility",
      icon: HeartHandshake,
    },
  ];

  const qualityPrinciples = [
    "consistency",
    "responsibility",
    "continuous",
  ];

  const productCategories = [
    "essential",
    "research",
    "future",
  ];

  const productVisionPoints = [
    "healthcare",
    "quality",
    "continuous",
  ];

  const processStages = [
    {
      number: "01",
      key: "research",
    },
    {
      number: "02",
      key: "development",
    },
    {
      number: "03",
      key: "testing",
    },
    {
      number: "04",
      key: "manufacturing",
    },
    {
      number: "05",
      key: "packaging",
    },
  ];

  const principles = [
    "innovation",
    "quality",
    "collaboration",
    "continuous",
    "responsibility",
  ];

  const innovationItems = [
    "research",
    "technology",
    "continuous",
  ];

  const futureDirections = [
    "research",
    "collaboration",
    "impact",
  ];

  const informationTags = [
    "productNames",
    "formulations",
    "regulatory",
    "availability",
  ];

  return (
    <AfilasPageShell>
      <main className="manufacturing-page bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">

        {/* =========================================================
    SECTION 1 — HERO
========================================================= */}
<section className="relative min-h-[720px] overflow-hidden bg-[#071f46] text-white">

  {/* Hero Image Slider */}
  <div className="absolute inset-0">
    {[
      "/images/manufacturing/manufacture11.jpg",
      "/images/manufacturing/manufacture22.jpg",
      "/images/manufacturing/manufacture33.jpg",
    ].map((src, index) => (
      <Image
        key={src}
        src={src}
        alt={t("hero.imageAlt")}
        fill
        priority={index === 0}
        className={`object-cover transition-opacity duration-1000 ${
          currentSlide === index
            ? "opacity-100"
            : "opacity-0"
        }`}
      />
    ))}

    {/* Overall overlay */}
    <div className="absolute inset-0 bg-[#071f46]/35" />

    {/* Darker left side for readable text */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#071f46]/95 via-[#071f46]/55 to-transparent" />

    {/* Bottom gradient */}
    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#071f46]/70 to-transparent" />
  </div>

  {/* Decorative Elements */}
  <div className="absolute -left-24 top-24 h-72 w-72 rounded-full border border-[#18a999]/20" />
  <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full border border-white/10" />

  <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl items-center px-6 py-20 lg:px-8">
    <div className="max-w-4xl">

      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#18a999]/30 bg-[#18a999]/10 px-5 py-2.5 text-sm font-semibold text-[#62ddd1] backdrop-blur-md">
        <Factory className="h-4 w-4" />
        {t("hero.badge")}
      </div>

      <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
        {t("hero.titleLine1")}{" "}
        <span className="text-[#45cfc0]">
          {t("hero.titleLine2")}
        </span>
      </h1>

      <p className="mt-7 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
        {t("hero.description")}
      </p>

      <div className="mt-9 flex flex-col gap-4 sm:flex-row">
        <Link
          href="#products"
          className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#18a999] px-7 py-4 font-semibold text-white shadow-lg shadow-[#18a999]/20 transition hover:bg-[#14998e]"
        >
          {t("hero.exploreProducts")}
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Link>

        <Link
          href="#about"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-md transition hover:bg-white/15"
        >
          {t("hero.learnMore")}
        </Link>
      </div>

      {/* Trust Indicators */}
      <div className="mt-14 grid max-w-2xl grid-cols-3 gap-5 border-t border-white/15 pt-8">

        <div>
          <ShieldCheck className="mb-3 h-6 w-6 text-[#45cfc0]" />
          <p className="text-sm font-semibold">
            {t("hero.trust.quality.title")}
          </p>
          <p className="mt-1 text-xs text-white/60">
            {t("hero.trust.quality.description")}
          </p>
        </div>

        <div>
          <Factory className="mb-3 h-6 w-6 text-[#45cfc0]" />
          <p className="text-sm font-semibold">
            {t("hero.trust.modern.title")}
          </p>
          <p className="mt-1 text-xs text-white/60">
            {t("hero.trust.modern.description")}
          </p>
        </div>

        <div>
          <HeartHandshake className="mb-3 h-6 w-6 text-[#45cfc0]" />
          <p className="text-sm font-semibold">
            {t("hero.trust.trusted.title")}
          </p>
          <p className="mt-1 text-xs text-white/60">
            {t("hero.trust.trusted.description")}
          </p>
        </div>

      </div>
    </div>
  </div>

  {/* =========================================================
      BOTTOM RIGHT — BOOK APPOINTMENT BUTTON
  ========================================================= */}
  <div className="absolute bottom-10 right-6 z-20 sm:right-10 lg:right-12">
    <Link
      href="/book?service=pharma"
      className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-[#18a999]/90 px-6 py-3.5 font-semibold text-white shadow-xl shadow-black/20 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-[#14998e]"
    >
      <span>{t("hero.bookAppointment")}</span>

      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  </div>

  {/* Slide Indicators */}
  <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
    {[0, 1, 2].map((index) => (
      <button
        key={index}
        onClick={() => setCurrentSlide(index)}
        aria-label={t("hero.slide", {
          number: index + 1,
        })}
        className={`h-2 rounded-full transition-all ${
          currentSlide === index
            ? "w-10 bg-[#18a999]"
            : "w-2 bg-white/40"
        }`}
      />
    ))}
  </div>

</section>

        {/* =========================================================
            SECTION 2 — ABOUT MANUFACTURING
        ========================================================= */}
        <section
          id="about"
          className="relative overflow-hidden bg-white py-24 transition-colors duration-300 dark:bg-[#071f46]"
        >
          <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#18a999]/5 dark:bg-[#18a999]/10" />
          <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#12356b]/5 dark:bg-[#18a999]/5" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid items-center gap-16 lg:grid-cols-2">

              {/* Image */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
                  <Image
                    src="/images/manufacturing/pharmaceutical-lab.jpg"
                    alt={t("about.imageAlt")}
                    width={900}
                    height={700}
                    className="h-[550px] w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#071f46]/70 via-transparent to-transparent" />

                  <div className="absolute bottom-6 left-6 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-white backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="h-8 w-8 text-[#45cfc0]" />

                      <div>
                        <p className="font-bold">
                          {t("about.imageCard.title")}
                        </p>

                        <p className="text-sm text-white/70">
                          {t("about.imageCard.description")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-8 -right-8 hidden w-64 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-[#0d2d55] lg:block">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#18a999]/10">
                    <Eye className="h-6 w-6 text-[#18a999]" />
                  </div>

                  <p className="text-sm font-semibold text-[#071f46] dark:text-white">
                    {t("about.visionCard.title")}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    {t("about.visionCard.description")}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div>

                <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#18a999]/10 px-4 py-2 text-sm font-semibold text-[#18a999]">
                  <FlaskConical className="h-4 w-4" />
                  {t("about.badge")}
                </div>

                <h2 className="text-4xl font-bold leading-tight text-[#071f46] dark:text-white sm:text-5xl">
                  {t("about.title")}
                </h2>

                <p className="mt-6 leading-8 text-slate-600 dark:text-slate-300">
                  {t("about.description")}
                </p>

                <div className="mt-8">
                  <h3 className="text-xl font-bold text-[#071f46] dark:text-white">
                    {t("about.whoWeAre.title")}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                    {t("about.whoWeAre.description")}
                  </p>
                </div>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 dark:border-white/10 dark:bg-[#0a274b]">
                    <Target className="h-7 w-7 text-[#18a999]" />

                    <h4 className="mt-4 font-bold text-[#071f46] dark:text-white">
                      {t("about.mission.title")}
                    </h4>

                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {t("about.mission.description")}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 dark:border-white/10 dark:bg-[#0a274b]">
                    <Eye className="h-7 w-7 text-[#18a999]" />

                    <h4 className="mt-4 font-bold text-[#071f46] dark:text-white">
                      {t("about.vision.title")}
                    </h4>

                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {t("about.vision.description")}
                    </p>
                  </div>

                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">

                  <div className="rounded-xl border-l-4 border-[#18a999] bg-[#18a999]/5 p-5 dark:bg-[#18a999]/10">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#18a999]">
                      01
                    </p>

                    <p className="mt-2 font-semibold text-[#071f46] dark:text-white">
                      {t("about.focus.healthcare")}
                    </p>
                  </div>

                  <div className="rounded-xl border-l-4 border-[#12356b] bg-[#071f46]/5 p-5 dark:border-[#45cfc0] dark:bg-white/5">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#18a999]">
                      02
                    </p>

                    <p className="mt-2 font-semibold text-[#071f46] dark:text-white">
                      {t("about.focus.innovation")}
                    </p>
                  </div>

                </div>

                <Link
                  href="#capabilities"
                  className="group mt-8 inline-flex items-center gap-2 font-semibold text-[#18a999]"
                >
                  {t("about.exploreCapabilities")}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>

              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 3 — MANUFACTURING CAPABILITIES
        ========================================================= */}
        <section
          id="capabilities"
          className="bg-slate-50 py-24 transition-colors duration-300 dark:bg-[#0a274b]"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">

            <div className="mx-auto max-w-3xl text-center">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#18a999]/10 px-4 py-2 text-sm font-semibold text-[#18a999]">
                <Factory className="h-4 w-4" />
                {t("capabilities.badge")}
              </div>

              <h2 className="text-4xl font-bold text-[#071f46] dark:text-white sm:text-5xl">
                {t("capabilities.title")}
              </h2>

              <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                {t("capabilities.description")}
              </p>
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {capabilities.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.number}
                    className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-white/10 dark:bg-[#0d2d55] dark:hover:bg-[#12356b]"
                  >
                    <span className="absolute right-6 top-4 text-6xl font-black text-slate-100 dark:text-white/5">
                      {item.number}
                    </span>

                    <div className="relative">

                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#18a999]/10 transition group-hover:bg-[#18a999]">
                        <Icon className="h-7 w-7 text-[#18a999] transition group-hover:text-white" />
                      </div>

                      <h3 className="mt-7 text-xl font-bold text-[#071f46] dark:text-white">
                        {t(`capabilities.items.${item.key}.title`)}
                      </h3>

                      <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                        {t(`capabilities.items.${item.key}.description`)}
                      </p>

                    </div>
                  </div>
                );
              })}

            </div>

            {/* Commitment Banner */}
            <div className="mt-14 overflow-hidden rounded-3xl bg-[#071f46] p-8 text-white shadow-xl sm:p-10">
              <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

                <div className="flex gap-5">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#18a999]/20">
                    <HeartHandshake className="h-7 w-7 text-[#45cfc0]" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold">
                      {t("capabilities.commitment.title")}
                    </h3>

                    <p className="mt-2 max-w-2xl leading-7 text-white/70">
                      {t("capabilities.commitment.description")}
                    </p>
                  </div>

                </div>

                <Link
                  href="/contact"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#18a999] px-6 py-3.5 font-semibold transition hover:bg-[#14998e]"
                >
                  {t("capabilities.commitment.button")}
                  <ArrowRight className="h-5 w-5" />
                </Link>

              </div>
            </div>

          </div>
        </section>

        {/* =========================================================
            SECTION 4 — QUALITY & SAFETY
        ========================================================= */}
        <section className="bg-white py-24 transition-colors duration-300 dark:bg-[#071f46]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">

            <div className="mx-auto max-w-3xl text-center">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#18a999]/10 px-4 py-2 text-sm font-semibold text-[#18a999]">
                <ShieldCheck className="h-4 w-4" />
                {t("quality.badge")}
              </div>

              <h2 className="text-4xl font-bold text-[#071f46] dark:text-white sm:text-5xl">
                {t("quality.title")}
              </h2>

              <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                {t("quality.description")}
              </p>
            </div>

            <div className="mt-16 grid items-center gap-14 lg:grid-cols-2">

              {/* Image */}
              <div className="relative">

                <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">

                  <Image
                    src="/images/manufacturing/quality-control.jpg"
                    alt={t("quality.imageAlt")}
                    width={900}
                    height={700}
                    className="h-[500px] w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#071f46]/90 via-transparent to-transparent" />

                  <div className="absolute bottom-7 left-7 text-white">

                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#45cfc0]">
                      {t("quality.imageCard.eyebrow")}
                    </p>

                    <h3 className="mt-2 text-3xl font-bold">
                      {t("quality.imageCard.title")}
                    </h3>

                  </div>
                </div>

                <div className="absolute -right-6 -top-6 hidden rounded-2xl bg-white p-5 shadow-xl dark:bg-[#0d2d55] sm:block">
                  <ShieldCheck className="h-8 w-8 text-[#18a999]" />

                  <p className="mt-2 text-sm font-bold text-[#071f46] dark:text-white">
                    {t("quality.qualityFirst")}
                  </p>
                </div>

              </div>

              {/* Quality Points */}
              <div className="space-y-5">

                {qualityPoints.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.key}
                      className="flex gap-5 rounded-2xl border border-slate-100 bg-slate-50 p-6 dark:border-white/10 dark:bg-[#0a274b]"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#18a999]/10">
                        <Icon className="h-6 w-6 text-[#18a999]" />
                      </div>

                      <div>
                        <h3 className="font-bold text-[#071f46] dark:text-white">
                          {t(`quality.points.${item.key}.title`)}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                          {t(`quality.points.${item.key}.description`)}
                        </p>
                      </div>
                    </div>
                  );
                })}

              </div>
            </div>

            {/* Quality Principles */}
            <div className="mt-16 grid gap-6 md:grid-cols-3">

              {qualityPrinciples.map((key) => (
                <div
                  key={key}
                  className="rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-sm dark:border-white/10 dark:bg-[#0d2d55]"
                >
                  <CheckCircle2 className="mx-auto h-9 w-9 text-[#18a999]" />

                  <h3 className="mt-5 text-xl font-bold text-[#071f46] dark:text-white">
                    {t(`quality.principles.${key}.title`)}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                    {t(`quality.principles.${key}.description`)}
                  </p>
                </div>
              ))}

            </div>

            <div className="mt-12 text-center">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-xl bg-[#071f46] px-7 py-4 font-semibold text-white transition hover:bg-[#12356b] dark:bg-[#18a999] dark:hover:bg-[#14998e]"
              >
                {t("quality.button")}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

          </div>
        </section>

        {/* =========================================================
            SECTION 5 — PRODUCT FOCUS
        ========================================================= */}
        <section
          id="products"
          className="bg-slate-50 py-24 transition-colors duration-300 dark:bg-[#0a274b]"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">

            <div className="mx-auto max-w-3xl text-center">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#18a999]/10 px-4 py-2 text-sm font-semibold text-[#18a999]">
                <FlaskConical className="h-4 w-4" />
                {t("products.badge")}
              </div>

              <h2 className="text-4xl font-bold text-[#071f46] dark:text-white sm:text-5xl">
                {t("products.title")}
              </h2>

              <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                {t("products.description")}
              </p>

            </div>

            {/* Main Product Feature */}
            <div className="mt-16 overflow-hidden rounded-[2rem] bg-[#071f46] shadow-2xl">

              <div className="grid lg:grid-cols-2">

                <div className="relative min-h-[480px]">
                  <Image
                    src="/images/manufacturing/manufacture.jpg"
                    alt={t("products.imageAlt")}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-r from-[#071f46]/10 to-[#071f46]/80 lg:bg-gradient-to-l" />
                </div>

                <div className="flex flex-col justify-center p-8 text-white sm:p-12 lg:p-16">

                  <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#45cfc0]">
                    {t("products.feature.eyebrow")}
                  </span>

                  <h3 className="mt-4 text-3xl font-bold sm:text-4xl">
                    {t("products.feature.title")}
                  </h3>

                  <p className="mt-5 leading-8 text-white/70">
                    {t("products.feature.description")}
                  </p>

                  <div className="mt-8 space-y-5">

                    {productVisionPoints.map((key) => (
                      <div
                        key={key}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle2 className="h-5 w-5 text-[#45cfc0]" />

                        <span className="text-white/90">
                          {t(`products.feature.points.${key}`)}
                        </span>
                      </div>
                    ))}

                  </div>
                </div>
              </div>
            </div>

            {/* Product Categories */}
            <div className="mt-12 grid gap-6 md:grid-cols-3">

              {productCategories.map((key) => (
                <div
                  key={key}
                  className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-[#0d2d55]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#18a999]/10">
                    <FlaskConical className="h-6 w-6 text-[#18a999]" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-[#071f46] dark:text-white">
                    {t(`products.categories.${key}.title`)}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                    {t(`products.categories.${key}.description`)}
                  </p>
                </div>
              ))}

            </div>

            {/* Important Information Notice */}
            <div className="mt-12 rounded-3xl border border-amber-200 bg-amber-50 p-7 dark:border-amber-400/20 dark:bg-amber-950/30">

              <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
                  <ClipboardCheck className="h-6 w-6 text-amber-700 dark:text-amber-300" />
                </div>

                <div className="flex-1">

                  <h3 className="font-bold text-[#071f46] dark:text-white">
                    {t("products.notice.title")}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {t("products.notice.description")}
                  </p>

                </div>

                <div className="flex flex-wrap gap-2">

                  {informationTags.map((key) => (
                    <span
                      key={key}
                      className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm dark:bg-white/10 dark:text-slate-200"
                    >
                      {t(`products.notice.tags.${key}`)}
                    </span>
                  ))}

                </div>

              </div>
            </div>

          </div>
        </section>

        {/* =========================================================
            SECTION 6 — MANUFACTURING PROCESS
        ========================================================= */}
        <section className="relative overflow-hidden bg-white py-24 transition-colors duration-300 dark:bg-[#071f46]">

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(#071f46 1px, transparent 1px), linear-gradient(90deg, #071f46 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

            <div className="mx-auto max-w-3xl text-center">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#18a999]/10 px-4 py-2 text-sm font-semibold text-[#18a999]">
                <Settings2 className="h-4 w-4" />
                {t("process.badge")}
              </div>

              <h2 className="text-4xl font-bold text-[#071f46] dark:text-white sm:text-5xl">
                {t("process.title")}
              </h2>

              <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                {t("process.description")}
              </p>

            </div>

            {/* Process Stages */}
            <div className="relative mt-16">

              <div className="absolute left-[10%] right-[10%] top-10 hidden h-px bg-[#18a999]/20 lg:block" />

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">

                {processStages.map((stage) => (
                  <div
                    key={stage.number}
                    className="relative text-center"
                  >

                    <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-full border-8 border-white bg-[#18a999] text-xl font-bold text-white shadow-lg dark:border-[#071f46]">
                      {stage.number}
                    </div>

                    <h3 className="mt-6 font-bold text-[#071f46] dark:text-white">
                      {t(`process.stages.${stage.key}.title`)}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {t(`process.stages.${stage.key}.description`)}
                    </p>

                  </div>
                ))}

              </div>
            </div>

            {/* Feature Panel */}
            <div className="mt-20 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#12356b] to-[#0a294f] shadow-2xl">

              <div className="grid lg:grid-cols-2">

                <div className="relative min-h-[420px]">

                  <Image
                    src="/images/manufacturing/manufacturing-process.jpg"
                    alt={t("process.feature.imageAlt")}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-[#071f46]/30" />
                </div>

                <div className="flex flex-col justify-center p-8 text-white sm:p-12">

                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#45cfc0]">
                    {t("process.feature.eyebrow")}
                  </p>

                  <h3 className="mt-4 text-3xl font-bold">
                    {t("process.feature.title")}
                  </h3>

                  <p className="mt-5 leading-8 text-white/70">
                    {t("process.feature.description")}
                  </p>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <Settings2 className="h-6 w-6 text-[#45cfc0]" />

                      <p className="mt-3 font-bold">
                        {t("process.feature.precision.title")}
                      </p>

                      <p className="mt-1 text-sm text-white/60">
                        {t("process.feature.precision.description")}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <ShieldCheck className="h-6 w-6 text-[#45cfc0]" />

                      <p className="mt-3 font-bold">
                        {t("process.feature.quality.title")}
                      </p>

                      <p className="mt-1 text-sm text-white/60">
                        {t("process.feature.quality.description")}
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            <p className="mx-auto mt-12 max-w-3xl text-center text-lg leading-8 text-slate-600 dark:text-slate-300">
              {t("process.closing")}
            </p>

          </div>
        </section>

        {/* =========================================================
            SECTION 7 — WHY CHOOSE AFILAS
        ========================================================= */}
        <section className="bg-slate-50 py-24 transition-colors duration-300 dark:bg-[#0a274b]">

          <div className="mx-auto max-w-7xl px-6 lg:px-8">

            <div className="grid gap-12 lg:grid-cols-2">

              {/* Left */}
              <div className="flex flex-col justify-center">

                <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-[#18a999]/10 px-4 py-2 text-sm font-semibold text-[#18a999]">
                  <HeartHandshake className="h-4 w-4" />
                  {t("whyAfilas.badge")}
                </div>

                <h2 className="text-4xl font-bold leading-tight text-[#071f46] dark:text-white sm:text-5xl">
                  {t("whyAfilas.title")}
                </h2>

                <p className="mt-6 max-w-xl leading-8 text-slate-600 dark:text-slate-300">
                  {t("whyAfilas.description")}
                </p>

                <div className="mt-8 rounded-3xl border border-[#18a999]/20 bg-[#18a999]/5 p-7 dark:bg-[#18a999]/10">

                  <div className="flex gap-4">

                    <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-[#18a999]" />

                    <div>

                      <h3 className="text-xl font-bold text-[#071f46] dark:text-white">
                        {t("whyAfilas.quality.title")}
                      </h3>

                      <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">
                        {t("whyAfilas.quality.description")}
                      </p>

                    </div>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="relative">

                <div className="rounded-[2rem] bg-[#071f46] p-8 text-white shadow-2xl sm:p-10">

                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#45cfc0]">
                    {t("whyAfilas.drives.eyebrow")}
                  </p>

                  <h3 className="mt-4 text-3xl font-bold">
                    {t("whyAfilas.drives.title")}
                  </h3>

                  <div className="mt-8 space-y-5">

                    {principles.map((key, index) => (
                      <div
                        key={key}
                        className="flex gap-4 border-b border-white/10 pb-5 last:border-0 last:pb-0"
                      >

                        <span className="text-sm font-bold text-[#45cfc0]">
                          0{index + 1}
                        </span>

                        <div>

                          <h4 className="font-bold">
                            {t(`whyAfilas.principles.${key}.title`)}
                          </h4>

                          <p className="mt-1 text-sm leading-6 text-white/60">
                            {t(`whyAfilas.principles.${key}.description`)}
                          </p>

                        </div>
                      </div>
                    ))}

                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-white px-6 py-5 shadow-xl dark:bg-[#0d2d55] sm:block">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#18a999]/10">
                      <Users className="h-6 w-6 text-[#18a999]" />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-[#071f46] dark:text-white">
                        {t("whyAfilas.visionCard.title")}
                      </p>

                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {t("whyAfilas.visionCard.description")}
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            </div>

            <div className="mt-16 text-center">

              <Link
                href="/"
                className="group inline-flex items-center gap-2 font-semibold text-[#18a999]"
              >
                {t("whyAfilas.discover")}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>

            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 8 — INNOVATION & FUTURE VISION
        ========================================================= */}
        <section className="bg-white py-24 transition-colors duration-300 dark:bg-[#071f46]">

          <div className="mx-auto max-w-7xl px-6 lg:px-8">

            <div className="mx-auto max-w-3xl text-center">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#18a999]/10 px-4 py-2 text-sm font-semibold text-[#18a999]">
                <Lightbulb className="h-4 w-4" />
                {t("innovation.badge")}
              </div>

              <h2 className="text-4xl font-bold text-[#071f46] dark:text-white sm:text-5xl">
                {t("innovation.title")}
              </h2>

              <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                {t("innovation.description")}
              </p>

            </div>

            <div className="mt-16 overflow-hidden rounded-[2rem] bg-[#071f46] shadow-2xl">

              <div className="grid lg:grid-cols-2">

                {/* Innovation */}
                <div className="p-8 sm:p-12 lg:p-14">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#18a999]/15">
                    <Lightbulb className="h-7 w-7 text-[#45cfc0]" />
                  </div>

                  <h3 className="mt-7 text-3xl font-bold text-white">
                    {t("innovation.innovation.title")}
                  </h3>

                  <p className="mt-5 leading-8 text-white/65">
                    {t("innovation.innovation.description")}
                  </p>

                  <div className="mt-8 space-y-5">

                    {innovationItems.map((key) => (
                      <div
                        key={key}
                        className="rounded-2xl border border-white/10 bg-white/5 p-5"
                      >

                        <h4 className="font-bold text-white">
                          {t(`innovation.innovation.items.${key}.title`)}
                        </h4>

                        <p className="mt-2 text-sm leading-6 text-white/55">
                          {t(`innovation.innovation.items.${key}.description`)}
                        </p>

                      </div>
                    ))}

                  </div>
                </div>

                {/* Future Directions */}
                <div className="bg-gradient-to-br from-[#12356b] to-[#0a294f] p-8 sm:p-12 lg:p-14">

                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#45cfc0]">
                    {t("innovation.future.eyebrow")}
                  </p>

                  <h3 className="mt-4 text-3xl font-bold text-white">
                    {t("innovation.future.title")}
                  </h3>

                  <div className="mt-8 space-y-5">

                    {futureDirections.map((key, index) => (
                      <div
                        key={key}
                        className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
                      >

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#18a999]/15 text-sm font-bold text-[#45cfc0]">
                          0{index + 1}
                        </div>

                        <span className="font-semibold text-white">
                          {t(`innovation.future.items.${key}`)}
                        </span>

                      </div>
                    ))}

                  </div>

                  <div className="mt-8 border-t border-white/10 pt-7">

                    <p className="leading-7 text-white/60">
                      {t("innovation.future.description")}
                    </p>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 9 — FINAL CTA
        ========================================================= */}
        <section className="relative overflow-hidden bg-[#071f46] py-24 text-white">

          <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full border border-[#18a999]/20" />
          <div className="absolute -bottom-48 -right-32 h-[500px] w-[500px] rounded-full border border-white/10" />

          <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-8">

            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#18a999]/30 bg-[#18a999]/10 px-5 py-2.5 text-sm font-semibold text-[#62ddd1]">
              <HeartHandshake className="h-4 w-4" />
              {t("cta.badge")}
            </div>

            <h2 className="mt-7 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              {t("cta.title")}
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/70">
              {t("cta.description")}
            </p>

            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">

              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#18a999] px-7 py-4 font-semibold text-white shadow-lg shadow-[#18a999]/20 transition hover:bg-[#14998e]"
              >
                {t("cta.contact")}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-md transition hover:bg-white/15"
              >
                {t("cta.explore")}
              </Link>

            </div>

            {/* Trust Points */}
            <div className="mx-auto mt-14 grid max-w-3xl grid-cols-3 gap-5 border-t border-white/10 pt-8">

              <div>
                <ShieldCheck className="mx-auto h-6 w-6 text-[#45cfc0]" />

                <p className="mt-3 text-sm font-semibold">
                  {t("cta.trust.healthcare")}
                </p>
              </div>

              <div>
                <Lightbulb className="mx-auto h-6 w-6 text-[#45cfc0]" />

                <p className="mt-3 text-sm font-semibold">
                  {t("cta.trust.innovation")}
                </p>
              </div>

              <div>
                <Target className="mx-auto h-6 w-6 text-[#45cfc0]" />

                <p className="mt-3 text-sm font-semibold">
                  {t("cta.trust.future")}
                </p>
              </div>

            </div>
          </div>
        </section>

      </main>
    </AfilasPageShell>
  );
}