"use client";

import { FormEvent, useEffect, useState } from "react";
import { adminFetch } from "../../../lib/adminApi";

type LookupItem = {
  id: string;
  name: string;
  description?: string | null;
  isActive: boolean;
};

export default function LookupManagement({
  endpoint,
  title,
  addLabel,
  showDescription = false,
}: {
  endpoint: string;
  title: string;
  addLabel: string;
  showDescription?: boolean;
}) {
  const [items, setItems] = useState<LookupItem[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editing, setEditing] = useState<LookupItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadItems = async () => {
    setLoading(true);
    setError("");
    try {
      setItems(await adminFetch<LookupItem[]>(endpoint));
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : `Failed to load ${title.toLowerCase()}`,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    adminFetch<LookupItem[]>(endpoint)
      .then((result) => {
        if (mounted) setItems(result);
      })
      .catch((requestError: unknown) => {
        if (!mounted) return;
        setError(
          requestError instanceof Error
            ? requestError.message
            : `Failed to load ${title.toLowerCase()}`,
        );
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [endpoint, title]);

  const openCreate = () => {
    setEditing(null);
    setName("");
    setDescription("");
    setModalOpen(true);
  };

  const openEdit = (item: LookupItem) => {
    setEditing(item);
    setName(item.name);
    setDescription(item.description || "");
    setModalOpen(true);
  };

  const saveItem = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      await adminFetch<LookupItem>(
        editing ? `${endpoint}/${editing.id}` : endpoint,
        {
          method: editing ? "PATCH" : "POST",
          body: JSON.stringify({
            name: name.trim(),
            ...(showDescription ? { description: description.trim() } : {}),
          }),
        },
      );
      setModalOpen(false);
      await loadItems();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : `Failed to save ${title.toLowerCase()}`,
      );
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (item: LookupItem) => {
    setError("");
    try {
      await adminFetch<LookupItem>(`${endpoint}/${item.id}`, {
        method: "PATCH",
        body: JSON.stringify({ isActive: !item.isActive }),
      });
      await loadItems();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : `Failed to update ${title.toLowerCase()}`,
      );
    }
  };

  return (
    <section className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <button
          type="button"
          onClick={openCreate}
          className="rounded-md bg-[var(--admin-accent-bg)] px-4 py-2.5 text-sm font-medium text-[var(--admin-accent-text)] hover:bg-[var(--admin-hover-bg)]"
        >
          {addLabel}
        </button>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      <div className="overflow-hidden rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface)]">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[var(--admin-border)] bg-[var(--admin-bg)] text-xs uppercase tracking-wide text-[var(--admin-text-secondary)]">
            <tr>
              <th className="px-5 py-3">Name</th>
              {showDescription && <th className="px-5 py-3">Description</th>}
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--admin-border)]">
            {loading ? (
              <tr>
                <td
                  colSpan={showDescription ? 4 : 3}
                  className="px-5 py-10 text-center text-[var(--admin-text-secondary)]"
                >
                  Loading...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td
                  colSpan={showDescription ? 4 : 3}
                  className="px-5 py-10 text-center text-[var(--admin-text-secondary)]"
                >
                  No items found.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id}>
                  <td className="px-5 py-4 font-medium text-[var(--admin-text-primary)]">
                    {item.name}
                  </td>
                  {showDescription && (
                    <td className="max-w-xs px-5 py-4 text-[var(--admin-text-secondary)]">
                      {item.description
                        ? `${item.description.slice(0, 60)}${item.description.length > 60 ? "..." : ""}`
                        : "—"}
                    </td>
                  )}
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        item.isActive
                          ? "bg-green-50 text-green-700"
                          : "bg-[var(--admin-hover-bg)] text-[var(--admin-text-secondary)]"
                      }`}
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => openEdit(item)}
                        className="font-medium text-[var(--admin-text-primary)] underline"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => void toggleActive(item)}
                        className="font-medium text-[var(--admin-text-primary)] underline"
                      >
                        {item.isActive ? "Deactivate" : "Reactivate"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-lg bg-[var(--admin-surface)] p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--admin-text-primary)]">
                {editing ? `Edit ${title.replace(/s$/, "")}` : addLabel}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-sm text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)]"
              >
                Close
              </button>
            </div>
            <form onSubmit={saveItem} className="mt-5 space-y-4">
              <label className="block text-sm font-medium">
                Name
                <input
                  required
                  autoFocus
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-1.5 w-full rounded-md border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 text-sm text-[var(--admin-text-primary)]"
                />
              </label>
              {showDescription && (
                <label className="block text-sm font-medium">
                  Description
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    className="mt-1.5 w-full rounded-md border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 text-sm text-[var(--admin-text-primary)]"
                  />
                </label>
              )}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-md border border-[var(--admin-border)] bg-[var(--admin-surface)] px-4 py-2 text-sm text-[var(--admin-text-primary)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-md bg-[var(--admin-accent-bg)] px-4 py-2 text-sm text-[var(--admin-accent-text)] disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
