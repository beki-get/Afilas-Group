import LookupManagement from "../../components/LookupManagement";

export default function PharmaServicesPage() {
  return (
    <LookupManagement
      endpoint="/api/admin/interest-areas"
      title="Services (Interest Areas)"
      addLabel="Add Interest Area"
      showDescription
    />
  );
}
