import LookupManagement from "../../components/LookupManagement";

export default function DiagnosisServicesPage() {
  return (
    <LookupManagement
      endpoint="/api/admin/test-types"
      title="Services (Test Types)"
      addLabel="Add Test Type"
      showDescription
    />
  );
}
