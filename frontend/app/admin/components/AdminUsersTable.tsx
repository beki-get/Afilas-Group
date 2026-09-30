"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "../../../lib/adminApi";
import Pagination from "./Pagination";

type UserRecord = {
  fullName?: string;
  companyName?: string;
  contactPerson?: string;
  phone: string;
  email: string;
  totalBookings?: number;
  totalInquiries?: number;
  lastAppointmentDate?: string;
  lastInquiryDate?: string;
};

type UsersResponse = {
  users: UserRecord[];
  total: number;
  page: number;
  totalPages: number;
};

const formatDate = (value?: string) =>
  value ? new Date(value).toLocaleDateString() : "-";

export default function AdminUsersTable({
  endpoint,
  kind,
  title,
}: {
  endpoint: string;
  kind: "patients" | "pharma";
  title: string;
}) {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const timer = window.setTimeout(
      () => {
        const params = new URLSearchParams({ page: String(page), limit: "10" });
        if (search) params.set("search", search);
        setLoading(true);
        setError("");

        adminFetch<UsersResponse>(`${endpoint}?${params.toString()}`)
          .then((result) => {
            if (!active) return;
            setUsers(result.users);
            setTotal(result.total);
            setTotalPages(result.totalPages);
          })
          .catch((requestError: unknown) => {
            if (!active) return;
            setError(
              requestError instanceof Error
                ? requestError.message
                : `Failed to load ${title.toLowerCase()}`,
            );
          })
          .finally(() => {
            if (active) setLoading(false);
          });
      },
      search ? 350 : 0,
    );

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [endpoint, page, search, title]);

  const columns =
    kind === "patients"
      ? [
          { label: "Name", value: (user: UserRecord) => user.fullName || "-" },
          { label: "Phone", value: (user: UserRecord) => user.phone },
          { label: "Email", value: (user: UserRecord) => user.email },
          {
            label: "Total Bookings",
            value: (user: UserRecord) => user.totalBookings ?? 0,
          },
          {
            label: "Last Appointment Date",
            value: (user: UserRecord) => formatDate(user.lastAppointmentDate),
          },
        ]
      : [
          {
            label: "Company Name",
            value: (user: UserRecord) => user.companyName || "-",
          },
          {
            label: "Contact Person",
            value: (user: UserRecord) => user.contactPerson || "-",
          },
          { label: "Phone", value: (user: UserRecord) => user.phone },
          { label: "Email", value: (user: UserRecord) => user.email },
          {
            label: "Total Inquiries",
            value: (user: UserRecord) => user.totalInquiries ?? 0,
          },
          {
            label: "Last Inquiry Date",
            value: (user: UserRecord) => formatDate(user.lastInquiryDate),
          },
        ];

  return (
    <section className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="mt-1 text-sm text-[var(--admin-text-secondary)]">
          {total} total
        </p>
      </div>

      <input
        type="search"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          setPage(1);
        }}
        placeholder={
          kind === "patients"
            ? "Search name or phone"
            : "Search company, contact, or phone"
        }
        className="w-full max-w-sm rounded-md border border-[var(--admin-border)] bg-[var(--admin-surface)] px-3 py-2 text-sm text-[var(--admin-text-primary)] outline-none placeholder:text-[var(--admin-text-secondary)] focus:border-[var(--admin-accent-text)]"
      />

      {error && (
        <p
          role="alert"
          className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      <div className="overflow-x-auto rounded-md border border-[var(--admin-border)] bg-[var(--admin-surface)]">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-[var(--admin-border)] bg-[var(--admin-bg)] text-xs uppercase tracking-wide text-[var(--admin-text-secondary)]">
            <tr>
              {columns.map((column) => (
                <th key={column.label} className="px-4 py-3">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--admin-border)]">
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-10 text-center text-[var(--admin-text-secondary)]"
                >
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-10 text-center text-[var(--admin-text-secondary)]"
                >
                  No records found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.phone}>
                  {columns.map((column) => (
                    <td key={column.label} className="px-4 py-3">
                      {column.value(user)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="p-4">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </section>
  );
}
