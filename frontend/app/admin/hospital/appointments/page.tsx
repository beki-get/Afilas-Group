"use client";

import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import { adminFetch } from "../../../../lib/adminApi";
import { formatEthiopianDateTime } from "../../../../lib/ethiopianDate";

const statuses = ["PENDING", "CONFIRMED", "CANCELLED", "ARRIVED"];

type HospitalBooking = {
  id: string;
  fullName: string;
  phone: string;
  department: string;
  preferredDate: string;
  preferredTime: string;
  status: string;
  doctor: { name: string };
};

const formatDate = (value: string) => value.slice(0, 10);

export default function HospitalBookingsPage() {
  const [bookings, setBookings] = useState<HospitalBooking[]>([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
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
          if (dateFrom) params.set("dateFrom", dateFrom);
          if (dateTo) params.set("dateTo", dateTo);
          try {
            const result = await adminFetch<{
              bookings: HospitalBooking[];
              totalPages: number;
            }>(`/api/admin/bookings/hospital?${params.toString()}`);
            setBookings(result.bookings);
            setTotalPages(result.totalPages);
          } catch (requestError) {
            setError(
              requestError instanceof Error
                ? requestError.message
                : "Failed to load bookings",
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
  }, [page, status, search, dateFrom, dateTo]);

  const updateStatus = async (id: string, nextStatus: string) => {
    setSavingId(id);
    setSavedId("");
    try {
      await adminFetch<HospitalBooking>(
        `/api/admin/bookings/hospital/${id}/status`,
        { method: "PATCH", body: JSON.stringify({ status: nextStatus }) },
      );
      setBookings((current) =>
        current.map((booking) =>
          booking.id === id ? { ...booking, status: nextStatus } : booking,
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
          : "Failed to update booking",
      );
    } finally {
      setSavingId("");
    }
  };

  const resetPage = () => setPage(1);

  return (
    <section className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Hospital Bookings</h1>
        <p className="mt-1 text-sm text-[var(--admin-text-secondary)]">
          Review appointments and update their status.
        </p>
      </div>
      <div className="grid gap-3 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface)] p-4 sm:grid-cols-2 lg:grid-cols-4">
        <input
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            resetPage();
          }}
          placeholder="Search name or phone"
          className="rounded-md border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 text-sm text-[var(--admin-text-primary)] placeholder:text-[var(--admin-text-secondary)]"
        />
        <select
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            resetPage();
          }}
          className="rounded-md border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 text-sm text-[var(--admin-text-primary)]"
        >
          <option value="">All statuses</option>
          {statuses.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <label className="text-xs text-[var(--admin-text-secondary)]">
          From
          <input
            type="date"
            value={dateFrom}
            onChange={(event) => {
              setDateFrom(event.target.value);
              resetPage();
            }}
            className="mt-1 block w-full rounded-md border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 text-sm text-[var(--admin-text-primary)]"
          />
        </label>
        <label className="text-xs text-[var(--admin-text-secondary)]">
          To
          <input
            type="date"
            value={dateTo}
            onChange={(event) => {
              setDateTo(event.target.value);
              resetPage();
            }}
            className="mt-1 block w-full rounded-md border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 text-sm text-[var(--admin-text-primary)]"
          />
        </label>
      </div>
      {error && (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}
      <div className="overflow-hidden rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left text-sm">
            <thead className="border-b border-[var(--admin-border)] bg-[var(--admin-bg)] text-xs uppercase tracking-wide text-[var(--admin-text-secondary)]">
              <tr>
                <th className="px-5 py-3">Patient</th>
                <th className="px-5 py-3">Phone</th>
                <th className="px-5 py-3">Department</th>
                <th className="px-5 py-3">Doctor</th>
                <th className="px-5 py-3">Date / time</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-[var(--admin-text-secondary)]"
                  >
                    Loading bookings...
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-[var(--admin-text-secondary)]"
                  >
                    No bookings found.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-5 py-4 font-medium text-[var(--admin-text-primary)]">
                      {booking.fullName}
                    </td>
                    <td className="px-5 py-4 text-[var(--admin-text-secondary)]">
                      {booking.phone}
                    </td>
                    <td className="px-5 py-4 text-[var(--admin-text-secondary)]">
                      {booking.department}
                    </td>
                    <td className="px-5 py-4 text-[var(--admin-text-secondary)]">
                      {booking.doctor?.name || "-"}
                    </td>
                    <td className="px-5 py-4 text-[var(--admin-text-secondary)]">
                      {formatDate(booking.preferredDate)}
                      <br />
                      {booking.preferredTime}
                      <span className="mt-1 block text-xs text-[var(--admin-text-secondary)]">
                        {formatEthiopianDateTime(
                          booking.preferredDate,
                          booking.preferredTime,
                        )}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <select
                          value={booking.status}
                          disabled={savingId === booking.id}
                          onChange={(event) =>
                            void updateStatus(booking.id, event.target.value)
                          }
                          className="rounded-md border border-[var(--admin-border)] bg-[var(--admin-bg)] px-2 py-1.5 text-xs text-[var(--admin-text-primary)]"
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="CANCELLED">CANCELLED</option>
                          <option value="ARRIVED">ARRIVED</option>
                        </select>
                        {savingId === booking.id && (
                          <span className="text-xs text-gray-400">
                            Saving...
                          </span>
                        )}
                        {savedId === booking.id && (
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
