"use client";

import dynamic from "next/dynamic";

const AdminOverviewMetrics = dynamic(
  () => import("../../components/AdminOverviewMetrics"),
  {
    ssr: false,
    loading: () => (
      <p className="text-sm text-[var(--admin-text-secondary)]">
        Loading metrics...
      </p>
    ),
  },
);

const OverviewAnalytics = dynamic(
  () => import("../../components/OverviewAnalytics"),
  {
    ssr: false,
    loading: () => (
      <div className="mt-8 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface)] p-4 text-sm text-[var(--admin-text-secondary)]">
        Loading analytics...
      </div>
    ),
  },
);

const metrics = [
  { label: "Appointments today", key: "appointmentsToday" },
  { label: "Pending", key: "pendingCount" },
  { label: "Confirmed", key: "confirmedCount" },
  { label: "Total appointments", key: "totalAppointments" },
  { label: "Active doctors", key: "activeDoctors" },
  { label: "Departments", key: "totalDepartments" },
];

export default function HospitalOverviewPage() {
  return (
    <section className="mx-auto max-w-7xl space-y-6">
      <h1 className="text-2xl font-semibold">Hospital overview</h1>

      <AdminOverviewMetrics
        endpoint="/api/admin/overview/hospital"
        metrics={metrics}
      />

      <OverviewAnalytics
        endpoint="/api/admin/overview/hospital-analytics"
        pageType="hospital"
      />
    </section>
  );
}