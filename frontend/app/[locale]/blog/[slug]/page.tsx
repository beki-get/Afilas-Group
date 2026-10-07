"use client";

import { useEffect, useState } from "react";
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
  BookOpen,
} from "lucide-react";

type BackendBlogPost = {
  id: string;
  pillar: "HOSPITAL" | "DIAGNOSIS" | "PHARMA";
  title: string;
  slug: string;
  content: string;
  coverImageUrl: string | null;
  status: "DRAFT" | "PUBLISHED";
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

const DEFAULT_IMAGES = {
  HOSPITAL: "/images/hospital/hospital-hero1.jpg",
  DIAGNOSIS: "/images/diagnosis/diagnosis-hero1.jpg",
  PHARMA: "/images/manufacturing/manufacture11.jpg",
};

const getCategoryName = (
  pillar: BackendBlogPost["pillar"]
) => {
  switch (pillar) {
    case "HOSPITAL":
      return "hospital";

    case "DIAGNOSIS":
      return "diagnosis";

    case "PHARMA":
      return "manufacturing";
  }
};

export default function BlogArticlePage() {
  const params = useParams();
  const t = useTranslations("Blog");

  const slug = params.slug as string;
  console.log("FRONTEND SLUG:", slug);

  const [post, setPost] = useState<BackendBlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); 

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(
          `${API_BASE}/api/blog/${slug}`
        );

        if (!response.ok) {
          throw new Error("Blog post not found");
        }

        const result = await response.json();

        if (!result.success || !result.data) {
          throw new Error("Invalid blog response");
        }

        setPost(result.data);
      } catch (error) {
        console.error("Failed to fetch blog article:", error);
        setError(true);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  // -----------------------------
  // LOADING
  // -----------------------------

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f8fc] px-6 dark:bg-[#061a38]">
        <div className="text-center">
          <BookOpen className="mx-auto h-12 w-12 animate-pulse text-[#18a999]" />

          <p className="mt-4 text-lg font-semibold text-[#071f46] dark:text-white">
            Loading article...
          </p>
        </div>
      </main>
    );
  }

  // -----------------------------
  // ARTICLE NOT FOUND / ERROR
  // -----------------------------

  if (error || !post) {
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

  const category = getCategoryName(post.pillar);

 const image = post.coverImageUrl
  ? post.coverImageUrl.startsWith("/uploads/")
    ? `${API_BASE}${post.coverImageUrl}`
    : post.coverImageUrl
  : DEFAULT_IMAGES[post.pillar];

  const publishedDate =
    post.publishedAt || post.createdAt;

  return (
    <main className="min-h-screen bg-[#f4f8fc] dark:bg-[#061a38]">
      {/* HERO IMAGE */}
      <section className="relative h-[420px] overflow-hidden">
        <Image
          src={image}
          alt={post.title}
          fill
          priority
          unoptimized
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#041633]/95 via-[#071f46]/60 to-[#071f46]/20" />

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-5xl px-6 pb-12 lg:px-8">
          {/* CATEGORY */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#18a999] px-4 py-2 text-sm font-semibold text-white">
            {post.pillar === "HOSPITAL" && (
              <Building2 className="h-4 w-4" />
            )}

            {post.pillar === "DIAGNOSIS" && (
              <FlaskConical className="h-4 w-4" />
            )}

            {post.pillar === "PHARMA" && (
              <Factory className="h-4 w-4" />
            )}

            {t(category)}
          </div>

          {/* TITLE */}
          <h1 className="max-w-4xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          {/* DATE */}
          <div className="mt-5 flex items-center gap-2 text-sm text-white/70">
            <CalendarDays className="h-4 w-4" />

            {new Date(publishedDate).toLocaleDateString(
              "en-US",
              {
                month: "long",
                day: "numeric",
                year: "numeric",
              }
            )}
          </div>
        </div>
      </section>

      {/* ARTICLE */}
      <article className="mx-auto max-w-4xl px-6 py-14 lg:px-8">
        {/* BACK TO BLOG */}
        <Link
          href="/blog"
          className="mb-10 inline-flex items-center gap-2 font-semibold text-[#18a999] transition-all hover:gap-3"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("backToBlog")}
        </Link>

        {/* CONTENT */}
        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10 dark:border-white/10 dark:bg-[#0b294f]">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            {post.content
              .split("\n")
              .filter((paragraph) => paragraph.trim() !== "")
              .map((paragraph, index) => (
                <p
                  key={index}
                  className="mb-6 whitespace-pre-line text-base leading-8 text-slate-700 last:mb-0 dark:text-white/75"
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