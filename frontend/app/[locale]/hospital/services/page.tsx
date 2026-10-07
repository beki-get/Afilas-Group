"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Stethoscope,
  Bed,
  Ambulance,
  ClipboardCheck,
  FlaskConical,
  Pill,
} from "lucide-react";

type HospitalService = {
  id: string;
  name: string;
  description: string | null;
  departmentId: string;
  department: {
    name: string;
  };
};

const serviceStyles = [
  {
    icon: Stethoscope,
    gradient: "from-teal-500 to-emerald-600",
    bg: "bg-teal-50 dark:bg-teal-950/30",
    iconColor: "text-teal-600",
  },
  {
    icon: Bed,
    gradient: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    iconColor: "text-blue-600",
  },
  {
    icon: Ambulance,
    gradient: "from-red-500 to-rose-600",
    bg: "bg-red-50 dark:bg-red-950/30",
    iconColor: "text-red-600",
  },
  {
    icon: ClipboardCheck,
    gradient: "from-purple-500 to-fuchsia-600",
    bg: "bg-purple-50 dark:bg-purple-950/30",
    iconColor: "text-purple-600",
  },
  {
    icon: FlaskConical,
    gradient: "from-orange-500 to-amber-600",
    bg: "bg-orange-50 dark:bg-orange-950/30",
    iconColor: "text-orange-600",
  },
  {
    icon: Pill,
    gradient: "from-cyan-500 to-blue-600",
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
    iconColor: "text-cyan-600",
  },
];

export default function HospitalServicesPage() {
  const t = useTranslations("Hospital");

  const [services, setServices] = useState<HospitalService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const apiBase =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

        const response = await fetch(`${apiBase}/api/services`);

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.error || "Failed to fetch services"
          );
        }

        setServices(result.data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f8fc] dark:bg-[#071f46]">
        <p className="text-slate-600 dark:text-slate-300">
          {t("services.detail.loading")}
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f8fc] dark:bg-[#071f46]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#071f46] px-6 pb-24 pt-36 text-white">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#18a999]/20 blur-3xl" />

        <div className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <Link
            href="/hospital"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-teal-300 transition-all hover:gap-3"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("services.detail.back")}
          </Link>

          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-teal-300">
              {t("services.badge")}
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {t("services.titleLine1")}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              {t("services.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-600 dark:text-teal-400">
              {t("services.coreServices")}
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#071f46] dark:text-white sm:text-4xl">
              {t("services.titleLine2")}
            </h2>
          </div>

          {services.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-white/10 dark:bg-white/[0.06]">
              <p className="text-slate-600 dark:text-slate-300">
                {t("services.detail.notFound")}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => {
                const style =
                  serviceStyles[index % serviceStyles.length];

                const Icon = style.icon;

                return (
                  <div
                    key={service.id}
                    className={`group relative overflow-hidden rounded-3xl border border-slate-200 ${style.bg} p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:border-white/10`}
                  >
                    <div
                      className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${style.gradient}`}
                    />

                    <div
                      className={`absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${style.gradient} opacity-10 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-20`}
                    />

                    <div className="relative">
                      <div
                        className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-white/10 ${style.iconColor} transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
                      >
                        <Icon className="h-7 w-7" />
                      </div>

                      <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-teal-600 dark:text-teal-400">
                        {service.department.name}
                      </p>

                      <h3 className="text-xl font-bold text-[#071f46] dark:text-white">
                        {service.name}
                      </h3>

                      <p className="mt-3 min-h-[96px] text-sm leading-6 text-slate-600 dark:text-slate-300">
                        {service.description || ""}
                      </p>

                      <Link
                        href={`/hospital/services/${service.id}`}
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
          )}
        </div>
      </section>
    </main>
  );
}