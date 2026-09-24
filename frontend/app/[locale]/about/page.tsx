"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  Factory,
  HeartHandshake,
  Hospital,
  Lightbulb,
  Microscope,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Eye,
  Globe2,
  Activity,
} from "lucide-react";

export default function AboutPage() {
  const t = useTranslations("About");

  const values = [
    {
      icon: ShieldCheck,
      title: t("values.quality.title"),
      text: t("values.quality.text"),
    },
    {
      icon: HeartHandshake,
      title: t("values.responsibility.title"),
      text: t("values.responsibility.text"),
    },
    {
      icon: Lightbulb,
      title: t("values.innovation.title"),
      text: t("values.innovation.text"),
    },
    {
      icon: Users,
      title: t("values.collaboration.title"),
      text: t("values.collaboration.text"),
    },
  ];

  const capabilities = [
    {
      title: t("capabilities.care.title"),
      text: t("capabilities.care.text"),
    },
    {
      title: t("capabilities.diagnosis.title"),
      text: t("capabilities.diagnosis.text"),
    },
    {
      title: t("capabilities.innovation.title"),
      text: t("capabilities.innovation.text"),
    },
  ];

  const futureItems = [
    {
      icon: Microscope,
      title: t("future.items.innovation"),
    },
    {
      icon: Globe2,
      title: t("future.items.growth"),
    },
    {
      icon: Users,
      title: t("future.items.collaboration"),
    },
    {
      icon: Activity,
      title: t("future.items.healthcare"),
    },
  ];

  return (
    <main className="overflow-hidden bg-white text-[#071f46] transition-colors duration-300 dark:bg-[#071f46] dark:text-white">

      {/* =========================================================
          SECTION 1 — HERO
      ========================================================= */}

      <section className="relative min-h-[760px] overflow-hidden bg-[#071f46]">

        <div className="absolute inset-0">
          <Image
            src="/images/about/about-hero.jpg"
            alt={t("hero.imageAlt")}
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#071f46]/55 via-[#071f46]/25 to-transparent" />
        </div>

        <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-teal-500/20 blur-3xl" />

        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative mx-auto flex min-h-[760px] max-w-7xl items-center px-6 py-28 lg:px-8">

          <div className="grid w-full items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">

            {/* LEFT CONTENT */}

            <div className="max-w-3xl">

              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-teal-300 backdrop-blur-xl">
                <Sparkles className="h-4 w-4" />
                {t("hero.badge")}
              </div>

              <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
                {t("hero.titleLine1")}

                <span className="block text-teal-400">
                  {t("hero.titleLine2")}
                </span>

                <span className="block">
                  {t("hero.titleLine3")}
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                {t("hero.description")}
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">

                <Link
                  href="/about"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-teal-500 px-7 py-4 font-bold text-white shadow-xl shadow-teal-900/20 transition-all duration-300 hover:-translate-y-1 hover:bg-teal-400"
                >
                  {t("hero.storyButton")}

                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/15"
                >
                  {t("hero.contactButton")}
                </Link>

              </div>

              <div className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-8">

                <div>
                  <p className="text-2xl font-bold text-white">03</p>

                  <p className="mt-1 text-xs text-slate-400">
                    {t("hero.stats.pillars")}
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold text-white">01</p>

                  <p className="mt-1 text-xs text-slate-400">
                    {t("hero.stats.vision")}
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold text-white">∞</p>

                  <p className="mt-1 text-xs text-slate-400">
                    {t("hero.stats.future")}
                  </p>
                </div>

              </div>

            </div>

            {/* RIGHT HERO VISUAL */}

            <div className="relative hidden lg:block">

              <div className="relative mx-auto h-[510px] w-[430px]">

                <div className="absolute inset-8 rotate-6 rounded-[3rem] border border-white/10" />

                <div className="absolute inset-0 overflow-hidden rounded-[3rem] border border-white/15 bg-white/10 shadow-2xl backdrop-blur-xl">

                  <div className="absolute inset-0 bg-gradient-to-br from-teal-400/10 via-transparent to-blue-500/10" />

                  <div className="relative flex h-full flex-col justify-between p-8">

                    <div className="flex items-center justify-between">

                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-xl">

                        <Image
                          src="/afilas-logo.jpg"
                          alt="Afilas Group"
                          width={45}
                          height={45}
                          className="h-10 w-10 object-contain"
                        />

                      </div>

                      <div className="rounded-full border border-teal-300/20 bg-teal-400/10 px-4 py-2 text-xs font-semibold text-teal-300">
                        {t("hero.card.connected")}
                      </div>

                    </div>

                    <div>

                      <p className="text-sm uppercase tracking-[0.25em] text-teal-300">
                        Afilas Group
                      </p>

                      <h2 className="mt-4 text-4xl font-bold leading-tight text-white">
                        {t("hero.card.titleLine1")}
                        <br />
                        {t("hero.card.titleLine2")}
                        <br />
                        {t("hero.card.titleLine3")}
                      </h2>

                      <div className="mt-8 space-y-4">

                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-400/10">
                            <Hospital className="h-5 w-5 text-teal-300" />
                          </div>

                          <span className="text-sm text-slate-200">
                            {t("pillars.hospital.title")}
                          </span>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-400/10">
                            <Microscope className="h-5 w-5 text-teal-300" />
                          </div>

                          <span className="text-sm text-slate-200">
                            {t("pillars.diagnosis.title")}
                          </span>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-400/10">
                            <Factory className="h-5 w-5 text-teal-300" />
                          </div>

                          <span className="text-sm text-slate-200">
                            {t("pillars.manufacturing.title")}
                          </span>
                        </div>

                      </div>

                    </div>

                    <div className="flex items-center justify-between border-t border-white/10 pt-6">

                      <span className="text-xs text-slate-400">
                        {t("hero.card.footer")}
                      </span>

                      <div className="h-3 w-3 animate-pulse rounded-full bg-teal-400 shadow-lg shadow-teal-400/50" />

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          SECTION 2 — OUR STORY
      ========================================================= */}

      <section
        id="our-story"
        className="relative overflow-hidden bg-white py-24 transition-colors duration-300 dark:bg-[#071f46] sm:py-28"
      >

        <div className="absolute right-[-180px] top-20 h-[420px] w-[420px] rounded-full bg-teal-100/40 blur-3xl dark:bg-teal-500/5" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">

            <div className="relative">

              <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">

                <Image
                  src="/images/manufacturing/quality-control.jpg"
                  alt={t("story.imageAlt")}
                  width={900}
                  height={1000}
                  className="h-[600px] w-full object-cover transition-transform duration-1000 hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#071f46]/80 via-transparent to-transparent" />

                <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl">

                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500">
                      <HeartHandshake className="h-6 w-6 text-white" />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-white">
                        {t("story.imageCard.title")}
                      </p>

                      <p className="mt-1 text-xs text-slate-300">
                        {t("story.imageCard.subtitle")}
                      </p>
                    </div>

                  </div>

                </div>

              </div>

              <div className="absolute -right-5 top-12 hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-xl transition-colors duration-300 dark:border-white/10 dark:bg-[#0d2d55] sm:block">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-400/10">
                    <Globe2 className="h-5 w-5 text-teal-600 dark:text-teal-300" />
                  </div>

                  <div>

                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {t("story.direction.label")}
                    </p>

                    <p className="font-bold text-[#071f46] dark:text-white">
                      {t("story.direction.value")}
                    </p>

                  </div>

                </div>

              </div>

            </div>

            <div>

              <span className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-300">
                {t("story.badge")}
              </span>

              <h2 className="mt-4 text-4xl font-bold leading-tight text-[#071f46] dark:text-white sm:text-5xl">
                {t("story.titleBefore")}
                <span className="text-teal-600 dark:text-teal-400">
                  {" "}
                  {t("story.titleHighlight")}
                </span>
                {t("story.titleAfter")}
              </h2>

              <p className="mt-7 text-lg leading-8 text-slate-600 dark:text-slate-300">
                {t("story.paragraph1")}
              </p>

              <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                {t("story.paragraph2")}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">

                {[
                  t("story.features.integrated"),
                  t("story.features.innovation"),
                  t("story.features.quality"),
                  t("story.features.longTerm"),
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:bg-teal-50 dark:border-white/10 dark:bg-[#0a274b] dark:hover:border-teal-400/30 dark:hover:bg-[#0d2d55]"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-600 dark:text-teal-400" />

                    <span className="text-sm font-semibold text-[#071f46] dark:text-white">
                      {item}
                    </span>
                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          SECTION 3 — THREE PILLARS
      ========================================================= */}

      <section className="relative overflow-hidden bg-slate-50 py-24 transition-colors duration-300 dark:bg-[#0a274b] sm:py-28">

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mx-auto mb-16 max-w-3xl text-center">

            <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-sm font-bold text-teal-700 dark:bg-teal-400/10 dark:text-teal-300">
              <Activity className="h-4 w-4" />
              {t("ecosystem.badge")}
            </span>

            <h2 className="mt-5 text-4xl font-bold text-[#071f46] dark:text-white sm:text-5xl">
              {t("ecosystem.titleLine1")}

              <span className="block text-teal-600 dark:text-teal-400">
                {t("ecosystem.titleLine2")}
              </span>
            </h2>

            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
              {t("ecosystem.description")}
            </p>

          </div>

          <div className="grid gap-7 lg:grid-cols-3">

            {/* HOSPITAL */}

            <Link
              href="/pillars/hospital"
              className="group relative overflow-hidden rounded-[2rem] bg-[#071f46] p-8 shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
            >

              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-teal-500/20 blur-3xl transition-transform duration-700 group-hover:scale-150" />

              <div className="relative">

                <div className="flex items-center justify-between">

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-teal-300 transition-all duration-500 group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-white">
                    <Hospital className="h-8 w-8" />
                  </div>

                  <span className="text-5xl font-black text-white/5">
                    01
                  </span>

                </div>

                <p className="mt-10 text-xs font-bold uppercase tracking-[0.25em] text-teal-300">
                  {t("pillars.hospital.label")}
                </p>

                <h3 className="mt-3 text-3xl font-bold text-white">
                  {t("pillars.hospital.title")}
                </h3>

                <p className="mt-5 leading-7 text-slate-300">
                  {t("pillars.hospital.description")}
                </p>

                <div className="mt-8 flex items-center gap-2 font-semibold text-teal-300">
                  {t("pillars.hospital.button")}

                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                </div>

              </div>

            </Link>

            {/* DIAGNOSIS */}

            <Link
              href="/pillars/diagnosis"
              className="group relative overflow-hidden rounded-[2rem] bg-white p-8 shadow-xl ring-1 ring-slate-200 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:ring-teal-200 dark:bg-[#0d2d55] dark:ring-white/10 dark:hover:bg-[#12356b] dark:hover:ring-teal-400/30"
            >

              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-teal-100 blur-3xl transition-transform duration-700 group-hover:scale-150 dark:bg-teal-500/10" />

              <div className="relative">

                <div className="flex items-center justify-between">

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 transition-all duration-500 group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-white dark:bg-teal-400/10 dark:text-teal-300">
                    <Microscope className="h-8 w-8" />
                  </div>

                  <span className="text-5xl font-black text-slate-100 dark:text-white/5">
                    02
                  </span>

                </div>

                <p className="mt-10 text-xs font-bold uppercase tracking-[0.25em] text-teal-600 dark:text-teal-300">
                  {t("pillars.diagnosis.label")}
                </p>

                <h3 className="mt-3 text-3xl font-bold text-[#071f46] dark:text-white">
                  {t("pillars.diagnosis.title")}
                </h3>

                <p className="mt-5 leading-7 text-slate-600 dark:text-slate-300">
                  {t("pillars.diagnosis.description")}
                </p>

                <div className="mt-8 flex items-center gap-2 font-semibold text-teal-600 dark:text-teal-300">
                  {t("pillars.diagnosis.button")}

                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                </div>

              </div>

            </Link>

            {/* MANUFACTURING */}

            <Link
              href="/pillars/manufacturing"
              className="group relative overflow-hidden rounded-[2rem] bg-white p-8 shadow-xl ring-1 ring-slate-200 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:ring-teal-200 dark:bg-[#0d2d55] dark:ring-white/10 dark:hover:bg-[#12356b] dark:hover:ring-teal-400/30"
            >

              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-100 blur-3xl transition-transform duration-700 group-hover:scale-150 dark:bg-blue-500/10" />

              <div className="relative">

                <div className="flex items-center justify-between">

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-[#12356b] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#12356b] group-hover:text-white dark:bg-blue-400/10 dark:text-blue-300">
                    <Factory className="h-8 w-8" />
                  </div>

                  <span className="text-5xl font-black text-slate-100 dark:text-white/5">
                    03
                  </span>

                </div>

                <p className="mt-10 text-xs font-bold uppercase tracking-[0.25em] text-[#12356b] dark:text-blue-300">
                  {t("pillars.manufacturing.label")}
                </p>

                <h3 className="mt-3 text-3xl font-bold text-[#071f46] dark:text-white">
                  {t("pillars.manufacturing.title")}
                </h3>

                <p className="mt-5 leading-7 text-slate-600 dark:text-slate-300">
                  {t("pillars.manufacturing.description")}
                </p>

                <div className="mt-8 flex items-center gap-2 font-semibold text-[#12356b] dark:text-blue-300">
                  {t("pillars.manufacturing.button")}

                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                </div>

              </div>

            </Link>

          </div>

        </div>

      </section>

      {/* =========================================================
          SECTION 4 — MISSION & VISION
      ========================================================= */}

      <section className="relative overflow-hidden bg-white py-24 transition-colors duration-300 dark:bg-[#071f46] sm:py-28">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid gap-8 lg:grid-cols-2">

            {/* MISSION */}

            <div className="group relative overflow-hidden rounded-[2rem] bg-[#071f46] p-9 shadow-xl sm:p-12">

              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal-500/15 blur-3xl transition-transform duration-700 group-hover:scale-125" />

              <div className="relative">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-500 text-white shadow-lg shadow-teal-900/30">
                  <Target className="h-8 w-8" />
                </div>

                <p className="mt-10 text-sm font-bold uppercase tracking-[0.25em] text-teal-300">
                  {t("mission.label")}
                </p>

                <h3 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                  {t("mission.title")}
                </h3>

                <p className="mt-6 leading-8 text-slate-300">
                  {t("mission.description")}
                </p>

              </div>

            </div>

            {/* VISION */}

            <div className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 p-9 shadow-xl transition-colors duration-300 dark:border-white/10 dark:bg-[#0a274b] sm:p-12">

              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal-100 blur-3xl transition-transform duration-700 group-hover:scale-125 dark:bg-teal-500/10" />

              <div className="relative">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-teal-600 shadow-lg dark:bg-[#0d2d55] dark:text-teal-300">
                  <Eye className="h-8 w-8" />
                </div>

                <p className="mt-10 text-sm font-bold uppercase tracking-[0.25em] text-teal-600 dark:text-teal-300">
                  {t("vision.label")}
                </p>

                <h3 className="mt-4 text-3xl font-bold text-[#071f46] dark:text-white sm:text-4xl">
                  {t("vision.title")}
                </h3>

                <p className="mt-6 leading-8 text-slate-600 dark:text-slate-300">
                  {t("vision.description")}
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          SECTION 5 — CORE VALUES
      ========================================================= */}

      <section className="relative overflow-hidden bg-[#071f46] py-24 sm:py-28">

        <div className="absolute left-[-200px] top-[-100px] h-[500px] w-[500px] rounded-full bg-teal-500/10 blur-3xl" />

        <div className="absolute bottom-[-200px] right-[-150px] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mb-16 max-w-3xl">

            <span className="text-sm font-bold uppercase tracking-[0.25em] text-teal-300">
              {t("valuesSection.badge")}
            </span>

            <h2 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
              {t("valuesSection.titleBefore")}

              <span className="text-teal-400">
                {" "}
                {t("valuesSection.titleHighlight")}
              </span>
            </h2>

            <p className="mt-5 max-w-2xl leading-8 text-slate-300">
              {t("valuesSection.description")}
            </p>

          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

            {values.map((value) => {

              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="group rounded-3xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-teal-400/30 hover:bg-white/[0.1]"
                >

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-400/10 text-teal-300 transition-all duration-500 group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-white">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {value.text}
                  </p>

                  <div className="mt-6 h-px w-10 bg-teal-500 transition-all duration-500 group-hover:w-full" />

                </div>
              );

            })}

          </div>

        </div>

      </section>

      {/* =========================================================
          SECTION 6 — CONNECTED HEALTHCARE
      ========================================================= */}

      <section className="relative overflow-hidden bg-white py-24 transition-colors duration-300 dark:bg-[#071f46] sm:py-28">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.9fr]">

            <div>

              <span className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-300">
                {t("connected.badge")}
              </span>

              <h2 className="mt-4 text-4xl font-bold leading-tight text-[#071f46] dark:text-white sm:text-5xl">
                {t("connected.titleBefore")}

                <span className="text-teal-600 dark:text-teal-400">
                  {" "}
                  {t("connected.titleHighlight")}
                </span>
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
                {t("connected.description")}
              </p>

              <div className="mt-10 space-y-5">

                {capabilities.map((item, index) => (

                  <div
                    key={item.title}
                    className="group flex gap-5 rounded-2xl border border-slate-200 p-5 transition-all duration-300 hover:-translate-x-2 hover:border-teal-200 hover:bg-teal-50 dark:border-white/10 dark:hover:border-teal-400/30 dark:hover:bg-[#0d2d55]"
                  >

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#071f46] text-sm font-bold text-white transition-colors group-hover:bg-teal-600">
                      0{index + 1}
                    </div>

                    <div>

                      <h3 className="font-bold text-[#071f46] dark:text-white">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                        {item.text}
                      </p>

                    </div>

                    <ChevronRight className="ml-auto mt-2 h-5 w-5 shrink-0 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-teal-600 dark:text-slate-500" />

                  </div>

                ))}

              </div>

            </div>

            <div className="relative">

              <div className="relative mx-auto max-w-[500px]">

                <div className="relative aspect-square rounded-full bg-gradient-to-br from-[#071f46] to-[#12356b] p-10 shadow-2xl">

                  <div className="absolute inset-10 rounded-full border border-white/10" />

                  <div className="absolute inset-20 rounded-full border border-teal-400/20" />

                  <div className="relative flex h-full flex-col items-center justify-center text-center">

                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-teal-500 shadow-xl shadow-teal-900/30">
                      <Building2 className="h-10 w-10 text-white" />
                    </div>

                    <h3 className="mt-7 text-3xl font-bold text-white">
                      Afilas Group
                    </h3>

                    <p className="mt-3 max-w-xs text-sm leading-6 text-slate-300">
                      {t("connected.circleDescription")}
                    </p>

                  </div>

                </div>

                <div className="absolute -left-4 top-10 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl transition-colors duration-300 dark:border-white/10 dark:bg-[#0d2d55] sm:-left-8">

                  <div className="flex items-center gap-3">

                    <Hospital className="h-5 w-5 text-teal-600 dark:text-teal-300" />

                    <span className="text-sm font-bold text-[#071f46] dark:text-white">
                      {t("connected.cards.healthcare")}
                    </span>

                  </div>

                </div>

                <div className="absolute -right-4 top-1/2 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl transition-colors duration-300 dark:border-white/10 dark:bg-[#0d2d55] sm:-right-8">

                  <div className="flex items-center gap-3">

                    <Microscope className="h-5 w-5 text-teal-600 dark:text-teal-300" />

                    <span className="text-sm font-bold text-[#071f46] dark:text-white">
                      {t("connected.cards.diagnostics")}
                    </span>

                  </div>

                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl transition-colors duration-300 dark:border-white/10 dark:bg-[#0d2d55]">

                  <div className="flex items-center gap-3">

                    <Factory className="h-5 w-5 text-[#12356b] dark:text-blue-300" />

                    <span className="text-sm font-bold text-[#071f46] dark:text-white">
                      {t("connected.cards.manufacturing")}
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          SECTION 7 — FUTURE DIRECTION
      ========================================================= */}

      <section className="relative overflow-hidden bg-slate-50 py-24 transition-colors duration-300 dark:bg-[#0a274b] sm:py-28">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#071f46] px-8 py-16 shadow-2xl sm:px-14 lg:px-20">

            <div className="absolute right-[-100px] top-[-150px] h-[450px] w-[450px] rounded-full bg-teal-500/15 blur-3xl" />

            <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_0.7fr]">

              <div>

                <span className="inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/10 px-4 py-2 text-sm font-semibold text-teal-300">
                  <Sparkles className="h-4 w-4" />
                  {t("future.badge")}
                </span>

                <h2 className="mt-6 text-4xl font-bold text-white sm:text-5xl">
                  {t("future.titleBefore")}

                  <span className="text-teal-400">
                    {" "}
                    {t("future.titleHighlight")}
                  </span>
                </h2>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                  {t("future.description")}
                </p>

                <div className="mt-9 flex flex-col gap-4 sm:flex-row">

                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-3 rounded-full bg-teal-500 px-7 py-4 font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-teal-400"
                  >
                    {t("future.contactButton")}

                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/5 px-7 py-4 font-bold text-white transition-all duration-300 hover:bg-white/10"
                  >
                    {t("future.exploreButton")}
                  </Link>

                </div>

              </div>

              <div className="relative">

                <div className="grid grid-cols-2 gap-4">

                  {futureItems.map((item) => {

                    const Icon = item.icon;

                    return (
                      <div
                        key={item.title}
                        className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white/10"
                      >

                        <Icon className="h-7 w-7 text-teal-400 transition-transform duration-300 group-hover:scale-110" />

                        <p className="mt-5 font-bold text-white">
                          {item.title}
                        </p>

                      </div>
                    );

                  })}

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          SECTION 8 — FINAL CTA
      ========================================================= */}

      <section className="relative overflow-hidden bg-white py-24 transition-colors duration-300 dark:bg-[#071f46] sm:py-28">

        <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 dark:bg-teal-400/10 dark:text-teal-300">
            <HeartHandshake className="h-8 w-8" />
          </div>

          <p className="mt-7 text-sm font-bold uppercase tracking-[0.25em] text-teal-600 dark:text-teal-300">
            {t("cta.badge")}
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#071f46] dark:text-white sm:text-5xl lg:text-6xl">
            {t("cta.titleBefore")}

            <span className="text-teal-600 dark:text-teal-400">
              {" "}
              {t("cta.titleHighlight")}
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            {t("cta.description")}
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              href="/pillars/hospital"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#071f46] px-7 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#12356b]"
            >
              {t("cta.healthcareButton")}

              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-7 py-4 font-bold text-[#071f46] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:text-teal-600 dark:border-white/10 dark:bg-[#0d2d55] dark:text-white dark:hover:border-teal-400 dark:hover:text-teal-300"
            >
              {t("cta.contactButton")}
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}