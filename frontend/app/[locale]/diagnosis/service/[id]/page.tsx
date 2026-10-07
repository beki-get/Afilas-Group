"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FlaskConical,
  Loader2,
} from "lucide-react";

type TestType = {
  id: string;
  name: string;
  description: string | null;
};

export default function DiagnosisServicePage() {
  const t = useTranslations("Diagnosis.serviceDetail");
  const params = useParams();

  const locale = params.locale as string;
  const id = params.id as string;

  const [service, setService] = useState<TestType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError("");

        const apiBase =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

        const response = await fetch(`${apiBase}/api/test-types/${id}`);

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Failed to fetch diagnosis service"
          );
        }

        setService(result.data);
      } catch (error) {
        console.error("Failed to fetch diagnosis service:", error);

        setError("Unable to load this diagnosis service.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--background)]">
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex items-center gap-3 text-[var(--muted)]">
            <Loader2 className="h-6 w-6 animate-spin text-[#18a999]" />

            <span>{t("loading")}</span>
          </div>
        </div>
      </main>
    );
  }

  if (error || !service) {
    return (
      <main className="min-h-screen bg-[var(--background)]">
        <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#18a999]/10">
            <FlaskConical className="h-10 w-10 text-[#18a999]" />
          </div>

          <h1 className="text-3xl font-bold text-[var(--foreground)]">
             {t("notFoundTitle")}
          </h1>

          <p className="mt-4 max-w-lg text-[var(--muted)]">
             {error || t("notFoundDescription")}
          </p>

          <Link
            href={`/${locale}/diagnosis`}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#18a999] px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#12356b]"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("back")}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">

      {/* Hero */}

      <section className="relative overflow-hidden bg-[#071f46] px-6 py-24 text-white md:py-32">

        {/* Background glow */}

        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#18a999]/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#18a999]/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">

          <Link
            href={`/${locale}/diagnosis`}
            className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-[#18a999]"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("badge")}
          </Link>

          <div className="max-w-4xl">

            <span className="inline-flex items-center gap-2 rounded-full bg-[#18a999]/15 px-4 py-2 text-sm font-semibold text-[#5eead4]">
              <FlaskConical className="h-4 w-4" />
              {t("badge")}
            </span>

            <h1 className="mt-7 text-4xl font-black tracking-tight md:text-6xl">
              {service.name}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70 md:text-xl">
              {service.description ||
                "Professional diagnostic services provided by Afilas Diagnosis Center."}
            </p>

          </div>
        </div>
      </section>

      {/* Content */}

      <section className="px-6 py-20 md:py-28">

        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_380px]">

          {/* Main content */}

          <div>

            <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm md:p-10">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#18a999]/10">
                <FlaskConical className="h-8 w-8 text-[#18a999]" />
              </div>

              <h2 className="mt-7 text-3xl font-bold text-[var(--foreground)]">
                 {t("about")} {service.name}
              </h2>

              <p className="mt-5 text-base leading-8 text-[var(--muted)]">
                {service.description || t("defaultAbout")}
              </p>

              <div className="mt-8 space-y-4">

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#18a999]" />

                  <p className="text-sm leading-7 text-[var(--muted)]">
                    {t("professionalService")}
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#18a999]" />

                  <p className="text-sm leading-7 text-[var(--muted)]">
                    {t("qualityCare")}
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#18a999]" />

                  <p className="text-sm leading-7 text-[var(--muted)]">
                    {t("convenientAccess")}
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* Booking card */}

          <aside>

            <div className="sticky top-24 rounded-[2rem] bg-[#071f46] p-8 text-white shadow-xl">

              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#5eead4]">
               {t("needService")}
              </span>

              <h2 className="mt-4 text-2xl font-bold">
                {t("bookTitle")}
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/70">
                {t("bookDescription")}
              </p>

              <Link
                href={`/${locale}/book?service=${encodeURIComponent(service.id)}`}
                className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-[#18a999] px-5 py-4 font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#12356b]"
              >
                {t("bookService")}
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href={`/${locale}/diagnosis`}
                className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-4 font-semibold text-white/80 transition-colors hover:border-[#18a999] hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                {t("allServices")}
              </Link>

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
}