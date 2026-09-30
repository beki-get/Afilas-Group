import Link from "next/link";
import { ArrowRight, Building2, FlaskConical, Microscope } from "lucide-react";
import AdminOverviewMetrics from "./components/AdminOverviewMetrics";
import OverviewAnalytics from "./components/OverviewAnalytics";

const metrics = [
  { label: "Appointments today", key: "totalAppointmentsToday" },
  { label: "Pending across all pillars", key: "totalPendingAcrossAll" },
  { label: "Unique patients", key: "totalUniquePatients" },
  { label: "Active doctors", key: "totalDoctors" },
  { label: "Pharma inquiries", key: "totalPharmaInquiries" },
  { label: "New inquiries", key: "newPharmaInquiries" },
];

const pillars = [
  { label: "Hospital", href: "/admin/hospital/overview", icon: Building2 },
  { label: "Diagnosis", href: "/admin/diagnosis/overview", icon: Microscope },
  { label: "Pharma", href: "/admin/pharma/overview", icon: FlaskConical },
];

export default function AdminOverviewPage() {
  return (
    <section className="mx-auto w-full max-w-[1400px] space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Group overview</h1>
      </div>
      <AdminOverviewMetrics
        endpoint="/api/admin/overview/group"
        metrics={metrics}
      />
      <OverviewAnalytics
        endpoint="/api/admin/overview/group-analytics"
        pageType="group"
      />
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Pillars</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {pillars.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center justify-between rounded-md border border-[var(--admin-border)] bg-[var(--admin-surface)] px-4 py-4 text-sm font-medium text-[var(--admin-text-primary)] hover:bg-[var(--admin-hover-bg)]"
            >
              <span className="inline-flex items-center gap-2">
                <Icon
                  aria-hidden="true"
                  className="size-4 text-[var(--admin-text-secondary)]"
                />
                {label}
              </span>
              <ArrowRight
                aria-hidden="true"
                className="size-4 text-[var(--admin-text-secondary)]"
              />
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
}
