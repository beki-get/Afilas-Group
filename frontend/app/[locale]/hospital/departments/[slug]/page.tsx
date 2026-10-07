"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, ArrowRight, Stethoscope } from "lucide-react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

type Department = {
  id: string;
  name: string;
  description: string | null;
};

export default function DepartmentDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const t = useTranslations("Hospital");

  const [department, setDepartment] = useState<Department | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const apiBase =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

        const response = await fetch(`${apiBase}/api/departments`);
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.error || "Failed to fetch departments"
          );
        }

        const foundDepartment = result.data.find(
          (item: Department) =>
            item.name
              .toLowerCase()
              .trim()
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/g, "") === slug
        );

        setDepartment(foundDepartment || null);
      } catch (error) {
        console.error("Failed to fetch department:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartment();
  }, [slug]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f8fc] dark:bg-[#071f46]">
        <p className="text-slate-600 dark:text-slate-300">
          {t("departments.detail.loading")}
        </p>
      </main>
    );
  }

  if (!department) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f8fc] px-6 dark:bg-[#071f46]">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#071f46] dark:text-white">
             {t("departments.detail.notFound")}
          </h1>

          <Link
            href="/hospital"
            className="mt-6 inline-flex items-center gap-2 font-semibold text-[#18a999]"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("departments.detail.back")}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f8fc] dark:bg-[#071f46]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#071f46] px-6 pb-24 pt-36 text-white">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#18a999]/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <Link
            href="/hospital"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-teal-300 transition-all hover:gap-3"
          >
            <ArrowLeft className="h-4 w-4" />
              {t("departments.detail.back")}
          </Link>

          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 shadow-lg">
              <Stethoscope className="h-8 w-8" />
            </div>

            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-teal-300">
                  {t("departments.detail.label")}
              </p>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                {department.name}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/[0.06] sm:p-10">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-teal-600 dark:text-teal-400">
                {t("departments.detail.about")}
            </p>

            <h2 className="text-3xl font-bold text-[#071f46] dark:text-white">
              {department.name}
            </h2>

            <p className="mt-6 whitespace-pre-line text-base leading-8 text-slate-600 dark:text-slate-300">
              {department.description ||
                "No description is currently available for this department."}
            </p>
          </div>

          {/* Appointment CTA */}
          <div className="mt-8 rounded-3xl bg-gradient-to-r from-[#071f46] to-[#0b315f] p-8 text-white shadow-xl sm:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                    {t("departments.detail.appointmentTitle")}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {t("departments.detail.appointmentDescription")}
                </p>
              </div>

              <Link
                href="/book"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#18a999] px-6 py-3 font-semibold text-white transition-all hover:bg-[#15998e] hover:gap-3"
              >
                 {t("departments.detail.bookAppointment")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}