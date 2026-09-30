import AdminUsersTable from "../../components/AdminUsersTable";

export default function DiagnosisUsersPage() {
  return (
    <AdminUsersTable
      endpoint="/api/admin/users/diagnosis"
      kind="patients"
      title="Diagnosis users"
    />
  );
}
