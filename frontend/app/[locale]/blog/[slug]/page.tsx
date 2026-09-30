"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  ArrowLeft,
  CalendarDays,
  Building2,
  FlaskConical,
  Factory,
} from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog";


export default function BlogArticlePage() {
  const params = useParams();
  const t = useTranslations("Blog");

  const slug = params.slug as string;

  const post = BLOG_POSTS.find((item) => item.slug === slug);
  if (!post) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f8fc] px-6 dark:bg-[#061a38]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#071f46] dark:text-white">
            {t("articleNotFound")}
          </h1>

          <p className="mt-4 text-slate-600 dark:text-white/60">
             {t("articleNotFoundDescription")}
          </p>

          <Link
            href="/blog"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#18a999] px-6 py-3 font-semibold text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToBlog")}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f8fc] dark:bg-[#061a38]">
      {/* HERO IMAGE */}
      <section className="relative h-[420px] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#041633]/95 via-[#071f46]/60 to-[#071f46]/20" />

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-5xl px-6 pb-12 lg:px-8">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#18a999] px-4 py-2 text-sm font-semibold text-white">
            {post.category === "hospital" && (
              <Building2 className="h-4 w-4" />
            )}

            {post.category === "diagnosis" && (
              <FlaskConical className="h-4 w-4" />
            )}

            {post.category === "manufacturing" && (
              <Factory className="h-4 w-4" />
            )}

             {post.category === "hospital" && t("hospital")}
             {post.category === "diagnosis" && t("diagnosis")}
             {post.category === "manufacturing" && t("manufacturing")}
          </div>

          <h1 className="max-w-4xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <div className="mt-5 flex items-center gap-2 text-sm text-white/70">
            <CalendarDays className="h-4 w-4" />

            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>
      </section>

      {/* ARTICLE */}
      <article className="mx-auto max-w-4xl px-6 py-14 lg:px-8">
        <Link
          href="/blog"
          className="mb-10 inline-flex items-center gap-2 font-semibold text-[#18a999] transition-all hover:gap-3"
        >
          <ArrowLeft className="h-4 w-4" />
            {t("backToBlog")}
        </Link>

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10 dark:border-white/10 dark:bg-[#0b294f]">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            {post.content.map((paragraph, index) => (
              <p
                key={index}
                className="mb-6 text-base leading-8 text-slate-700 last:mb-0 dark:text-white/75"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}