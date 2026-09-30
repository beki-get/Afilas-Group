"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminApi";
import Pagination from "./Pagination";

type BlogStatus = "DRAFT" | "PUBLISHED";
type BlogPillar = "HOSPITAL" | "DIAGNOSIS" | "PHARMA";

type BlogPost = {
  id: string;
  pillar: BlogPillar;
  title: string;
  slug: string;
  content: string;
  coverImageUrl?: string | null;
  status: BlogStatus;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

type BlogListResponse = {
  posts: BlogPost[];
  total: number;
  page: number;
  totalPages: number;
};

const statusClasses: Record<BlogStatus, string> = {
  DRAFT:
    "border border-[var(--admin-border)] bg-[var(--admin-hover-bg)] text-[var(--admin-text-secondary)]",
  PUBLISHED: "border border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
};

export default function BlogAdminList({
  pillar,
  title,
  newHref,
}: {
  pillar: BlogPillar;
  title: string;
  newHref: string;
}) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<"ALL" | BlogStatus>("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPosts = async () => {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          pillar,
          page: String(page),
          limit: "10",
        });

        if (statusFilter !== "ALL") {
          params.set("status", statusFilter);
        }

        if (search.trim()) {
          params.set("search", search.trim());
        }

        const response = await adminFetch<BlogListResponse>(
          `/api/admin/blog?${params.toString()}`,
          {
            method: "GET",
            signal: controller.signal,
          },
        );

        setPosts(response.posts);
        setTotalPages(response.totalPages || 1);
      } catch (loadError) {
        if (
          !(
            loadError instanceof DOMException && loadError.name === "AbortError"
          )
        ) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Failed to load blog posts",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    const timeoutId = setTimeout(fetchPosts, 200);

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [page, pillar, search, statusFilter]);

  const handleDelete = async (id: string) => {
    const shouldDelete = window.confirm("Delete this blog post?");
    if (!shouldDelete) return;

    try {
      await adminFetch(`/api/admin/blog/${id}`, { method: "DELETE" });
      setPosts((current) => current.filter((post) => post.id !== id));
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Failed to delete blog post",
      );
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel)] p-5 shadow-[0_0_0_1px_rgba(17,24,39,0.02)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--admin-text-muted)]">
              Content
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-[var(--admin-text-primary)]">
              {title}
            </h1>
          </div>
          <Link
            href={newHref}
            className="inline-flex items-center justify-center rounded-md bg-[var(--admin-accent-bg)] px-4 py-2 text-sm font-medium text-[var(--admin-accent-text)] transition hover:opacity-90"
          >
            + New post
          </Link>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <input
            value={search}
            onChange={(event) => {
              setPage(1);
              setSearch(event.target.value);
            }}
            placeholder="Search posts"
            className="w-full rounded-md border border-[var(--admin-border)] bg-[var(--admin-card)] px-3 py-2 text-sm text-[var(--admin-text-primary)] outline-none ring-0 placeholder:text-[var(--admin-text-muted)] focus:border-[var(--admin-accent)]"
          />
          <select
            value={statusFilter}
            onChange={(event) => {
              setPage(1);
              setStatusFilter(event.target.value as "ALL" | BlogStatus);
            }}
            className="rounded-md border border-[var(--admin-border)] bg-black px-3 py-2 text-sm text-[var(--admin-text-primary)] outline-none focus:border-[var(--admin-accent)]"
          >
            <option value="ALL">All</option>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel)]">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-[var(--admin-text-primary)]">
            <thead className="bg-[var(--admin-card)] text-[var(--admin-text-secondary)]">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Updated</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-[var(--admin-text-secondary)]"
                  >
                    Loading posts...
                  </td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-[var(--admin-text-secondary)]"
                  >
                    No posts found.
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-t border-[var(--admin-border)]"
                  >
                    <td className="px-4 py-4 align-top">
                      <div className="space-y-1">
                        <Link
                          href={`${newHref.replace(/\/new$/, "")}/${post.id}/edit`}
                          className="font-medium text-[var(--admin-text-primary)] hover:text-[var(--admin-accent)]"
                        >
                          {post.title}
                        </Link>
                        <div className="text-xs text-[var(--admin-text-muted)]">
                          /{post.slug}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusClasses[post.status]}`}
                      >
                        {post.status === "PUBLISHED" ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-4 align-top text-[var(--admin-text-secondary)]">
                      {new Date(post.updatedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`${newHref.replace(/\/new$/, "")}/${post.id}/edit`}
                          className="rounded-md border border-[var(--admin-border)] px-3 py-2 text-xs font-medium text-[var(--admin-text-primary)] transition hover:bg-[var(--admin-hover-bg)]"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(post.id)}
                          className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-200 transition hover:bg-red-500/20"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-[var(--admin-border)] bg-[var(--admin-card)] px-4 py-3">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={(nextPage) => setPage(nextPage)}
          />
        </div>
      </div>
    </div>
  );
}
