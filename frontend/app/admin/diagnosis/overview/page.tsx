import AdminOverviewMetrics from "../../components/AdminOverviewMetrics";
import OverviewAnalytics from "../../components/OverviewAnalytics";

const metrics = [
  { label: "Appointments today", key: "appointmentsToday" },
  { label: "Pending", key: "pendingCount" },
  { label: "Confirmed", key: "confirmedCount" },
  { label: "Total appointments", key: "totalAppointments" },
  { label: "Services offered", key: "totalServices" },
];

export default function DiagnosisOverviewPage() {
  return (
    <section className="mx-auto max-w-7xl space-y-6">
      <h1 className="text-2xl font-semibold">Diagnosis overview</h1>
      <AdminOverviewMetrics
        endpoint="/api/admin/overview/diagnosis"
        metrics={metrics}
      />
      <OverviewAnalytics
        endpoint="/api/admin/overview/diagnosis-analytics"
        pageType="diagnosis"
      />
    </section>
  );
}
