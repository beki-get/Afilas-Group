import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  Scan,
   ScanLine,
  ShieldCheck,
  TestTube,
  FlaskConical,
  Activity,
  HeartPulse,
  ClipboardCheck,
  UserRoundCheck,
  CalendarCheck,
  ClipboardList,
  FileCheck2,
  Timer,
  HeartHandshake,
  Stethoscope,
  Microscope,
} from "lucide-react";

export default function DiagnosisPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative isolate overflow-hidden bg-[#12356b]">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/diagnosis/diagnosis-hero1.jpg"
              alt="Afilas Diagnosis Center"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
        </div>

        {/* Overlay */}
       <div className="absolute inset-0 bg-gradient-to-r from-[#071f46]/75 via-[#071f46]/40 to-[#071f46]/20" />

        {/* Hero content */}
        <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-6 py-24 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/25 bg-[#18a999]/90 px-5 py-3 text-sm font-bold text-white shadow-lg">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-200" />
              Advanced Diagnostic Services
            </div>

            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-7xl">
              Accurate Diagnosis.
              <span className="block text-[#64d6c5]">
                Better Healthcare.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              Access reliable laboratory testing, medical imaging, and
              professional diagnostic services designed to support accurate
              medical decisions.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/appointment"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#18a999] px-7 py-4 font-bold text-white transition hover:bg-[#128c80]"
              >
                Book a Diagnostic Test
                <ArrowRight size={19} />
              </Link>

              <Link
                href="#services"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/40 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#12356b]"
              >
                Explore Services
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/90">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="text-[#64d6c5]" size={18} />
                Reliable Testing
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 className="text-[#64d6c5]" size={18} />
                Professional Support
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 className="text-[#64d6c5]" size={18} />
                Secure Results
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== DIAGNOSTIC SERVICES ==================== */}
<section className="bg-white py-20">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">

    {/* Section Header */}
    <div className="mx-auto max-w-3xl text-center">
      <span className="inline-flex items-center rounded-full bg-[#18a999]/10 px-4 py-2 text-sm font-semibold text-[#18a999]">
        Our Diagnostic Services
      </span>

      <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#12356b] sm:text-4xl lg:text-5xl">
        Advanced Diagnostics for{" "}
        <span className="text-[#18a999]">Better Care</span>
      </h2>

      <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
        Our Diagnosis Center provides reliable and comprehensive diagnostic
        services using modern technology and professional expertise to help
        healthcare providers make accurate and timely decisions.
      </p>
    </div>

    {/* Services Grid */}
    <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

      {/* Laboratory Services */}
      <div className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#18a999]/10 text-[#18a999] transition-colors group-hover:bg-[#18a999] group-hover:text-white">
          <FlaskConical className="h-7 w-7" />
        </div>

        <h3 className="mt-6 text-xl font-bold text-[#12356b]">
          Laboratory Services
        </h3>

        <p className="mt-3 leading-7 text-gray-600">
          Comprehensive laboratory testing to support accurate diagnosis,
          disease monitoring, and preventive healthcare.
        </p>

        <div className="mt-5 space-y-2 text-sm text-gray-500">
          <p>• Hematology</p>
          <p>• Biochemistry</p>
          <p>• Urinalysis</p>
          <p>• Blood Tests</p>
        </div>

        <button className="mt-6 inline-flex items-center font-semibold text-[#18a999] transition-colors hover:text-[#12356b]">
          Learn More
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Radiology & Imaging */}
      <div className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#12356b]/10 text-[#12356b] transition-colors group-hover:bg-[#12356b] group-hover:text-white">
          <ScanLine className="h-7 w-7" />
        </div>

        <h3 className="mt-6 text-xl font-bold text-[#12356b]">
          Radiology & Imaging
        </h3>

        <p className="mt-3 leading-7 text-gray-600">
          Modern imaging services designed to provide clear and detailed
          information for accurate clinical assessment.
        </p>

        <div className="mt-5 space-y-2 text-sm text-gray-500">
          <p>• X-Ray</p>
          <p>• Ultrasound</p>
          <p>• CT Scan</p>
          <p>• MRI</p>
        </div>

        <button className="mt-6 inline-flex items-center font-semibold text-[#18a999] transition-colors hover:text-[#12356b]">
          Learn More
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Ultrasound */}
      <div className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#18a999]/10 text-[#18a999] transition-colors group-hover:bg-[#18a999] group-hover:text-white">
          <Activity className="h-7 w-7" />
        </div>

        <h3 className="mt-6 text-xl font-bold text-[#12356b]">
          Ultrasound
        </h3>

        <p className="mt-3 leading-7 text-gray-600">
          Non-invasive ultrasound examinations providing real-time imaging
          to assist healthcare professionals in diagnosis and monitoring.
        </p>

        <div className="mt-5 space-y-2 text-sm text-gray-500">
          <p>• Abdominal Ultrasound</p>
          <p>• Obstetric Ultrasound</p>
          <p>• Pelvic Ultrasound</p>
          <p>• General Ultrasound</p>
        </div>

        <button className="mt-6 inline-flex items-center font-semibold text-[#18a999] transition-colors hover:text-[#12356b]">
          Learn More
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Cardiac Diagnostics */}
      <div className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#12356b]/10 text-[#12356b] transition-colors group-hover:bg-[#12356b] group-hover:text-white">
          <HeartPulse className="h-7 w-7" />
        </div>

        <h3 className="mt-6 text-xl font-bold text-[#12356b]">
          Cardiac Diagnostics
        </h3>

        <p className="mt-3 leading-7 text-gray-600">
          Diagnostic services supporting the evaluation and monitoring of
          cardiovascular health.
        </p>

        <div className="mt-5 space-y-2 text-sm text-gray-500">
          <p>• ECG</p>
          <p>• Echocardiography</p>
          <p>• Cardiac Monitoring</p>
          <p>• Heart Health Assessment</p>
        </div>

        <button className="mt-6 inline-flex items-center font-semibold text-[#18a999] transition-colors hover:text-[#12356b]">
          Learn More
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Health Checkups */}
      <div className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#18a999]/10 text-[#18a999] transition-colors group-hover:bg-[#18a999] group-hover:text-white">
          <ClipboardCheck className="h-7 w-7" />
        </div>

        <h3 className="mt-6 text-xl font-bold text-[#12356b]">
          Health Checkups
        </h3>

        <p className="mt-3 leading-7 text-gray-600">
          Preventive screening packages designed to help identify potential
          health concerns early.
        </p>

        <div className="mt-5 space-y-2 text-sm text-gray-500">
          <p>• General Health Screening</p>
          <p>• Routine Blood Tests</p>
          <p>• Wellness Assessment</p>
          <p>• Preventive Screening</p>
        </div>

        <button className="mt-6 inline-flex items-center font-semibold text-[#18a999] transition-colors hover:text-[#12356b]">
          Learn More
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Specialized Diagnostics */}
      <div className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#12356b]/10 text-[#12356b] transition-colors group-hover:bg-[#12356b] group-hover:text-white">
          <Microscope className="h-7 w-7" />
        </div>

        <h3 className="mt-6 text-xl font-bold text-[#12356b]">
          Specialized Diagnostics
        </h3>

        <p className="mt-3 leading-7 text-gray-600">
          Specialized diagnostic investigations supporting more complex
          medical assessments and clinical decisions.
        </p>

        <div className="mt-5 space-y-2 text-sm text-gray-500">
          <p>• Specialized Laboratory Tests</p>
          <p>• Diagnostic Screening</p>
          <p>• Clinical Investigations</p>
          <p>• Specialized Assessments</p>
        </div>

        <button className="mt-6 inline-flex items-center font-semibold text-[#18a999] transition-colors hover:text-[#12356b]">
          Learn More
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>

    {/* Appointment CTA */}
    <div className="mt-14 flex flex-col items-center justify-between gap-6 rounded-3xl bg-gradient-to-r from-[#12356b] to-[#18a999] px-8 py-10 text-center sm:flex-row sm:text-left lg:px-12">

      <div>
        <h3 className="text-2xl font-bold text-white">
          Need a Diagnostic Test?
        </h3>

        <p className="mt-2 max-w-2xl text-white/80">
          Book your appointment and access reliable diagnostic services
          from the Afilas Diagnosis Center.
        </p>
      </div>

      <button className="inline-flex shrink-0 items-center rounded-xl bg-white px-6 py-3 font-semibold text-[#12356b] shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
        Book an Appointment
        <ArrowRight className="ml-2 h-5 w-5" />
      </button>

    </div>
  </div>
