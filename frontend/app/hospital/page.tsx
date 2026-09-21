"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
  Microscope,
  Baby,
  Activity,
  Bone,
  UserRound,
  Ambulance,
  Bed,
  ClipboardCheck,
  FlaskConical,
  Pill,
  Star,
  GraduationCap,
} from "lucide-react";

const departments = [
  {
    title: "Internal Medicine",
    description:
      "Comprehensive diagnosis and treatment for adult health conditions.",
    icon: Stethoscope,
    gradient: "from-teal-500 to-emerald-600",
  },
  {
    title: "Surgery",
    description:
      "Professional surgical care supported by patient-focused services.",
    icon: Syringe,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    title: "Pediatrics",
    description:
      "Compassionate healthcare designed for infants, children, and adolescents.",
    icon: Baby,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    title: "Gynecology & Obstetrics",
    description:
      "Women's health and maternity care throughout important life stages.",
    icon: HeartPulse,
    gradient: "from-purple-500 to-fuchsia-600",
  },
  {
    title: "Cardiology",
    description:
      "Heart health assessment, consultation, and ongoing medical support.",
    icon: Activity,
    gradient: "from-red-500 to-orange-500",
  },
  {
    title: "Orthopedics",
    description:
      "Care focused on bones, joints, muscles, and movement.",
    icon: Bone,
    gradient: "from-amber-500 to-yellow-600",
  },
];

const medicalServices = [
  {
    title: "Outpatient Care",
    description:
      "Professional consultations, diagnosis, treatment, and follow-up care without hospital admission.",
    icon: Stethoscope,
    gradient: "from-teal-500 to-emerald-600",
    bg: "bg-teal-50",
    iconColor: "text-teal-600",
  },
  {
    title: "Inpatient Care",
    description:
      "Comfortable hospital admission and continuous medical support for patients who need extended care.",
    icon: Bed,
    gradient: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "Emergency Care",
    description:
      "Rapid medical attention for urgent health conditions and emergency situations.",
    icon: Ambulance,
    gradient: "from-red-500 to-rose-600",
    bg: "bg-red-50",
    iconColor: "text-red-600",
  },
  {
    title: "Medical Consultation",
    description:
      "Expert medical advice, health assessments, and personalized treatment recommendations.",
    icon: ClipboardCheck,
    gradient: "from-purple-500 to-fuchsia-600",
    bg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    title: "Laboratory Services",
    description:
      "Reliable laboratory testing to support accurate diagnosis and effective treatment.",
    icon: FlaskConical,
    gradient: "from-orange-500 to-amber-600",
    bg: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    title: "Pharmacy Services",
    description:
      "Access to prescribed medicines and professional medication-related support.",
    icon: Pill,
    gradient: "from-cyan-500 to-blue-600",
    bg: "bg-cyan-50",
    iconColor: "text-cyan-600",
  },
];

const doctors = [
  {
    name: "Dr. Abebe Kebede",
    specialization: "Internal Medicine Specialist",
    experience: "10+ Years Experience",
    description:
      "Experienced in adult healthcare, diagnosis, and long-term disease management.",
    image: "/images/hospital/doctors/doctor-1.jpg",
    department: "Internal Medicine",
    gradient: "from-teal-500 to-emerald-600",
  },
  {
    name: "Dr. Hana Tesfaye",
    specialization: "Pediatrician",
    experience: "8+ Years Experience",
    description:
      "Dedicated to providing compassionate healthcare for children and families.",
    image: "/images/hospital/doctors/doctor-2.jpg",
    department: "Pediatrics",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    name: "Dr. Dawit Alemu",
    specialization: "Cardiologist",
    experience: "12+ Years Experience",
    description:
      "Focused on cardiovascular assessment, prevention, and treatment.",
    image: "/images/hospital/doctors/doctor-3.jpg",
    department: "Cardiology",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    name: "Dr. Selamawit Mekonnen",
    specialization: "Gynecologist & Obstetrician",
    experience: "9+ Years Experience",
    description:
      "Providing women's healthcare, maternity services, and professional support.",
    image: "/images/hospital/doctors/doctor-4.jpg",
    department: "Gynecology & Obstetrics",
    gradient: "from-purple-500 to-fuchsia-600",
  },
];

