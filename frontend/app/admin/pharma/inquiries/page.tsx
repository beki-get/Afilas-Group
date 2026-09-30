"use client";

import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import { adminFetch } from "../../../../lib/adminApi";

const statuses = ["NEW", "CONTACTED", "CLOSED"];

type Inquiry = {
  id: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  interestArea: string;
  status: string;
};

export default function InquiriesAdminPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState("");
  const [savedId, setSavedId] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(
      () => {
        const load = async () => {
          setLoading(true);
          setError("");
          const params = new URLSearchParams({
            page: String(page),
            limit: "10",
          });
          if (status) params.set("status", status);
          if (search) params.set("search", search);
          try {
            const result = await adminFetch<{
              inquiries: Inquiry[];
              totalPages: number;
            }>(`/api/admin/inquiries?${params.toString()}`);
            setInquiries(result.inquiries);
            setTotalPages(result.totalPages);
          } catch (requestError) {
            setError(
              requestError instanceof Error
                ? requestError.message
                : "Failed to load inquiries",
            );
          } finally {
            setLoading(false);
          }
        };
        void load();
      },
      search ? 350 : 0,
    );
    return () => window.clearTimeout(timer);
  }, [page, status, search]);

  const updateStatus = async (id: string, nextStatus: string) => {
    setSavingId(id);
    setSavedId("");
    try {
      await adminFetch<Inquiry>(`/api/admin/inquiries/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: nextStatus }),
      });
      setInquiries((current) =>
        current.map((inquiry) =>
          inquiry.id === id ? { ...inquiry, status: nextStatus } : inquiry,
        ),
      );
      setSavedId(id);
      window.setTimeout(
        () => setSavedId((current) => (current === id ? "" : current)),
        1800,
      );
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Failed to update inquiry",
      );
    } finally {
      setSavingId("");
    }
  };

  return (
    <section className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Pharma Inquiries</h1>
        <p className="mt-1 text-sm text-[var(--admin-text-secondary)]">
          Track incoming manufacturing and partnership inquiries.
        </p>
      </div>
      <div className="flex flex-col gap-3 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface)] p-4 sm:flex-row">
        <input
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          placeholder="Search company, contact, or phone"
          className="rounded-md border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 text-sm text-[var(--admin-text-primary)] placeholder:text-[var(--admin-text-secondary)] sm:w-80"
        />
        <select
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            setPage(1);
          }}
          className="rounded-md border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 text-sm text-[var(--admin-text-primary)] sm:w-48"
        >
          <option value="">All </option>
          {statuses.map((item) => (
            <option key={item}>{item}</option>
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
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="border-b border-[var(--admin-border)] bg-[var(--admin-bg)] text-xs uppercase tracking-wide text-[var(--admin-text-secondary)]">
              <tr>
                <th className="px-5 py-3">Company</th>
                <th className="px-5 py-3">Contact person</th>
                <th className="px-5 py-3">Phone</th>
                <th className="px-5 py-3">Area of interest</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center text-[var(--admin-text-secondary)]"
                  >
                    Loading inquiries...
                  </td>
                </tr>
              ) : inquiries.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center text-[var(--admin-text-secondary)]"
                  >
                    No inquiries found.
                  </td>
                </tr>
              ) : (
                inquiries.map((inquiry) => (
                  <tr key={inquiry.id}>
                    <td className="px-5 py-4 font-medium text-[var(--admin-text-primary)]">
                      {inquiry.companyName}
                    </td>
                    <td className="px-5 py-4 text-[var(--admin-text-secondary)]">
                      {inquiry.contactPerson}
                    </td>
                    <td className="px-5 py-4 text-[var(--admin-text-secondary)]">
                      {inquiry.phone}
                    </td>
                    <td className="px-5 py-4 text-[var(--admin-text-secondary)]">
                      {inquiry.interestArea}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <select
                          value={inquiry.status}
                          disabled={savingId === inquiry.id}
                          onChange={(event) =>
                            void updateStatus(inquiry.id, event.target.value)
                          }
                          className="rounded-md border border-[var(--admin-border)] bg-[var(--admin-bg)] px-2 py-1.5 text-xs text-[var(--admin-text-primary)]"
                        >
                          <option value="NEW">NEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="CLOSED">CLOSED</option>
                        </select>
                        {savingId === inquiry.id && (
                          <span className="text-xs text-gray-400">
                            Saving...
                          </span>
                        )}
                        {savedId === inquiry.id && (
                          <span className="text-xs text-green-600">Saved</span>
                        )}
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
    </section>
  );
}
