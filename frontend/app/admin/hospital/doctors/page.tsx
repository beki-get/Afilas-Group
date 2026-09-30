"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import Pagination from "../../components/Pagination";
import { adminFetch } from "../../../../lib/adminApi";

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type Department = { id: string; name: string };
type WorkingHour = { day: string; start: string; end: string };

type Doctor = {
  id: string;
  name: string;
  department: string;
  phone: string | null;
  photoUrl: string | null;
  workingHours: WorkingHour[] | null;
  isActive: boolean;
};

type DoctorForm = {
  name: string;
  department: string;
  phone: string;
  photoUrl: string;
};

const emptyForm: DoctorForm = {
  name: "",
  department: "",
  phone: "",
  photoUrl: "",
};

const formatWorkingHours = (hours: WorkingHour[] | null) =>
  hours?.length
    ? hours
        .map(({ day, start, end }) => `${day.slice(0, 3)} ${start}–${end}`)
        .join(", ")
    : "-";

export default function DoctorsAdminPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [workingHours, setWorkingHours] = useState<WorkingHour[]>([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState<DoctorForm>(emptyForm);
  const [editing, setEditing] = useState<Doctor | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminFetch<Department[]>("/api/departments")
      .then(setDepartments)
      .catch(() => setDepartments([]))
      .finally(() => setLoadingDepartments(false));
  }, []);

  const loadDoctors = useCallback(async () => {
    setLoading(true);
    setError("");
    const params = new URLSearchParams({ page: String(page), limit: "10" });
    if (search) params.set("search", search);
    if (department) params.set("department", department);

    try {
      const result = await adminFetch<{
        doctors: Doctor[];
        total: number;
        totalPages: number;
      }>(`/api/admin/doctors?${params.toString()}`);
      setDoctors(result.doctors);
      setTotal(result.total);
      setTotalPages(result.totalPages);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Failed to load doctors",
      );
    } finally {
      setLoading(false);
    }
  }, [department, page, search]);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadDoctors(), search ? 350 : 0);
    return () => window.clearTimeout(timer);
  }, [loadDoctors, search]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setWorkingHours([]);
    setModalOpen(true);
  };

  const openEdit = (doctor: Doctor) => {
    setEditing(doctor);
    setForm({
      name: doctor.name,
      department: doctor.department,
      phone: doctor.phone || "",
      photoUrl: doctor.photoUrl || "",
    });
    setWorkingHours(doctor.workingHours || []);
    setModalOpen(true);
  };

  const saveDoctor = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      await adminFetch<Doctor>(
        editing ? `/api/admin/doctors/${editing.id}` : "/api/admin/doctors",
        {
          method: editing ? "PATCH" : "POST",
          body: JSON.stringify({
            ...form,
            photoUrl: form.photoUrl.trim() || null,
            workingHours,
          }),
        },
      );
      setModalOpen(false);
      await loadDoctors();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Failed to save doctor",
      );
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (doctor: Doctor) => {
    try {
      await adminFetch<Doctor>(`/api/admin/doctors/${doctor.id}`, {
        method: "PATCH",
        body: JSON.stringify({ isActive: !doctor.isActive }),
      });
      await loadDoctors();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Failed to update doctor",
      );
    }
  };

  return (
    <section className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Doctors</h1>
          <p className="mt-1 text-sm text-[var(--admin-text-secondary)]">
            Manage the doctors available for appointments. {total} total.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="rounded-md bg-[var(--admin-accent-bg)] px-4 py-2.5 text-sm font-medium text-[var(--admin-accent-text)] hover:bg-[var(--admin-hover-bg)]"
        >
          Add Doctor
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
          value={department}
          onChange={(event) => {
            setDepartment(event.target.value);
            setPage(1);
          }}
          className="rounded-md border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 text-sm text-[var(--admin-text-primary)] outline-none focus:border-[var(--admin-accent-text)] sm:max-w-xs"
        >
          <option value="">All departments</option>
          {departments.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
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
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="border-b border-[var(--admin-border)] bg-[var(--admin-bg)] text-xs uppercase tracking-wide text-[var(--admin-text-secondary)]">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Department</th>
                <th className="px-5 py-3">Phone</th>
                <th className="px-5 py-3">Working hours</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--admin-border)]">
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-[var(--admin-text-secondary)]"
                  >
                    Loading doctors...
                  </td>
                </tr>
              ) : doctors.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-[var(--admin-text-secondary)]"
                  >
                    No doctors found.
                  </td>
                </tr>
              ) : (
                doctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td className="px-5 py-4 font-medium text-[var(--admin-text-primary)]">
                      <div className="flex items-center gap-2.5">
                        {doctor.photoUrl ? (
                          <Image
                            src={doctor.photoUrl}
                            alt=""
                            width={32}
                            height={32}
                            unoptimized
                            className="size-8 rounded-full object-cover"
                          />
                        ) : (
                          <span
                            aria-hidden="true"
                            className="flex size-8 items-center justify-center rounded-full bg-[var(--admin-hover-bg)] text-xs font-medium text-[var(--admin-text-secondary)]"
                          >
                            {doctor.name.slice(0, 1).toUpperCase()}
                          </span>
                        )}
                        <span>{doctor.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-[var(--admin-text-secondary)]">
                      {doctor.department}
                    </td>
                    <td className="px-5 py-4 text-[var(--admin-text-secondary)]">
                      {doctor.phone || "-"}
                    </td>
                    <td className="px-5 py-4 text-[var(--admin-text-secondary)]">
                      {formatWorkingHours(doctor.workingHours)}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${doctor.isActive ? "bg-green-50 text-green-700" : "bg-[var(--admin-hover-bg)] text-[var(--admin-text-secondary)]"}`}
                      >
                        {doctor.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => openEdit(doctor)}
                          className="font-medium text-[var(--admin-text-primary)] underline"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => void toggleActive(doctor)}
                          className="font-medium text-[var(--admin-text-primary)] underline"
                        >
                          {doctor.isActive ? "Deactivate" : "Reactivate"}
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
                {editing ? "Edit Doctor" : "Add Doctor"}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)]"
              >
                Close
              </button>
            </div>
            <form onSubmit={saveDoctor} className="mt-5 space-y-4">
              <label className="block text-sm font-medium text-[var(--admin-text-primary)]">
                Name
                <input
                  required
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                  className="mt-1.5 w-full rounded-md border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 text-sm text-[var(--admin-text-primary)]"
                />
              </label>
              <label className="block text-sm font-medium text-[var(--admin-text-primary)]">
                Department
                <select
                  required
                  value={form.department}
                  onChange={(event) =>
                    setForm({ ...form, department: event.target.value })
                  }
                  className="mt-1.5 w-full rounded-md border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 text-sm text-[var(--admin-text-primary)]"
                >
                  <option value="">
                    {loadingDepartments ? "Loading..." : "Select department"}
                  </option>
                  {departments.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-medium text-[var(--admin-text-primary)]">
                Phone
                <input
                  required
                  value={form.phone}
                  onChange={(event) =>
                    setForm({ ...form, phone: event.target.value })
                  }
                  className="mt-1.5 w-full rounded-md border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 text-sm text-[var(--admin-text-primary)]"
                />
              </label>
              <label className="block text-sm font-medium text-[var(--admin-text-primary)]">
                Photo URL
                <input
                  type="url"
                  value={form.photoUrl}
                  onChange={(event) =>
                    setForm({ ...form, photoUrl: event.target.value })
                  }
                  placeholder="https://example.com/photo.jpg"
                  className="mt-1.5 w-full rounded-md border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 text-sm text-[var(--admin-text-primary)] placeholder:text-[var(--admin-text-secondary)]"
                />
              </label>
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Working Hours</h3>
                  <button
                    type="button"
                    onClick={() =>
                      setWorkingHours([
                        ...workingHours,
                        { day: "Monday", start: "09:00", end: "17:00" },
                      ])
                    }
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--admin-text-primary)] hover:text-[var(--admin-accent-text)]"
                  >
                    <Plus aria-hidden="true" className="size-4" />
                    Add another day
                  </button>
                </div>
                {workingHours.map((hours, index) => (
                  <div
                    key={`${index}-${hours.day}`}
                    className="grid grid-cols-[1fr_1fr_1fr_auto] items-end gap-2"
                  >
                    <label className="min-w-0 text-xs text-[var(--admin-text-secondary)]">
                      Day
                      <select
                        value={hours.day}
                        onChange={(event) =>
                          setWorkingHours(
                            workingHours.map((item, itemIndex) =>
                              itemIndex === index
                                ? { ...item, day: event.target.value }
                                : item,
                            ),
                          )
                        }
                        className="mt-1 w-full rounded-md border border-[var(--admin-border)] bg-[var(--admin-bg)] px-2 py-2 text-sm text-[var(--admin-text-primary)]"
                      >
                        {weekdays.map((day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="min-w-0 text-xs text-[var(--admin-text-secondary)]">
                      Start
                      <input
                        type="time"
                        value={hours.start}
                        onChange={(event) =>
                          setWorkingHours(
                            workingHours.map((item, itemIndex) =>
                              itemIndex === index
                                ? { ...item, start: event.target.value }
                                : item,
                            ),
                          )
                        }
                        className="mt-1 w-full rounded-md border border-[var(--admin-border)] bg-[var(--admin-bg)] px-2 py-2 text-sm text-[var(--admin-text-primary)]"
                      />
                    </label>
                    <label className="min-w-0 text-xs text-[var(--admin-text-secondary)]">
                      End
                      <input
                        type="time"
                        value={hours.end}
                        onChange={(event) =>
                          setWorkingHours(
                            workingHours.map((item, itemIndex) =>
                              itemIndex === index
                                ? { ...item, end: event.target.value }
                                : item,
                            ),
                          )
                        }
                        className="mt-1 w-full rounded-md border border-[var(--admin-border)] bg-[var(--admin-bg)] px-2 py-2 text-sm text-[var(--admin-text-primary)]"
                      />
                    </label>
                    <button
                      type="button"
                      aria-label={`Remove ${hours.day} hours`}
                      title="Remove day"
                      onClick={() =>
                        setWorkingHours(
                          workingHours.filter(
                            (_, itemIndex) => itemIndex !== index,
                          ),
                        )
                      }
                      className="mb-0.5 rounded-md p-2 text-[var(--admin-text-secondary)] hover:bg-[var(--admin-hover-bg)] hover:text-[var(--admin-text-primary)]"
                    >
                      <X aria-hidden="true" className="size-4" />
                    </button>
                  </div>
                ))}
              </section>
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
                  {saving ? "Saving..." : "Save Doctor"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
