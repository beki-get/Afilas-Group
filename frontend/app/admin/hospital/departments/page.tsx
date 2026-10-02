import LookupManagement from "../../components/LookupManagement";

export default function HospitalDepartmentsPage() {
  return (
    <LookupManagement
      endpoint="/api/admin/departments"
      title="Departments"
      addLabel="Add Department"
      showDescription
    />
  );
}
