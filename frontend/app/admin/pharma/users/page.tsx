import AdminUsersTable from "../../components/AdminUsersTable";

export default function PharmaUsersPage() {
  return (
    <AdminUsersTable
      endpoint="/api/admin/users/pharma"
      kind="pharma"
      title="Pharma users"
    />
  );
}
