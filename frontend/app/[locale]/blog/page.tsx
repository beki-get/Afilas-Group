"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  CalendarDays,
  Building2,
  FlaskConical,
  Factory,
  BookOpen,
} from "lucide-react";

import { BLOG_POSTS } from "@/lib/blog";
import type { BlogPost, BlogCategory } from "@/lib/blog";

type Category = "all" | BlogCategory;

const CATEGORY_ICONS = {
  hospital: Building2,
  diagnosis: FlaskConical,
  manufacturing: Factory,
};

export default function BlogPage() {
  const t = useTranslations("Blog");

  const [activeCategory, setActiveCategory] =
    useState<Category>("all");

  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") {
      return BLOG_POSTS;
    }

    return BLOG_POSTS.filter(
      (post: BlogPost) => post.category === activeCategory
    );
  }, [activeCategory]);

  const categories: {
    key: Category;
    label: string;
  }[] = [
    {
      key: "all",
      label: t("all"),
    },
    {
      key: "hospital",
      label: t("hospital"),
    },
    {
      key: "diagnosis",
      label: t("diagnosis"),
    },
    {
      key: "manufacturing",
      label: t("manufacturing"),
    },
  ];

  return (
    <main className="min-h-screen bg-[#f4f8fc] text-[#1f2a24] dark:bg-[#061a38] dark:text-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#071f46]">
        <div className="absolute inset-0">
          <Image
            src="/images/hospital/hospital-hero1.jpg"
            alt="Afilas healthcare"
            fill
            priority
            className="object-cover opacity-30"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#041633]/95 via-[#071f46]/85 to-[#071f46]/65" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#18a999]/40 bg-[#18a999]/10 px-4 py-2 text-sm font-medium text-[#65d7ca] backdrop-blur-sm">
              <BookOpen className="h-4 w-4" />
              Afilas Group
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t("title")}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* BLOG CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* CATEGORY FILTER */}
        <div className="mb-12 flex flex-wrap gap-3">
          {categories.map((category) => {
            const active = activeCategory === category.key;

            return (
              <button
                key={category.key}
                type="button"
                onClick={() =>
                  setActiveCategory(category.key)
                }
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                  active
                    ? "bg-[#18a999] text-white shadow-lg shadow-[#18a999]/20"
                    : "border border-slate-200 bg-white text-slate-700 hover:border-[#18a999] hover:text-[#18a999] dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:border-[#18a999] dark:hover:text-[#65d7ca]"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {/* SECTION TITLE */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#18a999]">
            Afilas Group
          </p>

          <h2 className="text-3xl font-bold sm:text-4xl">
            {t("latestArticles")}
          </h2>
        </div>

        {/* POSTS */}
        {filteredPosts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => {
              const Icon = CATEGORY_ICONS[post.category];

              return (
                <article
                  key={post.id}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-[#0b294f]"
                >
                  {/* IMAGE */}
                  <div className="relative h-60 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* CATEGORY */}
                    <div className="absolute left-5 top-5">
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#071f46]/90 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm">
                        <Icon className="h-4 w-4 text-[#65d7ca]" />

                        {t(post.category)}
                      </span>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-6">
                    {/* DATE */}
                    <div className="mb-4 flex items-center gap-2 text-sm text-slate-500 dark:text-white/50">
                      <CalendarDays className="h-4 w-4" />

                      <span>
                        {new Date(post.date).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>

                    {/* TITLE */}
                    <h3 className="line-clamp-2 text-xl font-bold leading-snug transition-colors group-hover:text-[#18a999]">
                      {post.title}
                    </h3>

                    {/* EXCERPT */}
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-white/65">
                      {post.excerpt}
                    </p>

                    {/* READ ARTICLE */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-6 inline-flex items-center gap-2 font-semibold text-[#18a999] transition-all hover:gap-3"
                    >
                      {t("readArticle")}

                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* NO ARTICLES */
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center dark:border-white/10 dark:bg-white/5">
            <BookOpen className="mx-auto h-12 w-12 text-[#18a999]" />

            <p className="mt-4 text-lg font-semibold">
              {t("noArticles")}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}