"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Factory,
  HeartHandshake,
  Hospital,
  Mail,
  MapPin,
  MessageCircle,
  Microscope,
  Phone,
  Send,
  Sparkles,
  Users,
} from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("Contact");

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [inquiryType, setInquiryType] = useState("General Inquiry");

  const faqs = [
    {
      question: t("faq.items.contact.question"),
      answer: t("faq.items.contact.answer"),
    },
    {
      question: t("faq.items.appointment.question"),
      answer: t("faq.items.appointment.answer"),
    },
    {
      question: t("faq.items.diagnosis.question"),
      answer: t("faq.items.diagnosis.answer"),
    },
    {
      question: t("faq.items.manufacturing.question"),
      answer: t("faq.items.manufacturing.answer"),
    },
  ];

  const contactAreas = [
    {
      icon: Hospital,
      title: t("areas.hospital.title"),
      description: t("areas.hospital.description"),
      href: "/pillars/hospital",
      label: t("areas.hospital.label"),
    },
    {
      icon: Microscope,
      title: t("areas.diagnosis.title"),
      description: t("areas.diagnosis.description"),
      href: "/pillars/diagnosis",
      label: t("areas.diagnosis.label"),
    },
    {
      icon: Factory,
      title: t("areas.manufacturing.title"),
      description: t("areas.manufacturing.description"),
      href: "/pillars/manufacturing",
      label: t("areas.manufacturing.label"),
    },
  ];

  return (
    <main className="bg-white text-[#071f46] transition-colors duration-300 dark:bg-[#071f46] dark:text-white">

      {/* =========================================================
          SECTION 1 — HERO
      ========================================================= */}

      <section className="relative isolate overflow-hidden bg-[#071f46]">

        {/* HERO BACKGROUND */}

        <div className="absolute inset-0">

          <Image
            src="/images/contact/contact-hero.jpg"
            alt={t("hero.imageAlt")}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-[#071f46]/0" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#071f46]/45 via-[#071f46]/10 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#071f46]/20 to-transparent" />

          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#18a999]/5 blur-3xl" />

          <div className="absolute -bottom-40 right-0 h-[30rem] w-[30rem] rounded-full bg-[#18a999]/5 blur-3xl" />

          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">

          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">

            {/* LEFT */}

            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-[#6ee7d8] backdrop-blur-md">
                <MessageCircle className="h-4 w-4" />
                {t("hero.badge")}
              </div>

              <h1 className="mt-7 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">

                {t("hero.titleBefore")}

                <span className="block text-[#18a999]">
                  {t("hero.titleHighlight")}
                </span>

              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
                {t("hero.description")}
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">

                <a
                  href="#contact-form"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#18a999] px-7 py-4 font-semibold text-white shadow-xl shadow-[#18a999]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#20bbaa]"
                >
                  {t("hero.sendButton")}

                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>

                <Link
                  href="/appointment"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/15"
                >
                  <CalendarDays className="h-5 w-5" />
                  {t("hero.appointmentButton")}
                </Link>

              </div>

              {/* TRUST POINTS */}

              <div className="mt-12 grid gap-5 sm:grid-cols-3">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    <HeartHandshake className="h-5 w-5 text-[#5eead4]" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      {t("hero.trust.patient.title")}
                    </p>

                    <p className="text-xs text-white/45">
                      {t("hero.trust.patient.description")}
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    <Users className="h-5 w-5 text-[#5eead4]" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      {t("hero.trust.professional.title")}
                    </p>

                    <p className="text-xs text-white/45">
                      {t("hero.trust.professional.description")}
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    <CheckCircle2 className="h-5 w-5 text-[#5eead4]" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      {t("hero.trust.connected.title")}
                    </p>

                    <p className="text-xs text-white/45">
                      {t("hero.trust.connected.description")}
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT GLASS CARD */}

            <div className="relative">

              <div className="absolute -inset-5 rounded-[2rem] bg-[#18a999]/10 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.08] p-7 shadow-2xl backdrop-blur-xl sm:p-9">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#5eead4]">
                      Afilas Group
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-white">
                      {t("hero.card.title")}
                    </h2>

                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#18a999] shadow-lg shadow-[#18a999]/20">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>

                </div>

                <p className="mt-5 leading-7 text-white/60">
                  {t("hero.card.description")}
                </p>

                <div className="mt-7 space-y-3">

                  {[
                    [t("hero.card.divisions.hospital"), Hospital],
                    [t("hero.card.divisions.diagnosis"), Microscope],
                    [t("hero.card.divisions.manufacturing"), Factory],
                  ].map(([label, Icon], index) => {

                    const IconComponent = Icon as typeof Hospital;

                    return (
                      <div
                        key={index}
                        className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-[#18a999]/40 hover:bg-white/10"
                      >

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#18a999]/10">
                          <IconComponent className="h-5 w-5 text-[#5eead4]" />
                        </div>

                        <div className="flex-1">

                          <p className="font-semibold text-white">
                            {label}
                          </p>

                          <p className="mt-1 text-xs text-white/40">
                            {t("hero.card.divisionLabel")}
                          </p>

                        </div>

                        <ArrowRight className="h-4 w-4 text-white/30 transition group-hover:translate-x-1 group-hover:text-[#5eead4]" />

                      </div>
                    );
                  })}

                </div>

                <div className="mt-7 rounded-2xl border border-[#18a999]/20 bg-[#18a999]/10 p-5">

                  <p className="text-sm font-semibold text-[#5eead4]">
                    {t("hero.card.question.title")}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-white/55">
                    {t("hero.card.question.description")}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          SECTION 2 — CONTACT AREAS
      ========================================================= */}

      <section className="relative overflow-hidden bg-slate-50 py-24 transition-colors duration-300 dark:bg-[#0a274b] sm:py-28">

        <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-[#18a999]/5 blur-3xl dark:bg-[#18a999]/10" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">

            <span className="inline-flex items-center gap-2 rounded-full bg-[#18a999]/10 px-4 py-2 text-sm font-semibold text-[#128f83] dark:text-[#5eead4]">
              <Building2 className="h-4 w-4" />
              {t("areasSection.badge")}
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-tight text-[#071f46] dark:text-white sm:text-4xl lg:text-5xl">

              {t("areasSection.titleBefore")}

              <span className="block text-[#18a999]">
                {t("areasSection.titleHighlight")}
              </span>

            </h2>

            <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
              {t("areasSection.description")}
            </p>

          </div>


          <div className="mt-16 grid gap-6 lg:grid-cols-3">

            {contactAreas.map((item, index) => {

              const Icon = item.icon;

              return (
                <Link
                  href={item.href}
                  key={item.title}
                  className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:border-[#18a999]/30 hover:shadow-2xl dark:border-white/10 dark:bg-[#0d2d55] dark:hover:border-[#18a999]/40 dark:hover:bg-[#12356b]"
                >

                  {/* Number */}

                  <div className="absolute right-6 top-4 text-7xl font-black text-slate-100 transition duration-500 group-hover:text-[#18a999]/10 dark:text-white/[0.04] dark:group-hover:text-[#18a999]/10">
                    0{index + 1}
                  </div>

                  <div className="relative">

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#18a999]/10 transition-all duration-500 group-hover:rotate-3 group-hover:bg-[#18a999]">
                      <Icon className="h-8 w-8 text-[#18a999] transition-colors duration-500 group-hover:text-white" />
                    </div>

                    <h3 className="mt-7 text-2xl font-bold text-[#071f46] dark:text-white">
                      {item.title}
                    </h3>

                    <p className="mt-4 min-h-[84px] leading-7 text-slate-600 dark:text-slate-300">
                      {item.description}
                    </p>

                    <div className="mt-7 inline-flex items-center gap-2 font-semibold text-[#18a999] dark:text-[#5eead4]">
                      {item.label}

                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>

                  </div>

                </Link>
              );
            })}

          </div>

        </div>

      </section>


      {/* =========================================================
          SECTION 3 — MAIN CONTACT FORM
      ========================================================= */}

      <section
        id="contact-form"
        className="relative overflow-hidden bg-gradient-to-br from-[#041936] via-[#071f46] to-[#0a3158] py-24 sm:py-28"
      >

        {/* Decorative background glow */}

        <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-[#18a999]/10 blur-[120px]" />

        <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-blue-400/10 blur-[120px]" />

        {/* Decorative circles */}

        <div className="pointer-events-none absolute right-[8%] top-20 h-32 w-32 rounded-full border border-white/5" />

        <div className="pointer-events-none absolute right-[10%] top-24 h-20 w-20 rounded-full border border-[#18a999]/10" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid items-start gap-14 lg:grid-cols-[0.85fr_1.15fr]">

            {/* LEFT INFORMATION */}

            <div className="lg:sticky lg:top-28 lg:self-start">

              <span className="inline-flex items-center gap-2 rounded-full border border-[#18a999]/30 bg-[#18a999]/10 px-4 py-2 text-sm font-semibold text-[#5eead4] backdrop-blur-sm">
                <Send className="h-4 w-4" />
                {t("formSection.badge")}
              </span>

              <h2 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-[3.4rem]">

                {t("formSection.titleBefore")}

                <span className="block text-[#35d0bd]">
                  {t("formSection.titleHighlight")}
                </span>

              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                {t("formSection.description")}
              </p>


              {/* INFORMATION CARDS */}

              <div className="mt-10 space-y-4">

                {/* Card 1 */}

                <div className="group rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#18a999]/40 hover:bg-white/[0.09]">

                  <div className="flex gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#18a999]/15 transition-transform duration-300 group-hover:scale-110">
                      <MessageCircle className="h-5 w-5 text-[#35d0bd]" />
                    </div>

                    <div>

                      <h3 className="font-bold text-white">
                        {t("formSection.info.clear.title")}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        {t("formSection.info.clear.description")}
                      </p>

                    </div>

                  </div>

                </div>


                {/* Card 2 */}

                <div className="group rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#18a999]/40 hover:bg-white/[0.09]">

                  <div className="flex gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#18a999]/15 transition-transform duration-300 group-hover:scale-110">
                      <HeartHandshake className="h-5 w-5 text-[#35d0bd]" />
                    </div>

                    <div>

                      <h3 className="font-bold text-white">
                        {t("formSection.info.people.title")}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        {t("formSection.info.people.description")}
                      </p>

                    </div>

                  </div>

                </div>


                {/* Card 3 */}

                <div className="group rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#18a999]/40 hover:bg-white/[0.09]">

                  <div className="flex gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#18a999]/15 transition-transform duration-300 group-hover:scale-110">
                      <Building2 className="h-5 w-5 text-[#35d0bd]" />
                    </div>

                    <div>

                      <h3 className="font-bold text-white">
                        {t("formSection.info.connected.title")}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        {t("formSection.info.connected.description")}
                      </p>

                    </div>

                  </div>

                </div>

              </div>


              {/* Response message */}

              <div className="mt-8 flex items-center gap-3 text-sm text-slate-400">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#18a999]/10">
                  <CheckCircle2 className="h-4 w-4 text-[#35d0bd]" />
                </div>

                <span>
                  {t("formSection.responseMessage")}
                </span>

              </div>

            </div>


            {/* FORM */}

            <div className="relative">

              {/* Glow behind form */}

              <div className="absolute -inset-5 rounded-[2.5rem] bg-[#18a999]/10 blur-3xl" />


              {/* Form card */}

              <form
                onSubmit={(e) => e.preventDefault()}
                className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_30px_100px_-25px_rgba(0,0,0,0.45)] transition-colors duration-300 dark:border-white/10 dark:bg-[#0d2d55] sm:p-9 lg:p-10"
              >

                {/* Top accent */}

                <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-[#18a999] via-[#35d0bd] to-[#12356b]" />


                {/* Form heading */}

                <div className="mb-8">

                  <span className="inline-flex rounded-full bg-[#18a999]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#18a999] dark:text-[#5eead4]">
                    {t("form.title")}
                  </span>

                  <h3 className="mt-3 text-2xl font-bold text-[#071f46] dark:text-white sm:text-3xl">
                    {t("form.heading")}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {t("form.description")}
                  </p>

                </div>


                {/* FORM FIELDS */}

                <div className="grid gap-6 sm:grid-cols-2">


                  {/* Name */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-[#071f46] dark:text-white">
                      {t("form.fields.name.label")}
                    </label>

                    <input
                      type="text"
                      placeholder={t("form.fields.name.placeholder")}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-[#071f46] outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#18a999] focus:bg-white focus:ring-4 focus:ring-[#18a999]/10 dark:border-white/10 dark:bg-[#071f46] dark:text-white dark:placeholder:text-slate-500 dark:hover:border-white/20 dark:focus:border-[#35d0bd] dark:focus:bg-[#0a274b] dark:focus:ring-[#18a999]/10"
                    />

                  </div>


                  {/* Email */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-[#071f46] dark:text-white">
                      {t("form.fields.email.label")}
                    </label>

                    <input
                      type="email"
                      placeholder={t("form.fields.email.placeholder")}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-[#071f46] outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#18a999] focus:bg-white focus:ring-4 focus:ring-[#18a999]/10 dark:border-white/10 dark:bg-[#071f46] dark:text-white dark:placeholder:text-slate-500 dark:hover:border-white/20 dark:focus:border-[#35d0bd] dark:focus:bg-[#0a274b] dark:focus:ring-[#18a999]/10"
                    />

                  </div>


                  {/* Phone */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-[#071f46] dark:text-white">
                      {t("form.fields.phone.label")}
                    </label>

                    <input
                      type="tel"
                      placeholder={t("form.fields.phone.placeholder")}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-[#071f46] outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#18a999] focus:bg-white focus:ring-4 focus:ring-[#18a999]/10 dark:border-white/10 dark:bg-[#071f46] dark:text-white dark:placeholder:text-slate-500 dark:hover:border-white/20 dark:focus:border-[#35d0bd] dark:focus:bg-[#0a274b] dark:focus:ring-[#18a999]/10"
                    />

                  </div>


                  {/* Inquiry */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-[#071f46] dark:text-white">
                      {t("form.fields.inquiry.label")}
                    </label>

                    <div className="relative">

                      <select
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-[#071f46] outline-none transition-all duration-200 hover:border-slate-300 focus:border-[#18a999] focus:bg-white focus:ring-4 focus:ring-[#18a999]/10 dark:border-white/10 dark:bg-[#071f46] dark:text-white dark:hover:border-white/20 dark:focus:border-[#35d0bd] dark:focus:bg-[#0a274b] dark:focus:ring-[#18a999]/10"
                      >

                        <option value="General Inquiry">
                          {t("form.fields.inquiry.options.general")}
                        </option>

                        <option value="General Hospital">
                          {t("form.fields.inquiry.options.hospital")}
                        </option>

                        <option value="Diagnosis Center">
                          {t("form.fields.inquiry.options.diagnosis")}
                        </option>

                        <option value="Drug Manufacturing">
                          {t("form.fields.inquiry.options.manufacturing")}
                        </option>

                        <option value="Partnership">
                          {t("form.fields.inquiry.options.partnership")}
                        </option>

                        <option value="Career">
                          {t("form.fields.inquiry.options.career")}
                        </option>

                      </select>

                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    </div>

                  </div>


                  {/* Subject */}

                  <div className="sm:col-span-2">

                    <label className="mb-2 block text-sm font-semibold text-[#071f46] dark:text-white">
                      {t("form.fields.subject.label")}
                    </label>

                    <input
                      type="text"
                      placeholder={t("form.fields.subject.placeholder")}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-[#071f46] outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#18a999] focus:bg-white focus:ring-4 focus:ring-[#18a999]/10 dark:border-white/10 dark:bg-[#071f46] dark:text-white dark:placeholder:text-slate-500 dark:hover:border-white/20 dark:focus:border-[#35d0bd] dark:focus:bg-[#0a274b] dark:focus:ring-[#18a999]/10"
                    />

                  </div>


                  {/* Message */}

                  <div className="sm:col-span-2">

                    <label className="mb-2 block text-sm font-semibold text-[#071f46] dark:text-white">
                      {t("form.fields.message.label")}
                    </label>

                    <textarea
                      rows={7}
                      placeholder={t("form.fields.message.placeholder")}
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-[#071f46] outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#18a999] focus:bg-white focus:ring-4 focus:ring-[#18a999]/10 dark:border-white/10 dark:bg-[#071f46] dark:text-white dark:placeholder:text-slate-500 dark:hover:border-white/20 dark:focus:border-[#35d0bd] dark:focus:bg-[#0a274b] dark:focus:ring-[#18a999]/10"
                    />

                  </div>

                </div>


                {/* SELECTED INQUIRY */}

                <div className="mt-6 rounded-xl border border-[#18a999]/20 bg-[#18a999]/5 p-4 dark:bg-[#18a999]/10">

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#18a999]/10">
                      <CheckCircle2 className="h-4 w-4 text-[#18a999] dark:text-[#5eead4]" />
                    </div>

                    <p className="text-sm text-slate-600 dark:text-slate-300">

                      {t("form.selectedInquiry.before")}

                      {" "}

                      <span className="font-bold text-[#071f46] dark:text-white">
                        {t(
                          `form.fields.inquiry.display.${inquiryType
                            .toLowerCase()
                            .replaceAll(" ", "_")}`
                        )}
                      </span>

                      {" "}

                      {t("form.selectedInquiry.after")}

                    </p>

                  </div>

                </div>


                {/* BUTTON */}

                <button
                  type="submit"
                  className="group mt-7 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#071f46] px-6 py-4 font-semibold text-white shadow-lg shadow-[#071f46]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#12356b] hover:shadow-xl dark:bg-[#18a999] dark:shadow-[#18a999]/20 dark:hover:bg-[#20bbaa]"
                >

                  <span>
                    {t("form.submit")}
                  </span>

                  <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />

                </button>


                {/* Privacy / response note */}

                <div className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-slate-400 dark:text-slate-500">

                  <CheckCircle2 className="h-3.5 w-3.5 text-[#18a999] dark:text-[#5eead4]" />

                  <span>
                    {t("form.reviewNote")}
                  </span>

                </div>

              </form>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          SECTION 4 — WHY CONTACT US
      ========================================================= */}

      <section className="relative overflow-hidden bg-[#071f46] py-24 sm:py-28">

        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#18a999]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">

            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-[#5eead4]">
              <HeartHandshake className="h-4 w-4" />
              {t("why.badge")}
            </span>

            <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              {t("why.title")}
            </h2>

            <p className="mt-6 text-base leading-8 text-white/55 sm:text-lg">
              {t("why.description")}
            </p>

          </div>


          <div className="mt-16 grid gap-5 md:grid-cols-3">

            {[
              {
                icon: MessageCircle,
                title: t("why.cards.conversation.title"),
                text: t("why.cards.conversation.text"),
              },
              {
                icon: Users,
                title: t("why.cards.direction.title"),
                text: t("why.cards.direction.text"),
              },
              {
                icon: HeartHandshake,
                title: t("why.cards.connections.title"),
                text: t("why.cards.connections.text"),
              },
            ].map((item) => {

              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[#18a999]/30 hover:bg-white/[0.08]"
                >

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#18a999]/10 transition duration-500 group-hover:bg-[#18a999]">
                    <Icon className="h-7 w-7 text-[#5eead4] transition group-hover:text-white" />
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-7 text-white/50">
                    {item.text}
                  </p>

                </div>
              );
            })}

          </div>

        </div>

      </section>


      {/* =========================================================
          SECTION 5 — CONTACT INFORMATION
      ========================================================= */}

      <section className="relative overflow-hidden bg-slate-50 py-24 transition-colors duration-300 dark:bg-[#0a274b] sm:py-28">

        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#18a999]/5 blur-3xl dark:bg-[#18a999]/10" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid gap-8 lg:grid-cols-2">

            {/* INFORMATION */}

            <div className="rounded-[2rem] border border-transparent bg-white p-8 shadow-sm transition-all duration-300 dark:border-white/10 dark:bg-[#0d2d55] sm:p-10">

              <span className="inline-flex items-center gap-2 rounded-full bg-[#18a999]/10 px-4 py-2 text-sm font-semibold text-[#128f83] dark:text-[#5eead4]">
                <Building2 className="h-4 w-4" />
                {t("information.badge")}
              </span>

              <h2 className="mt-5 text-3xl font-bold text-[#071f46] dark:text-white sm:text-4xl">

                {t("information.titleBefore")}

                <span className="block text-[#18a999]">
                  {t("information.titleHighlight")}
                </span>

              </h2>

              <p className="mt-5 leading-7 text-slate-600 dark:text-slate-300">
                {t("information.description")}
              </p>


              <div className="mt-8 space-y-4">

                {/* EMAIL */}

                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5 transition-all duration-300 hover:border-[#18a999]/30 hover:bg-[#18a999]/5 dark:border-white/10 dark:hover:border-[#18a999]/30 dark:hover:bg-[#071f46]">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#18a999]/10">
                    <Mail className="h-5 w-5 text-[#18a999] dark:text-[#5eead4]" />
                  </div>

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      {t("information.email.label")}
                    </p>

                    <p className="mt-1 font-semibold text-[#071f46] dark:text-white">
                      {t("information.email.value")}
                    </p>

                  </div>

                </div>


                {/* PHONE */}

                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5 transition-all duration-300 hover:border-[#18a999]/30 hover:bg-[#18a999]/5 dark:border-white/10 dark:hover:border-[#18a999]/30 dark:hover:bg-[#071f46]">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#18a999]/10">
                    <Phone className="h-5 w-5 text-[#18a999] dark:text-[#5eead4]" />
                  </div>

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      {t("information.phone.label")}
                    </p>

                    <p className="mt-1 font-semibold text-[#071f46] dark:text-white">
                      {t("information.phone.value")}
                    </p>

                  </div>

                </div>


                {/* LOCATION */}

                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5 transition-all duration-300 hover:border-[#18a999]/30 hover:bg-[#18a999]/5 dark:border-white/10 dark:hover:border-[#18a999]/30 dark:hover:bg-[#071f46]">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#18a999]/10">
                    <MapPin className="h-5 w-5 text-[#18a999] dark:text-[#5eead4]" />
                  </div>

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      {t("information.location.label")}
                    </p>

                    <p className="mt-1 font-semibold text-[#071f46] dark:text-white">
                      {t("information.location.value")}
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* MAP / LOCATION VISUAL */}

            <div className="relative min-h-[460px] overflow-hidden rounded-[2rem] bg-[#071f46] p-8 shadow-xl sm:p-10">

              {/* Grid */}

              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                  backgroundSize: "42px 42px",
                }}
              />

              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#18a999]/20 blur-3xl" />


              {/* Center visual */}

              <div className="relative flex h-full min-h-[390px] items-center justify-center">

                <div className="absolute h-72 w-72 rounded-full border border-[#18a999]/20" />

                <div className="absolute h-52 w-52 rounded-full border border-[#18a999]/20" />

                <div className="absolute h-32 w-32 rounded-full border border-[#18a999]/30" />

                <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-[#18a999] shadow-2xl shadow-[#18a999]/30">
                  <MapPin className="h-10 w-10 text-white" />
                </div>


                {/* Hospital */}

                <div className="absolute left-8 top-16 rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md">

                  <div className="flex items-center gap-2">

                    <Hospital className="h-4 w-4 text-[#5eead4]" />

                    <span className="text-xs font-semibold text-white">
                      {t("information.map.hospital")}
                    </span>

                  </div>

                </div>


                {/* Diagnostics */}

                <div className="absolute bottom-16 right-8 rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md">

                  <div className="flex items-center gap-2">

                    <Microscope className="h-4 w-4 text-[#5eead4]" />

                    <span className="text-xs font-semibold text-white">
                      {t("information.map.diagnostics")}
                    </span>

                  </div>

                </div>


                {/* Manufacturing */}

                <div className="absolute right-6 top-20 rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md">

                  <div className="flex items-center gap-2">

                    <Factory className="h-4 w-4 text-[#5eead4]" />

                    <span className="text-xs font-semibold text-white">
                      {t("information.map.manufacturing")}
                    </span>

                  </div>

                </div>


                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">

                  <p className="text-sm font-semibold text-white">
                    Afilas Group
                  </p>

                  <p className="mt-1 text-xs text-white/40">
                    {t("information.map.subtitle")}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          SECTION 6 — FAQ
      ========================================================= */}

      <section className="bg-white py-24 transition-colors duration-300 dark:bg-[#071f46] sm:py-28">

        <div className="mx-auto max-w-4xl px-6 lg:px-8">

          <div className="text-center">

            <span className="inline-flex items-center gap-2 rounded-full bg-[#18a999]/10 px-4 py-2 text-sm font-semibold text-[#128f83] dark:text-[#5eead4]">
              <MessageCircle className="h-4 w-4" />
              {t("faq.badge")}
            </span>

            <h2 className="mt-5 text-3xl font-bold text-[#071f46] dark:text-white sm:text-4xl lg:text-5xl">
              {t("faq.title")}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">
              {t("faq.description")}
            </p>

          </div>


          <div className="mt-12 space-y-4">

            {faqs.map((faq, index) => {

              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-[#18a999]/30 bg-[#18a999]/5 shadow-sm dark:bg-[#0d2d55]"
                      : "border-slate-200 bg-white dark:border-white/10 dark:bg-[#0d2d55]"
                  }`}
                >

                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                  >

                    <span className="font-semibold text-[#071f46] dark:text-white">
                      {faq.question}
                    </span>

                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? "rotate-180 bg-[#18a999] text-white"
                          : "bg-slate-100 text-slate-500 dark:bg-[#071f46] dark:text-slate-400"
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>

                  </button>


                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }`}
                  >

                    <div className="overflow-hidden">

                      <p className="px-6 pb-6 leading-7 text-slate-600 dark:text-slate-300">
                        {faq.answer}
                      </p>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </section>


      {/* =========================================================
          SECTION 7 — FINAL CTA
      ========================================================= */}

      <section className="relative overflow-hidden bg-[#071f46] py-24 sm:py-28">

        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#18a999]/15 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-8">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#18a999] shadow-xl shadow-[#18a999]/20">
            <HeartHandshake className="h-8 w-8 text-white" />
          </div>

          <p className="mt-7 text-sm font-semibold uppercase tracking-[0.2em] text-[#5eead4]">
            {t("cta.badge")}
          </p>

          <h2 className="mt-5 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">

            {t("cta.titleBefore")}

            <span className="block text-[#18a999]">
              {t("cta.titleHighlight")}
            </span>

          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/55">
            {t("cta.description")}
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

            <a
              href="#contact-form"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#18a999] px-8 py-4 font-semibold text-white shadow-xl shadow-[#18a999]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#20bbaa]"
            >
              {t("cta.contactButton")}

              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-white/10"
            >
              {t("cta.aboutButton")}
            </Link>

          </div>


          <div className="mx-auto mt-12 grid max-w-2xl gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">

            <div className="flex items-center justify-center gap-2 text-sm text-white/50">
              <CheckCircle2 className="h-4 w-4 text-[#5eead4]" />
              {t("cta.features.healthcare")}
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-white/50">
              <CheckCircle2 className="h-4 w-4 text-[#5eead4]" />
              {t("cta.features.connected")}
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-white/50">
              <CheckCircle2 className="h-4 w-4 text-[#5eead4]" />
              {t("cta.features.future")}
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}