</section>
{/* ==================== WHY CHOOSE AFILAS DIAGNOSIS CENTER ==================== */}
<section className="relative overflow-hidden bg-[#f7fafc] py-24">
  {/* Decorative Background */}
  <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#18a999]/10 blur-3xl" />
  <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-[#12356b]/10 blur-3xl" />

  <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
    <div className="grid items-center gap-14 lg:grid-cols-2">

      {/* ==================== LEFT SIDE ==================== */}
      <div className="relative">

        {/* Main Image */}
        <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
          <img
            src="/images/diagnosis/diagnosis-lab.jpg"
            alt="Afilas Diagnosis Center laboratory"
            className="h-[520px] w-full object-cover"
          />

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#071f46]/70 via-transparent to-transparent" />

          {/* Floating Information Card */}
          <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-white/95 p-5 shadow-xl backdrop-blur-md sm:left-8 sm:right-auto sm:max-w-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#18a999]/10 text-[#18a999]">
                <ShieldCheck className="h-6 w-6" />
              </div>

              <div>
                <p className="font-bold text-[#12356b]">
                  Reliable Diagnostics
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  Supporting better healthcare decisions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Circle */}
        <div className="absolute -bottom-6 -right-6 -z-0 hidden h-28 w-28 rounded-full border-[14px] border-[#18a999]/20 lg:block" />

        {/* Small Floating Badge */}
        <div className="absolute -top-5 right-8 rounded-2xl bg-[#12356b] px-5 py-4 text-white shadow-xl">
          <p className="text-xs font-medium text-white/70">
            Afilas Healthcare
          </p>

          <p className="mt-1 text-lg font-bold">
            Trusted Care
          </p>
        </div>
      </div>

      {/* ==================== RIGHT SIDE ==================== */}
      <div>

        {/* Section Label */}
        <span className="inline-flex items-center rounded-full bg-[#18a999]/10 px-4 py-2 text-sm font-semibold text-[#18a999]">
          Why Choose Afilas
        </span>

        {/* Heading */}
        <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#12356b] sm:text-4xl lg:text-5xl">
          Diagnostics You Can
          <span className="block text-[#18a999]">
            Trust With Confidence
          </span>
        </h2>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
          At Afilas Diagnosis Center, we combine modern diagnostic
          technology, professional expertise, and patient-focused care
          to provide dependable diagnostic services that support better
          healthcare decisions.
        </p>

        {/* Features */}
        <div className="mt-9 grid gap-5 sm:grid-cols-2">

          {/* Feature 1 */}
          <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#18a999]/10 text-[#18a999] transition-colors group-hover:bg-[#18a999] group-hover:text-white">
              <ShieldCheck className="h-6 w-6" />
            </div>

            <h3 className="mt-4 font-bold text-[#12356b]">
              Reliable Results
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Diagnostic services designed to provide dependable results
              for informed healthcare decisions.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#12356b]/10 text-[#12356b] transition-colors group-hover:bg-[#12356b] group-hover:text-white">
              <UserRoundCheck className="h-6 w-6" />
            </div>

            <h3 className="mt-4 font-bold text-[#12356b]">
              Professional Team
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Skilled healthcare and diagnostic professionals focused
              on quality patient service.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#18a999]/10 text-[#18a999] transition-colors group-hover:bg-[#18a999] group-hover:text-white">
              <Timer className="h-6 w-6" />
            </div>

            <h3 className="mt-4 font-bold text-[#12356b]">
              Timely Service
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Efficient diagnostic workflows help patients receive
              services and results in a timely manner.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#12356b]/10 text-[#12356b] transition-colors group-hover:bg-[#12356b] group-hover:text-white">
              <HeartHandshake className="h-6 w-6" />
            </div>

            <h3 className="mt-4 font-bold text-[#12356b]">
              Patient-Centered Care
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              We focus on creating a comfortable, respectful, and
              patient-friendly diagnostic experience.
            </p>
          </div>

        </div>

        {/* Bottom Link */}
        <div className="mt-8">
          <button className="inline-flex items-center rounded-xl bg-[#12356b] px-6 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#18a999] hover:shadow-lg">
            Discover Our Services
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>

      </div>
    </div>
  </div>
