import AdminOverviewMetrics from "../../components/AdminOverviewMetrics";
import OverviewAnalytics from "../../components/OverviewAnalytics";

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
