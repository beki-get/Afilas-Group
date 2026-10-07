"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, CalendarDays, Stethoscope, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

type Doctor = {
  id: string;
  name: string;
  department: string;
   photoUrl: string | null;
};

const doctorImages = [
  "/images/hospital/doctors/doctor1.jpg",
  "/images/hospital/doctors/doctor2.jpg",
  "/images/hospital/doctors/doctor3.jpg",
];

export default function DoctorProfilePage() {
  const t = useTranslations("Hospital");
  const params = useParams();

  const id = params.id as string;

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const apiBase =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

        const response = await fetch(`${apiBase}/api/doctors`);
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.error || "Failed to fetch doctors");
        }

        const foundDoctor = result.data.find(
          (item: Doctor) => item.id === id
        );

        setDoctor(foundDoctor || null);
      } catch (error) {
        console.error("Failed to fetch doctor:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  const doctorIndex = doctor
  ? doctor.id.charCodeAt(0) % doctorImages.length
  : 0;

const doctorImage = doctor?.photoUrl
  ? doctor.photoUrl.startsWith("/uploads/")
    ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"}${doctor.photoUrl}`
    : doctor.photoUrl
  : doctorImages[doctorIndex];

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--background)] px-6 py-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-lg text-[var(--foreground)]">
            {t("doctors.loading")}
          </p>
        </div>
      </main>
    );
  }

  if (!doctor) {
    return (
      <main className="min-h-screen bg-[var(--background)] px-6 py-20">
        <div className="mx-auto max-w-5xl text-center">
          <UserRound className="mx-auto mb-5 h-16 w-16 text-[#18a999]" />

          <h1 className="mb-4 text-3xl font-bold text-[var(--foreground)]">
            {t("doctors.notFound")}
          </h1>

          <Link
            href="/hospital"
            className="inline-flex items-center gap-2 rounded-xl bg-[#18a999] px-6 py-3 font-semibold text-white transition hover:bg-[#149687]"
          >
            <ArrowLeft className="h-5 w-5" />
            {t("doctors.backToHospital")}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#071f46]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
          <Link
            href="/hospital"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("doctors.backToHospital")}
          </Link>

          <div className="grid items-center gap-10 lg:grid-cols-[320px_1fr]">
            {/* Doctor Image */}
            <div className="relative h-[380px] overflow-hidden rounded-3xl shadow-2xl">
              <Image
                 src={doctorImage}
                alt={doctor.name}
                fill
                priority
                unoptimized
                className="object-cover object-top"
              />
            </div>

            {/* Doctor Information */}
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#18a999]/20 px-4 py-2 text-sm font-semibold text-[#5ee0d1]">
                <Stethoscope className="h-4 w-4" />
                {doctor.department}
              </div>

              <h1 className="mb-5 text-4xl font-bold text-white md:text-5xl">
                {doctor.name}
              </h1>

              <p className="max-w-2xl text-lg leading-8 text-white/75">
                {t("doctors.profileDescription")}{" "}
                {doctor.department} {t("doctors.department")}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-7">
            <Stethoscope className="mb-5 h-10 w-10 text-[#18a999]" />

            <h2 className="mb-3 text-xl font-bold text-[var(--foreground)]">
              {t("doctors.departmentTitle")}
            </h2>

            <p className="text-[var(--muted-foreground)]">
              {doctor.department}
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-7">
            <UserRound className="mb-5 h-10 w-10 text-[#18a999]" />

            <h2 className="mb-3 text-xl font-bold text-[var(--foreground)]">
              {t("doctors.specialist")}
            </h2>

            <p className="text-[var(--muted-foreground)]">
              {doctor.name}
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-7">
            <CalendarDays className="mb-5 h-10 w-10 text-[#18a999]" />

            <h2 className="mb-3 text-xl font-bold text-[var(--foreground)]">
              {t("doctors.appointment")}
            </h2>

            <p className="mb-5 text-[var(--muted-foreground)]">
              {t("doctors.appointmentDescription")}
            </p>

            <Link
              href="/book"
              className="inline-flex items-center rounded-xl bg-[#18a999] px-5 py-3 font-semibold text-white transition hover:bg-[#149687]"
            >
              {t("doctors.bookAppointment")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}