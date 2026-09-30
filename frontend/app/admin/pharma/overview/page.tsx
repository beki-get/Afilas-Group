import AdminOverviewMetrics from "../../components/AdminOverviewMetrics";
import OverviewAnalytics from "../../components/OverviewAnalytics";

const metrics = [
  { label: "Total inquiries", key: "totalInquiries" },
  { label: "New", key: "newCount" },
  { label: "Contacted", key: "contactedCount" },
  { label: "Closed", key: "closedCount" },
];

export default function PharmaOverviewPage() {
  return (
    <section className="mx-auto max-w-7xl space-y-6">
      <h1 className="text-2xl font-semibold">Pharma overview</h1>
      <AdminOverviewMetrics
        endpoint="/api/admin/overview/pharma"
        metrics={metrics}
      />
      <OverviewAnalytics
        endpoint="/api/admin/overview/pharma-analytics"
        pageType="pharma"
      />
    </section>
  );
}
