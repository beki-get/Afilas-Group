"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminFetch } from "@/lib/adminApi";

type BlogStatus = "DRAFT" | "PUBLISHED";
type BlogPillar = "HOSPITAL" | "DIAGNOSIS" | "PHARMA";

type BlogFormState = {
  title: string;
  coverImageUrl: string;
  content: string;
  status: BlogStatus;
};

export default function BlogPostForm({
  pillar,
  listHref,
  initialData,
  blogId,
}: {
  pillar: BlogPillar;
  listHref: string;
  initialData?: Partial<BlogFormState>;
  blogId?: string;
}) {
  const router = useRouter();
  const isEdit = Boolean(blogId);
  const [form, setForm] = useState<BlogFormState>({
    title: initialData?.title ?? "",
    coverImageUrl: initialData?.coverImageUrl ?? "",
    content: initialData?.content ?? "",
    status: initialData?.status ?? "DRAFT",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const willPublish =
    form.status === "PUBLISHED" &&
    (!isEdit || initialData?.status !== "PUBLISHED");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const formData = new FormData();

formData.append("title", form.title);
formData.append("content", form.content);
formData.append("status", form.status);
formData.append("pillar", pillar);

if (form.coverImageUrl.trim()) {
  formData.append("coverImageUrl", form.coverImageUrl.trim());
}

if (selectedImage) {
  formData.append("image", selectedImage);
}

      if (isEdit && blogId) {
  await adminFetch(`/api/admin/blog/${blogId}`, {
    method: "PATCH",
    body: formData,
  });
} else {
  await adminFetch("/api/admin/blog", {
    method: "POST",
    body: formData,
  });
}

      router.push(listHref);
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Failed to save blog post",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel)] p-5"
    >
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--admin-text-muted)]">
            Blog
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-[var(--admin-text-primary)]">
            {isEdit ? "Edit post" : "Create post"}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push(listHref)}
            className="rounded-md border border-[var(--admin-border)] px-4 py-2 text-sm text-[var(--admin-text-primary)] hover:bg-[var(--admin-hover-bg)]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-[var(--admin-accent-bg)] px-4 py-2 text-sm font-medium text-[var(--admin-accent-text)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? willPublish
                ? "Publishing..."
                : isEdit
                  ? "Saving..."
                  : "Creating..."
              : willPublish
                ? isEdit
                  ? "Publish post"
                  : "Create and publish"
                : isEdit
                  ? "Save changes"
                  : "Create post"}
          </button>
        </div>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-[var(--admin-text-primary)]">
            Title
          </span>
          <input
            value={form.title}
            onChange={(event) =>
              setForm((current) => ({ ...current, title: event.target.value }))
            }
            placeholder="Post title"
            className="w-full rounded-md border border-[var(--admin-border)] bg-[var(--admin-card)] px-3 py-2 text-sm text-[var(--admin-text-primary)] outline-none placeholder:text-[var(--admin-text-muted)] focus:border-[var(--admin-accent)]"
            required
          />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-[var(--admin-text-primary)]">
            Cover image URL
          </span>
          <input
            value={form.coverImageUrl}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                coverImageUrl: event.target.value,
              }))
            }
            placeholder="https://example.com/image.jpg"
            className="w-full rounded-md border border-[var(--admin-border)] bg-[var(--admin-card)] px-3 py-2 text-sm text-[var(--admin-text-primary)] outline-none placeholder:text-[var(--admin-text-muted)] focus:border-[var(--admin-accent)]"
          />
        </label>
        <label className="space-y-2 md:col-span-2">
  <span className="text-sm font-medium text-[var(--admin-text-primary)]">
    Upload Blog Image
  </span>

  <input
    type="file"
    accept="image/jpeg,image/png,image/webp"
    onChange={(event) =>
      setSelectedImage(event.target.files?.[0] ?? null)
    }
    className="w-full rounded-md border border-[var(--admin-border)] bg-[var(--admin-card)] px-3 py-2 text-sm text-[var(--admin-text-primary)]"
  />

  {selectedImage && (
    <p className="text-xs text-[var(--admin-text-secondary)]">
      Selected: {selectedImage.name}
    </p>
  )}
</label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-[var(--admin-text-primary)]">
            Status
          </span>
          <select
            value={form.status}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                status: event.target.value as BlogStatus,
              }))
            }
            className="w-full rounded-md border border-[var(--admin-border)] bg-[var(--admin-card)] px-3 py-2 text-sm text-[var(--admin-text-primary)] outline-none focus:border-[var(--admin-accent)]"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </label>

        <div className="space-y-2">
          <span className="text-sm font-medium text-[var(--admin-text-primary)]">
            Pillar
          </span>
          <div className="rounded-md border border-[var(--admin-border)] bg-[var(--admin-card)] px-3 py-2 text-sm text-[var(--admin-text-primary)]">
            {pillar}
          </div>
        </div>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-[var(--admin-text-primary)]">
            Content
          </span>
          <textarea
            value={form.content}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                content: event.target.value,
              }))
            }
            rows={12}
            placeholder="Write your article content here..."
            className="w-full rounded-md border border-[var(--admin-border)] bg-[var(--admin-card)] px-3 py-2 text-sm text-[var(--admin-text-primary)] outline-none placeholder:text-[var(--admin-text-muted)] focus:border-[var(--admin-accent)]"
            required
          />
        </label>
      </div>
    </form>
  );
}
