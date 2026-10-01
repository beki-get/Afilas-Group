"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import { adminFetch } from "../../../../lib/adminApi";

type Department = { id: string; name: string };

type Service = {
  id: string;
  name: string;
  description: string | null;
  departmentId: string;
  department: { name: string };
  isActive: boolean;
};

type ServiceForm = {
  name: string;
  description: string;
  departmentId: string;
};

const emptyForm: ServiceForm = {
  name: "",
  description: "",
  departmentId: "",
};

const preview = (value: string | null) =>
  value ? `${value.slice(0, 60)}${value.length > 60 ? "..." : ""}` : "—";

export default function HospitalServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [search, setSearch] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState<ServiceForm>(emptyForm);
  const [editing, setEditing] = useState<Service | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminFetch<Department[]>("/api/admin/departments")
      .then(setDepartments)
      .catch(() => setDepartments([]))
      .finally(() => setLoadingDepartments(false));
  }, []);

  const loadServices = useCallback(async () => {
    setLoading(true);
    setError("");
    const params = new URLSearchParams({ page: String(page), limit: "10" });
    if (search.trim()) params.set("search", search.trim());
    if (departmentId) params.set("departmentId", departmentId);

    try {
      const result = await adminFetch<{
        services: Service[];
        total: number;
        totalPages: number;
      }>(`/api/admin/services?${params.toString()}`);
      setServices(result.services);
      setTotal(result.total);
      setTotalPages(result.totalPages || 1);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Failed to load services",
      );
    } finally {
      setLoading(false);
    }
  }, [departmentId, page, search]);

  useEffect(() => {
    const timer = window.setTimeout(
      () => void loadServices(),
      search ? 350 : 0,
    );
    return () => window.clearTimeout(timer);
  }, [loadServices, search]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (service: Service) => {
    setEditing(service);
    setForm({
      name: service.name,
      description: service.description || "",
      departmentId: service.departmentId,
    });
    setModalOpen(true);
  };

  const saveService = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      await adminFetch<Service>(
        editing ? `/api/admin/services/${editing.id}` : "/api/admin/services",
        {
          method: editing ? "PATCH" : "POST",
          body: JSON.stringify({
            name: form.name.trim(),
            description: form.description.trim() || null,
            departmentId: form.departmentId,
          }),
        },
      );
      setModalOpen(false);
      await loadServices();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Failed to save service",
      );
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (service: Service) => {
    setError("");
    try {
      await adminFetch<Service>(`/api/admin/services/${service.id}`, {
        method: "PATCH",
        body: JSON.stringify({ isActive: !service.isActive }),
      });
      await loadServices();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Failed to update service",
      );
    }
  };

  return (
    <section className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Services</h1>
          <p className="mt-1 text-sm text-[var(--admin-text-secondary)]">
            Manage hospital services by department. {total} total.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="rounded-md bg-[var(--admin-accent-bg)] px-4 py-2.5 text-sm font-medium text-[var(--admin-accent-text)] hover:bg-[var(--admin-hover-bg)]"
        >
          Add Service
        </button>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface)] p-4 sm:flex-row">
        <input
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          placeholder="Search by name"
          className="rounded-md border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 text-sm text-[var(--admin-text-primary)] outline-none placeholder:text-[var(--admin-text-secondary)] focus:border-[var(--admin-accent-text)] sm:max-w-xs"
        />
        <select
          value={departmentId}
          onChange={(event) => {
            setDepartmentId(event.target.value);
            setPage(1);
          }}
          className="rounded-md border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 text-sm text-[var(--admin-text-primary)] outline-none focus:border-[var(--admin-accent-text)] sm:max-w-xs"
        >
          <option value="">
            {loadingDepartments ? "Loading departments..." : "All departments"}
          </option>
          {departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="overflow-hidden rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b border-[var(--admin-border)] bg-[var(--admin-bg)] text-xs uppercase tracking-wide text-[var(--admin-text-secondary)]">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Department</th>
                <th className="px-5 py-3">Description</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--admin-border)]">
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center text-[var(--admin-text-secondary)]"
                  >
                    Loading services...
                  </td>
                </tr>
              ) : services.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center text-[var(--admin-text-secondary)]"
                  >
                    No services found.
                  </td>
                </tr>
              ) : (
                services.map((service) => (
                  <tr key={service.id}>
                    <td className="px-5 py-4 font-medium text-[var(--admin-text-primary)]">
                      {service.name}
                    </td>
                    <td className="px-5 py-4 text-[var(--admin-text-secondary)]">
                      {service.department.name}
                    </td>
                    <td className="max-w-xs px-5 py-4 text-[var(--admin-text-secondary)]">
                      {preview(service.description)}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${service.isActive ? "bg-green-50 text-green-700" : "bg-[var(--admin-hover-bg)] text-[var(--admin-text-secondary)]"}`}
                      >
                        {service.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => openEdit(service)}
                          className="font-medium text-[var(--admin-text-primary)] underline"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => void toggleActive(service)}
                          className="font-medium text-[var(--admin-text-primary)] underline"
                        >
                          {service.isActive ? "Deactivate" : "Reactivate"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-lg bg-[var(--admin-surface)] p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--admin-text-primary)]">
                {editing ? "Edit Service" : "Add Service"}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)]"
              >
                Close
              </button>
            </div>
            <form onSubmit={saveService} className="mt-5 space-y-4">
              <label className="block text-sm font-medium text-[var(--admin-text-primary)]">
                Department
                <select
                  required
                  value={form.departmentId}
                  onChange={(event) =>
                    setForm({ ...form, departmentId: event.target.value })
                  }
                  className="mt-1.5 w-full rounded-md border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 text-sm text-[var(--admin-text-primary)]"
                >
                  <option value="">
                    {loadingDepartments ? "Loading..." : "Select department"}
                  </option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-medium text-[var(--admin-text-primary)]">
                Name
                <input
                  required
                  autoFocus
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                  className="mt-1.5 w-full rounded-md border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 text-sm text-[var(--admin-text-primary)]"
                />
              </label>
              <label className="block text-sm font-medium text-[var(--admin-text-primary)]">
                Description
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(event) =>
                    setForm({ ...form, description: event.target.value })
                  }
                  className="mt-1.5 w-full rounded-md border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 text-sm text-[var(--admin-text-primary)]"
                />
              </label>
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
                  {saving ? "Saving..." : "Save Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