const quickLinks = [
  {
    title: "Departments",
    description: "Explore our specialties",
    icon: Hospital,
    href: "#departments",
  },
  {
    title: "Doctors",
    description: "Meet our specialists",
    icon: Users,
    href: "#doctors",
  },
  {
    title: "Services",
    description: "Healthcare services",
    icon: Stethoscope,
    href: "#services",
  },
  {
    title: "Appointments",
    description: "Book your visit",
    icon: CalendarDays,
    href: "/appointment",
  },
  {
    title: "Emergency",
    description: "24/7 urgent care",
    icon: HeartPulse,
    href: "#emergency",
  },
];

export default function GeneralHospitalPage() {
    const heroImages = [
  "/images/hospital/hospital-hero1.jpg",
  "/images/hospital/hospital-hero2.jpg",
  "/images/hospital/hospital-hero3.jpg",
  "/images/hospital/hospital-hero4.jpg",
];

const [currentHero, setCurrentHero] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentHero((previous) => (previous + 1) % heroImages.length);
  }, 5000);

  return () => clearInterval(interval);
}, []);


  return (
    <main className="overflow-hidden bg-white">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-[760px] overflow-hidden">

  {/* Background Images */}
  {heroImages.map((image, index) => (
    <div
      key={image}
      className={`absolute inset-0 transition-opacity duration-1000 ${
        index === currentHero ? "opacity-100" : "opacity-0"
      }`}
    >
      <Image
        src={image}
        alt={`Afilas General Hospital - Slide ${index + 1}`}
        fill
        priority={index === 0}
        sizes="100vw"
        className="object-cover"
      />
    </div>
  ))}

  {/* Very Light Text Gradient */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#071b3a]/35 via-[#071b3a]/10 to-transparent" />

  {/* Hero Content */}
  <div className="relative z-10 mx-auto flex min-h-[760px] max-w-7xl items-center px-6 py-24 lg:px-8">
    <div className="max-w-3xl text-white">

      {/* Small Label */}
      <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-md">
        <span className="h-2.5 w-2.5 rounded-full bg-[#64D6C5]" />

        <span className="text-sm font-semibold tracking-[0.2em] text-white/90">
          AFILAS GENERAL HOSPITAL
        </span>
      </div>

      {/* Heading */}
      <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
        Your Health,
        <span className="block text-[#64D6C5]">
          Our Priority.
        </span>
      </h1>

      {/* Description */}
      <p className="mt-7 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
        Compassionate healthcare, experienced professionals, and modern
        medical services designed around you and your family.
      </p>

      {/* Buttons */}
      <div className="mt-9 flex flex-col gap-4 sm:flex-row">

        <Link
          href="/appointment"
          className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#18A999] px-7 py-4 font-semibold text-white shadow-lg shadow-[#18A999]/20 transition hover:-translate-y-1 hover:bg-[#159889]"
        >
          Book Appointment

          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>

        <Link
          href="#departments"
          className="inline-flex items-center justify-center gap-3 rounded-full border border-white/30 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/20"
        >
          Explore Departments
        </Link>

      </div>

      {/* Trust Indicators */}
      <div className="mt-12 flex flex-wrap gap-8 border-t border-white/15 pt-7">

        <div>
          <p className="font-semibold text-white">
            Trusted Care
          </p>

          <p className="mt-1 text-sm text-white/60">
            Patient-centered service
          </p>
        </div>

        <div>
          <p className="font-semibold text-white">
            24/7 Emergency
          </p>

          <p className="mt-1 text-sm text-white/60">
            Care when you need it
          </p>
        </div>

        <div>
          <p className="font-semibold text-white">
            Expert Doctors
          </p>

          <p className="mt-1 text-sm text-white/60">
            Professional medical care
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
            : "w-2.5 bg-white/50 hover:bg-white/80"
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

          <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_20px_50px_rgba(16,40,80,0.10)] md:grid-cols-5">

            {quickLinks.map((item, index) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`
                    group
                    flex items-center gap-3
                    p-5
                    transition
                    hover:bg-[#f3fbf9]
                    ${index < quickLinks.length - 1 ? "md:border-r md:border-gray-100" : ""}
                  `}
                >
                  <div
                    className="
                      flex h-11 w-11 shrink-0
                      items-center justify-center
                      rounded-2xl
                      bg-[#eaf9f5]
                      text-[#129985]
                      transition
                      group-hover:bg-[#129985]
                      group-hover:text-white
                    "
                  >
                    <Icon size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#12356b]">
                      {item.title}
                    </p>

                    <p className="mt-1 text-[11px] text-gray-500">
                      {item.description}
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

      {/* ================================
          LEFT CONTENT
      ================================= */}

      <div>

        {/* Section label */}
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-12 bg-[#18a999]" />

          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#18a999]">
            ABOUT AFILAS GENERAL HOSPITAL
          </span>
        </div>

        {/* Heading */}
        <h2 className="max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight text-[#12356b] sm:text-5xl">
          Healthcare built around
          <span className="text-[#18a999]"> people.</span>
        </h2>

        {/* Description */}
        <p className="mt-7 max-w-xl text-base leading-8 text-gray-600">
          Afilas General Hospital is committed to delivering accessible,
          compassionate and quality healthcare for individuals and families.
          Our approach combines experienced healthcare professionals,
          modern medical facilities and patient-centered care.
        </p>

        <p className="mt-4 max-w-xl text-base leading-8 text-gray-500">
          From routine consultations to specialized treatment and emergency
          care, our goal is to create a healthcare experience where every
          patient feels respected, supported and cared for.
        </p>

        {/* ================================
            FEATURE CARDS
        ================================= */}

        {/* ================================
    HEALTHCARE FEATURES
================================= */}

<div className="mt-10 grid gap-4 sm:grid-cols-2">

  {/* Patient-Centered Care */}
  <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#e4f7f3] transition-transform duration-500 group-hover:scale-150" />

    <div className="relative">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e4f7f3] text-[#18a999] transition-all duration-300 group-hover:bg-[#18a999] group-hover:text-white">
        <HeartPulse size={24} strokeWidth={1.8} />
      </div>

      <h3 className="font-bold text-[#12356b]">
        Patient-Centered Care
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-500">
        We put every patient’s comfort, safety, and wellbeing first.
      </p>

      <div className="mt-4 h-1 w-8 rounded-full bg-[#18a999] transition-all duration-300 group-hover:w-16" />
    </div>
  </div>

  {/* Trusted Professionals */}
  <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-50 transition-transform duration-500 group-hover:scale-150" />

    <div className="relative">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
        <ShieldCheck size={24} strokeWidth={1.8} />
      </div>

      <h3 className="font-bold text-[#12356b]">
        Trusted Professionals
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-500">
        Dedicated healthcare professionals focused on quality service.
      </p>

      <div className="mt-4 h-1 w-8 rounded-full bg-blue-600 transition-all duration-300 group-hover:w-16" />
    </div>
  </div>

  {/* Modern Facilities */}
  <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-orange-50 transition-transform duration-500 group-hover:scale-150" />

    <div className="relative">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500 transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white">
        <Hospital size={24} strokeWidth={1.8} />
      </div>

      <h3 className="font-bold text-[#12356b]">
        Modern Facilities
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-500">
        A comfortable environment supported by medical facilities.
      </p>

      <div className="mt-4 h-1 w-8 rounded-full bg-orange-500 transition-all duration-300 group-hover:w-16" />
    </div>
  </div>

  {/* Continuous Support */}
  <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-50 transition-transform duration-500 group-hover:scale-150" />

    <div className="relative">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white">
        <Clock3 size={24} strokeWidth={1.8} />
      </div>

      <h3 className="font-bold text-[#12356b]">
        Continuous Support
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-500">
        Support and assistance when you need healthcare services.
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
            Learn More About Us

            <span
              className="
                flex h-7 w-7 items-center justify-center
                rounded-full bg-white/10
                transition
                group-hover:bg-white/20
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

            <p className="text-xs text-gray-500">
              <span className="font-semibold text-[#12356b]">
                Patient-focused
              </span>
              <br />
              healthcare experience
            </p>

          </div>

        </div>

      </div>


      {/* ================================
          RIGHT VISUAL
      ================================= */}

      <div className="relative">

        {/* Main image */}
        <div
          className="
            relative overflow-hidden
            rounded-[36px]
            border border-white
            bg-[#eef6ff]
            shadow-[0_30px_70px_rgba(18,53,107,0.12)]
          "
        >

          <Image
            src="/images/hospital/hospital-hero1.jpg"
            alt="Afilas General Hospital"
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

                <span>Quality Healthcare</span>
              </div>

          </div>

          {/* Bottom image information */}
          <div className="absolute bottom-6 left-6 right-6">

            <div
              className="
                rounded-2xl
                border border-white/20
                bg-white/10
                p-5
                backdrop-blur-md
              "
            >

              <div className="flex items-center justify-between gap-4">

                <div>

                  <p className="text-xs text-white/70">
                    Afilas General Hospital
                  </p>

                  <p className="mt-1 text-lg font-bold text-white">
                    Caring for you and your family
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


        {/* ================================
            FLOATING STATISTICS CARD
        ================================= */}

        <div
          className="
            absolute -bottom-8 -left-5
            rounded-2xl
            border border-gray-100
            bg-white
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
                bg-[#eaf9f5]
                text-[#18a999]
              "
            >
              <Users size={22} />
            </div>

            <div>

              <p className="text-2xl font-bold text-[#12356b]">
                24/7
              </p>

              <p className="text-xs text-gray-500">
                Emergency Support
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

      {/* ================================
     DEPARTMENTS SECTION
================================= */}

<section
  id="departments"
  className="relative overflow-hidden bg-[#f3faf9] px-6 py-24 lg:px-8"
>
  {/* Decorative Background Shapes */}
  <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#18a999]/10 blur-3xl" />
  <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />

  <div className="relative mx-auto max-w-7xl">

    {/* Section Header */}
    <div className="mx-auto max-w-3xl text-center">

      <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#18a999]/20 bg-white px-4 py-2 shadow-sm">
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#18a999]" />

        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#18a999]">
          Our Medical Departments
        </span>
      </div>

      <h2 className="text-4xl font-extrabold leading-tight text-[#12356b] sm:text-5xl">
        Specialized care for
        <span className="text-[#18a999]"> every need.</span>
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600">
        Explore our medical departments and discover healthcare services
        designed to support your health and wellbeing.
      </p>

    </div>

    {/* Department Cards */}
    <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

      {departments.map((department, index) => {
        const Icon = department.icon;

        return (
          <Link
            key={department.title}
            href={`/hospital/departments/${department.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "")}`}
            className="group relative overflow-hidden rounded-[28px] border border-white/80 bg-white p-7 shadow-[0_10px_35px_rgba(18,53,107,0.07)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_55px_rgba(18,53,107,0.15)]"
          >

            {/* Colorful Background Glow */}
            <div
              className={`absolute -right-14 -top-14 h-44 w-44 rounded-full bg-gradient-to-br ${department.gradient} opacity-10 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-25`}
            />

            {/* Top Row */}
            <div className="relative flex items-start justify-between">

              {/* Icon */}
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${department.gradient} text-white shadow-lg transition-all duration-500 group-hover:rotate-6 group-hover:scale-110`}
              >
                <Icon size={30} strokeWidth={1.7} />
              </div>

              {/* Number */}
              <span className="text-sm font-bold text-gray-300 transition-colors group-hover:text-[#18a999]">
                {String(index + 1).padStart(2, "0")}
              </span>

            </div>

            {/* Content */}
            <div className="relative mt-7">

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#18a999]">
                Medical Specialty
              </span>

              <h3 className="mt-2 text-xl font-bold text-[#12356b] transition-colors group-hover:text-[#18a999]">
                {department.title}
              </h3>

              <p className="mt-3 min-h-[72px] text-sm leading-6 text-gray-500">
                {department.description}
              </p>

            </div>

            {/* Bottom Action */}
            <div className="relative mt-6 flex items-center justify-between border-t border-gray-100 pt-5">

              <span className="text-sm font-bold text-[#12356b]">
                Explore Department
              </span>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 text-[#12356b] transition-all duration-300 group-hover:bg-[#18a999] group-hover:text-white">
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>

            </div>

            {/* Bottom Gradient Line */}
            <div
              className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${department.gradient} transition-all duration-500 group-hover:w-full`}
            />

          </Link>
        );
      })}

    </div>

    {/* Bottom CTA */}
    <div className="mt-14 flex flex-col items-center justify-between gap-5 rounded-3xl bg-[#12356b] px-8 py-8 text-center shadow-xl md:flex-row md:text-left">

      <div>
        <h3 className="text-xl font-bold text-white">
          Need help finding the right department?
        </h3>

        <p className="mt-2 text-sm text-blue-100">
          Our team can help guide you toward the appropriate care.
        </p>
      </div>

      <Link
        href="/appointment"
        className="inline-flex shrink-0 items-center gap-3 rounded-full bg-[#18a999] px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-[#129383]"
      >
        Book Appointment
        <ArrowRight size={18} />
      </Link>

    </div>

  </div>
</section>

    {/* ================================
    MEDICAL SERVICES SECTION
================================= */}
<section
  id="services"
  className="relative isolate overflow-hidden bg-gradient-to-br from-[#eefaf8] via-white to-[#edf4ff] px-6 py-24 lg:px-8"
>
  {/* ================================
      DYNAMIC BACKGROUND DECORATIONS
  ================================= */}
  <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
    {/* Teal glowing circle */}
    <div
      className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#18a999]/15 blur-3xl"
      style={{
        animation: "float 10s ease-in-out infinite",
      }}
    />

    {/* Blue glowing circle */}
    <div
      className="absolute -right-32 top-40 h-[420px] w-[420px] rounded-full bg-[#1261c9]/10 blur-3xl"
      style={{
        animation: "float 12s ease-in-out infinite reverse",
      }}
    />

    {/* Orange glow */}
    <div
      className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-orange-300/10 blur-3xl"
      style={{
        animation: "pulse 8s ease-in-out infinite",
      }}
    />

    {/* Subtle grid pattern */}
    <div
      className="absolute inset-0 opacity-[0.035]"
      style={{
        backgroundImage:
          "linear-gradient(#12356b 1px, transparent 1px), linear-gradient(90deg, #12356b 1px, transparent 1px)",
        backgroundSize: "45px 45px",
      }}
    />
  </div>

  <div className="relative mx-auto max-w-7xl">

    {/* ================================
        SECTION HEADER
    ================================= */}
    <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
      <div className="max-w-2xl">

        {/* Label */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/80 px-4 py-2 text-sm font-bold text-teal-700 shadow-sm backdrop-blur">
          <HeartPulse size={17} />
          Healthcare Services
        </div>

        {/* Heading */}
        <h2 className="text-4xl font-extrabold leading-tight text-[#12356b] md:text-5xl">
          Comprehensive Care
          <span className="block text-[#18a999]">
            For Every Patient
          </span>
        </h2>

        {/* Description */}
        <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
          From routine consultations to specialized medical support,
          our services are designed to provide safe, accessible,
          and patient-centered healthcare.
        </p>

        {/* Decorative line */}
        <div className="mt-6 flex items-center gap-2">
          <span className="h-1.5 w-12 rounded-full bg-[#18a999]" />
          <span className="h-1.5 w-5 rounded-full bg-[#1261c9]" />
          <span className="h-1.5 w-2 rounded-full bg-orange-400" />
        </div>
      </div>

      {/* Statistics */}
      <div className="flex gap-8 rounded-2xl border border-white/70 bg-white/70 p-5 shadow-sm backdrop-blur-md">
        <div>
          <p className="text-3xl font-extrabold text-[#12356b]">
            24/7
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Emergency Support
          </p>
        </div>

        <div className="h-14 w-px bg-slate-200" />

        <div>
          <p className="text-3xl font-extrabold text-[#12356b]">
            6+
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Core Services
          </p>
        </div>
      </div>
    </div>

    {/* ================================
        SERVICE CARDS
    ================================= */}
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {medicalServices.map((service, index) => {
        const Icon = service.icon;

        return (
          <div
            key={service.title}
            className="group relative overflow-hidden rounded-3xl border border-white/80 bg-white/90 p-7 shadow-[0_10px_35px_rgba(18,53,107,0.07)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(18,53,107,0.15)]"
          >
            {/* Top gradient line */}
            <div
              className={`absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r ${service.gradient}`}
            />

            {/* Decorative background circle */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-slate-50 transition-transform duration-500 group-hover:scale-150" />

            {/* Icon */}
            <div
              className={`relative mb-7 flex h-16 w-16 items-center justify-center rounded-2xl ${service.bg} ${service.iconColor} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
            >
              <Icon size={31} strokeWidth={1.8} />

              {/* Number badge */}
              <span
                className={`absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${service.gradient} text-xs font-bold text-white shadow-md`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Title */}
            <h3 className="relative text-xl font-bold text-[#12356b] transition-colors group-hover:text-[#18a999]">
              {service.title}
            </h3>

            {/* Description */}
            <p className="relative mt-3 min-h-[88px] text-sm leading-7 text-slate-600">
              {service.description}
            </p>

            {/* Bottom link */}
            <div className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
              <span className="text-sm font-bold text-[#12356b]">
                Learn More
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-[#12356b] transition-all duration-300 group-hover:bg-[#18a999] group-hover:text-white">
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:rotate-45"
                />
              </span>
            </div>

            {/* Bottom hover accent */}
            <div
              className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${service.gradient} transition-all duration-500 group-hover:w-full`}
            />
          </div>
        );
      })}
    </div>

    {/* ================================
        EMERGENCY HIGHLIGHT
    ================================= */}
    <div className="relative mt-12 overflow-hidden rounded-3xl bg-gradient-to-r from-[#12356b] to-[#18558b] p-8 text-white shadow-xl md:p-10">

      {/* Decorative circles */}
      <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border-[35px] border-white/10" />

      <div className="absolute -bottom-24 right-32 h-52 w-52 rounded-full border-[25px] border-white/10" />

      <div className="relative flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">

        {/* Emergency content */}
        <div className="flex items-start gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-500 shadow-lg">
            <Ambulance size={28} />
          </div>

          <div>
            <p className="mb-1 text-sm font-bold uppercase tracking-wider text-cyan-200">
              Immediate Assistance
            </p>

            <h3 className="text-2xl font-extrabold md:text-3xl">
              Need Emergency Medical Care?
            </h3>

            <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100">
              Contact our emergency team for urgent medical assistance.
              Do not delay seeking emergency care when needed.
            </p>
          </div>
        </div>

        {/* Emergency button */}
        <a
          href="tel:+251000000000"
          className="inline-flex shrink-0 items-center gap-3 rounded-full bg-white px-6 py-3 font-bold text-[#12356b] transition-all hover:bg-[#64d6c5] hover:text-white"
        >
          Emergency Call
          <ArrowRight size={18} />
        </a>
      </div>
    </div>

    {/* ================================
        EXPLORE ALL SERVICES
    ================================= */}
    <div className="mt-12 text-center">
      <Link
        href="/services"
        className="group inline-flex items-center gap-3 rounded-full bg-[#18a999] px-7 py-4 font-bold text-white shadow-lg shadow-teal-500/20 transition-all hover:-translate-y-1 hover:bg-[#12356b]"
      >
        Explore All Afilas General Hospital Services

        <ArrowRight
          size={19}
          className="transition-transform group-hover:translate-x-1"
        />
      </Link>
    </div>

  </div>
</section>

     {/* ================================
    DOCTORS / SPECIALISTS SECTION
================================= */}
<section
  id="doctors"
  className="relative isolate overflow-hidden bg-gradient-to-br from-white via-[#f3faf9] to-[#edf4ff] px-6 py-24 lg:px-8"
>
  {/* Background Decorations */}
  <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
    <div
      className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#18a999]/10 blur-3xl"
      style={{
        animation: "float 12s ease-in-out infinite",
      }}
    />

    <div
      className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#1261c9]/10 blur-3xl"
      style={{
        animation: "float 14s ease-in-out infinite reverse",
      }}
    />
  </div>

  <div className="relative mx-auto max-w-7xl">

    {/* Section Header */}
    <div className="mb-14 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
      <div className="max-w-2xl">

        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-bold text-[#1261c9] shadow-sm">
          <Stethoscope size={17} />
          Our Medical Team
        </div>

        <h2 className="text-4xl font-extrabold leading-tight text-[#12356b] md:text-5xl">
          Meet Our
          <span className="block text-[#18a999]">
            Medical Specialists
          </span>
        </h2>

        <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
          Our medical team is committed to providing professional,
          compassionate, and patient-centered healthcare.
        </p>

        <div className="mt-6 flex items-center gap-2">
          <span className="h-1.5 w-12 rounded-full bg-[#18a999]" />
          <span className="h-1.5 w-5 rounded-full bg-[#1261c9]" />
          <span className="h-1.5 w-2 rounded-full bg-orange-400" />
        </div>
      </div>

      <Link
        href="/doctors"
        className="group inline-flex w-fit items-center gap-2 rounded-full border-2 border-[#12356b] px-6 py-3 font-bold text-[#12356b] transition-all hover:bg-[#12356b] hover:text-white"
      >
        View All Doctors
        <ArrowRight
          size={18}
          className="transition-transform group-hover:translate-x-1"
        />
      </Link>
    </div>

    {/* Doctors Grid */}
    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
      {doctors.map((doctor) => (
        <div
          key={doctor.name}
          className="group relative overflow-hidden rounded-3xl border border-white bg-white shadow-[0_10px_35px_rgba(18,53,107,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(18,53,107,0.16)]"
        >
          {/* Doctor Image */}
          <div className="relative h-72 overflow-hidden bg-slate-100">
            <Image
              src={doctor.image}
              alt={doctor.name}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />

            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#12356b]/80 via-transparent to-transparent opacity-70" />

            {/* Department Badge */}
            <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#12356b] shadow-md backdrop-blur">
              {doctor.department}
            </div>

            {/* Hover Profile Link */}
            <Link
              href={`/doctors/${doctor.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "")}`}
              className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-3 items-center justify-center rounded-full bg-white text-[#12356b] opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#18a999] hover:text-white"
              aria-label={`View profile of ${doctor.name}`}
            >
              <ArrowUpRight size={19} />
            </Link>
          </div>

          {/* Doctor Details */}
          <div className="p-6">

            <h3 className="text-lg font-extrabold text-[#12356b]">
              {doctor.name}
            </h3>

            <p className="mt-1 text-sm font-bold text-[#18a999]">
              {doctor.specialization}
            </p>

            {/* Experience */}
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
              <GraduationCap size={17} className="text-[#1261c9]" />
              {doctor.experience}
            </div>

            {/* Description */}
            <p className="mt-4 min-h-[84px] text-sm leading-6 text-slate-600">
              {doctor.description}
            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-3">

              <Link
                href={`/doctors/${doctor.name
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, "")}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#12356b] px-4 py-2.5 text-sm font-bold text-[#12356b] transition-all hover:bg-[#12356b] hover:text-white"
              >
                View Profile
                <ArrowUpRight size={16} />
              </Link>

              <Link
                href="/appointment"
                className={`inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r ${doctor.gradient} px-4 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg`}
              >
                <CalendarDays size={16} />
                Book Appointment
              </Link>

            </div>
          </div>

          {/* Bottom Accent */}
          <div
            className={`h-1.5 w-full bg-gradient-to-r ${doctor.gradient}`}
          />
        </div>
      ))}
    </div>

    {/* Bottom CTA */}
    <div className="mt-14 rounded-3xl border border-teal-100 bg-white/80 p-8 text-center shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-[#18a999]">
        <HeartPulse size={28} />
      </div>

      <h3 className="mt-5 text-2xl font-extrabold text-[#12356b]">
        Need Help Choosing a Specialist?
      </h3>

      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
        Our team can help guide you toward the appropriate department
        and appointment service.
      </p>

      <Link
        href="/appointment"
        className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#18a999] px-7 py-3.5 font-bold text-white transition-all hover:bg-[#12356b]"
      >
        Find the Right Care
        <ArrowRight size={18} />
      </Link>
    </div>

  </div>
</section>

      {/* ================================
    EMERGENCY CARE SECTION
================================= */}
<section
  id="emergency"
  className="relative overflow-hidden bg-gradient-to-br from-[#fff5f5] via-white to-[#fff0ed] px-6 py-24 lg:px-8"
>
  {/* Decorative Background */}
  <div className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-red-200/30 blur-3xl" />
  <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-orange-200/20 blur-3xl" />

  <div className="relative mx-auto max-w-7xl">
    <div className="grid items-center gap-12 lg:grid-cols-2">

      {/* Left Content */}
      <div>
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-600">
          <Ambulance size={18} />
          Emergency Medical Care
        </div>

        <h2 className="text-4xl font-extrabold leading-tight text-[#12356b] md:text-5xl">
          Your Emergency
          <span className="block text-red-600">
            Is Our Priority
          </span>
        </h2>

        <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
          When every second matters, our emergency care team is
          prepared to provide timely medical assistance and support.
        </p>

        {/* Emergency Information */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <Clock3 size={21} />
            </div>

            <div>
              <h3 className="font-bold text-[#12356b]">
                Emergency Support
              </h3>
              <p className="text-sm text-slate-500">
                Available according to hospital emergency hours
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <HeartPulse size={21} />
            </div>

            <div>
              <h3 className="font-bold text-[#12356b]">
                Patient-Focused Care
              </h3>
              <p className="text-sm text-slate-500">
                Professional support during urgent situations
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Buttons */}
        <div className="mt-9 flex flex-wrap gap-4">
          <a
            href="tel:+251000000000"
            className="inline-flex items-center gap-3 rounded-full bg-red-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-red-600/20 transition-all hover:-translate-y-1 hover:bg-red-700"
          >
            <Phone size={18} />
            Call Emergency
          </a>

          <Link
            href="/appointment"
            className="inline-flex items-center gap-3 rounded-full border-2 border-[#12356b] px-6 py-3.5 font-bold text-[#12356b] transition-all hover:bg-[#12356b] hover:text-white"
          >
            Book Appointment
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Right Emergency Card */}
      <div className="relative">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#12356b] to-[#18558b] p-8 text-white shadow-2xl md:p-10">

          {/* Decorative circles */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[35px] border-white/10" />

          <div className="absolute -bottom-24 -left-10 h-56 w-56 rounded-full border-[25px] border-white/10" />

          <div className="relative">
            <div className="mb-7 flex h-20 w-20 items-center justify-center rounded-3xl bg-red-500 shadow-lg">
              <Ambulance size={40} />
            </div>

            <p className="text-sm font-bold uppercase tracking-widest text-cyan-200">
              Emergency Contact
            </p>

            <h3 className="mt-3 text-3xl font-extrabold">
              Need Immediate Help?
            </h3>

            <p className="mt-5 leading-7 text-blue-100">
              For life-threatening emergencies, seek immediate
              medical assistance or contact the appropriate emergency
              service.
            </p>

            <div className="mt-8 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
              <p className="text-sm text-blue-100">
                Emergency Telephone
              </p>

              <p className="mt-2 text-2xl font-extrabold">
                +251 00 000 0000
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

    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-[#64d6c5]">
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
        className="inline-flex items-center justify-center gap-3 rounded-full border border-white/40 px-8 py-4 font-bold text-white transition-all hover:bg-white hover:text-[#12356b]"
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
  );
}