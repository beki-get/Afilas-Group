"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  Hospital,
  FlaskConical,
  Factory,
  CalendarDays,
  Info,
  Phone,
} from "lucide-react";

type SearchItem = {
  title: string;
  description: string;
  href: string;
  keywords: string[];
  icon: React.ReactNode;
};

export default function SearchPage() {
  const t = useTranslations("Search");
  const searchParams = useSearchParams();

  const query = searchParams.get("q")?.trim() || "";

  const searchItems: SearchItem[] = [
    {
      title: t("results.hospital.title"),
      description: t("results.hospital.description"),
      href: "/hospital",
      keywords: ["hospital", "healthcare", "doctor", "medical"],
      icon: <Hospital className="h-6 w-6" />,
    },
    {
      title: t("results.diagnosis.title"),
      description: t("results.diagnosis.description"),
      href: "/diagnosis",
      keywords: ["diagnosis", "laboratory", "test", "medical"],
      icon: <FlaskConical className="h-6 w-6" />,
    },
    {
      title: t("results.manufacturing.title"),
      description: t("results.manufacturing.description"),
      href: "/pharma",
      keywords: ["manufacturing", "pharmacy", "medicine", "drug"],
      icon: <Factory className="h-6 w-6" />,
    },
    {
      title: t("results.appointment.title"),
      description: t("results.appointment.description"),
      href: "/book",
      keywords: ["appointment", "booking", "doctor", "schedule"],
      icon: <CalendarDays className="h-6 w-6" />,
    },
    {
      title: t("results.about.title"),
      description: t("results.about.description"),
      href: "/about",
      keywords: ["about", "afilas", "company", "healthcare"],
      icon: <Info className="h-6 w-6" />,
    },
    {
      title: t("results.contact.title"),
      description: t("results.contact.description"),
      href: "/contact",
      keywords: ["contact", "phone", "email", "location"],
      icon: <Phone className="h-6 w-6" />,
    },
  ];

  const results = useMemo(() => {
    if (!query) {
      return searchItems;
    }

    const normalizedQuery = query.toLowerCase();

    return searchItems.filter((item) => {
      const searchableText = [
        item.title,
        item.description,
        ...item.keywords,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [query]);

  return (
    <main className="min-h-screen bg-[#FBFAF7] pt-32 dark:bg-[#071f46]">
      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        {/* HEADER */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#18a999]/10 text-[#18a999]">
            <Search className="h-7 w-7" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[#071f46] dark:text-white sm:text-4xl">
            {query
              ? t("titleWithQuery", { query })
              : t("title")}
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-white/65">
            {query
              ? t("descriptionWithQuery")
              : t("description")}
          </p>
        </div>

        {/* RESULTS */}
        {results.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {results.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#18a999]/40 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#18a999]/10 text-[#18a999] transition-colors group-hover:bg-[#18a999] group-hover:text-white">
                    {item.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-semibold text-[#071f46] dark:text-white">
                      {item.title}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-white/60">
                      {item.description}
                    </p>

                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#18a999]">
                      {t("viewPage")}

                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* NO RESULTS */
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-white/10 dark:text-white/50">
              <Search className="h-7 w-7" />
            </div>

            <h2 className="text-xl font-semibold text-[#071f46] dark:text-white">
              {t("noResults")}
            </h2>

            <p className="mx-auto mt-2 max-w-lg text-sm text-slate-600 dark:text-white/60">
              {t("tryAgain")}
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {["hospital", "diagnosis", "appointment", "pharmacy"].map(
                (suggestion) => (
                  <span
                    key={suggestion}
                    className="rounded-full bg-[#18a999]/10 px-4 py-2 text-sm font-medium text-[#18a999]"
                  >
                    {suggestion}
                  </span>
                )
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}