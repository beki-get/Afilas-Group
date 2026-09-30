import AdminUsersTable from "../../components/AdminUsersTable";

export default function HospitalUsersPage() {
  return (
    <AdminUsersTable
      endpoint="/api/admin/users/hospital"
      kind="patients"
      title="Hospital users"
    />
  );
}