</section>
{/* ==================== DIAGNOSTIC PROCESS ==================== */}
<section className="relative overflow-hidden bg-white py-24">
  {/* Decorative Background */}
  <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-[#18a999]/5 blur-3xl" />
  <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#12356b]/5 blur-3xl" />

  <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

    {/* Section Header */}
    <div className="mx-auto max-w-3xl text-center">
      <span className="inline-flex items-center rounded-full bg-[#18a999]/10 px-4 py-2 text-sm font-semibold text-[#18a999]">
        How It Works
      </span>

      <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#12356b] sm:text-4xl lg:text-5xl">
        Simple Steps to
        <span className="text-[#18a999]"> Better Diagnosis</span>
      </h2>

      <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
        Getting your diagnostic services at Afilas is simple. Follow
        these four steps from booking your appointment to receiving
        your results.
      </p>
    </div>

    {/* Process Steps */}
    <div className="relative mt-16">

      {/* Connecting Line - Desktop */}
      <div className="absolute left-[12%] right-[12%] top-16 hidden h-0.5 bg-gradient-to-r from-[#18a999] via-[#12356b] to-[#18a999] lg:block" />

      <div className="grid gap-10 lg:grid-cols-4">

        {/* ==================== STEP 1 ==================== */}
        <div className="group relative text-center">

          {/* Number */}
          <div className="relative z-10 mx-auto flex h-32 w-32 items-center justify-center rounded-full border-8 border-white bg-[#18a999]/10 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:bg-[#18a999]">
            <CalendarCheck className="h-12 w-12 text-[#18a999] transition-colors duration-300 group-hover:text-white" />

            <span className="absolute -right-1 -top-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#12356b] text-sm font-bold text-white shadow-md">
              01
            </span>
          </div>

          <h3 className="mt-7 text-xl font-bold text-[#12356b]">
            Book Appointment
          </h3>

          <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-gray-600">
            Choose the diagnostic service you need and schedule an
            appointment at a convenient time.
          </p>

          <div className="mx-auto mt-5 h-1 w-10 rounded-full bg-[#18a999]" />
        </div>

        {/* ==================== STEP 2 ==================== */}
        <div className="group relative text-center">

          {/* Number */}
          <div className="relative z-10 mx-auto flex h-32 w-32 items-center justify-center rounded-full border-8 border-white bg-[#12356b]/10 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:bg-[#12356b]">
            <ClipboardList className="h-12 w-12 text-[#12356b] transition-colors duration-300 group-hover:text-white" />

            <span className="absolute -right-1 -top-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#18a999] text-sm font-bold text-white shadow-md">
              02
            </span>
          </div>

          <h3 className="mt-7 text-xl font-bold text-[#12356b]">
            Patient Registration
          </h3>

          <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-gray-600">
            Complete your registration and provide the necessary
            information before your diagnostic examination.
          </p>

          <div className="mx-auto mt-5 h-1 w-10 rounded-full bg-[#12356b]" />
        </div>

        {/* ==================== STEP 3 ==================== */}
        <div className="group relative text-center">

          {/* Number */}
          <div className="relative z-10 mx-auto flex h-32 w-32 items-center justify-center rounded-full border-8 border-white bg-[#18a999]/10 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:bg-[#18a999]">
            <Stethoscope className="h-12 w-12 text-[#18a999] transition-colors duration-300 group-hover:text-white" />

            <span className="absolute -right-1 -top-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#12356b] text-sm font-bold text-white shadow-md">
              03
            </span>
          </div>

          <h3 className="mt-7 text-xl font-bold text-[#12356b]">
            Diagnostic Test
          </h3>

          <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-gray-600">
            Our professional team performs the required diagnostic
            examination using appropriate equipment and procedures.
          </p>

          <div className="mx-auto mt-5 h-1 w-10 rounded-full bg-[#18a999]" />
        </div>

        {/* ==================== STEP 4 ==================== */}
        <div className="group relative text-center">

          {/* Number */}
          <div className="relative z-10 mx-auto flex h-32 w-32 items-center justify-center rounded-full border-8 border-white bg-[#12356b]/10 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:bg-[#12356b]">
            <FileCheck2 className="h-12 w-12 text-[#12356b] transition-colors duration-300 group-hover:text-white" />

            <span className="absolute -right-1 -top-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#18a999] text-sm font-bold text-white shadow-md">
              04
            </span>
          </div>

          <h3 className="mt-7 text-xl font-bold text-[#12356b]">
            Receive Results
          </h3>

          <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-gray-600">
            Receive your diagnostic results and use them with your
            healthcare provider for further medical decisions.
          </p>

          <div className="mx-auto mt-5 h-1 w-10 rounded-full bg-[#12356b]" />
        </div>

      </div>
    </div>

    {/* Bottom Information Card */}
    <div className="mt-20 overflow-hidden rounded-3xl bg-[#12356b] shadow-xl">
      <div className="grid items-center lg:grid-cols-[1fr_auto]">

        {/* Text */}
        <div className="p-8 sm:p-10 lg:p-12">
          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#18a999]">
              <ClipboardCheck className="h-6 w-6" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white">
                Ready to Get Started?
              </h3>

              <p className="mt-2 max-w-2xl leading-7 text-white/70">
                Schedule your diagnostic appointment today and take
                an important step toward understanding your health.
              </p>
            </div>

          </div>
        </div>

        {/* Button */}
        <div className="px-8 pb-8 lg:px-12 lg:pb-0">
          <button className="inline-flex w-full items-center justify-center rounded-xl bg-[#18a999] px-7 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#12356b] hover:shadow-xl sm:w-auto">
            Book an Appointment
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>

      </div>
    </div>

  </div>
</section>

{/* ================= APPOINTMENT CTA ================= */}
<section className="relative overflow-hidden bg-[#071f46] py-20 lg:py-24">
  {/* Decorative background elements */}
  <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#18a999]/20 blur-3xl" />
  <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />

  <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
    <div className="grid items-center gap-12 lg:grid-cols-2">

      {/* LEFT CONTENT */}
      <div>
        {/* Small label */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-[#6ee7d8] backdrop-blur-sm">
          <CalendarCheck className="h-4 w-4" />
          Easy Appointment Booking
        </div>

        {/* Heading */}
        <h2 className="max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl">
          Take the Next Step
          <span className="block text-[#18a999]">
            Toward Better Health
          </span>
        </h2>

        {/* Description */}
        <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
          Get the diagnostic care you need with our experienced medical
          professionals and modern diagnostic services. Schedule your
          appointment at a time that works for you.
        </p>

        {/* Features */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#18a999]/15">
              <Clock3 className="h-5 w-5 text-[#5eead4]" />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Convenient Scheduling
              </p>
              <p className="text-xs text-white/50">
                Choose a suitable time
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#18a999]/15">
              <ShieldCheck className="h-5 w-5 text-[#5eead4]" />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Trusted Diagnostics
              </p>
              <p className="text-xs text-white/50">
                Reliable diagnostic care
              </p>
            </div>
          </div>

        </div>

        {/* BUTTONS */}
        <div className="mt-9 flex flex-wrap gap-4">

          <Link
            href="/appointment?service=diagnosis"
            className="group inline-flex items-center gap-2 rounded-xl bg-[#18a999] px-7 py-4 font-semibold text-white shadow-lg shadow-[#18a999]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#20bbaa]"
          >
            Book an Appointment

            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <a
            href="tel:+251900000000"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
          >
            <Phone className="h-5 w-5" />
            Contact Us
          </a>

        </div>
      </div>

      {/* RIGHT VISUAL */}
      <div className="relative">

        {/* Main image */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">

          <img
            src="/images/diagnosis/diagnosis-lab.jpg"
            alt="Afilas Diagnosis Center"
            className="h-[420px] w-full object-cover transition-transform duration-700 hover:scale-105"
          />

          {/* Image overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#071f46]/80 via-transparent to-transparent" />

          {/* Bottom image text */}
          <div className="absolute bottom-0 left-0 right-0 p-7">
            <p className="text-sm font-medium text-[#6ee7d8]">
              AFILAS DIAGNOSIS CENTER
            </p>

            <h3 className="mt-1 text-2xl font-bold text-white">
              Modern Diagnostics. Trusted Care.
            </h3>
          </div>
        </div>

        {/* Floating appointment card */}
        <div className="absolute -bottom-7 -left-5 hidden rounded-2xl border border-white/10 bg-white p-5 shadow-2xl sm:block">
          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e6faf7]">
              <CalendarCheck className="h-6 w-6 text-[#18a999]" />
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500">
                Ready when you are
              </p>

              <p className="text-sm font-bold text-[#12356b]">
                Book your visit today
              </p>
            </div>

          </div>
        </div>

        {/* Floating trusted badge */}
        <div className="absolute -right-4 -top-5 hidden rounded-2xl border border-white/10 bg-white px-5 py-4 shadow-xl sm:block">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#18a999]/10">
              <ShieldCheck className="h-5 w-5 text-[#18a999]" />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Patient-focused
              </p>

              <p className="text-sm font-bold text-[#12356b]">
                Diagnostic Care
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  </div>
</section>
      {/* NEXT SECTIONS WILL BE ADDED HERE */}
    </main>
  );
}