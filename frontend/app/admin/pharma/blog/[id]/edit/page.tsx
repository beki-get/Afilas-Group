"use client";

import { use, useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminApi";
import BlogPostForm from "../../../../components/BlogPostForm";

type BlogPost = {
  id: string;
  pillar: "HOSPITAL" | "DIAGNOSIS" | "PHARMA";
  title: string;
  slug: string;
  content: string;
  coverImageUrl?: string | null;
  status: "DRAFT" | "PUBLISHED";
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function EditPharmaBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [initialData, setInitialData] = useState<Partial<BlogPost> | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPost = async () => {
      try {
        const post = await adminFetch<BlogPost>(`/api/admin/blog/${id}`);
        setInitialData(post);
      } catch (loadError) {
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Failed to load blog post",
        );
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel)] p-6 text-[var(--admin-text-secondary)]">
        Loading post...
      </div>
    );
  }

  if (error || !initialData) {
    return (
      <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-6 text-red-200">
        {error || "Post not found."}
      </div>
    );
  }

  return (
    <BlogPostForm
      pillar="PHARMA"
      listHref="/admin/pharma/blog"
      blogId={id}
      initialData={{
        title: initialData.title,
        coverImageUrl: initialData.coverImageUrl ?? "",
        content: initialData.content,
        status: initialData.status,
      }}
    />
  );
}
