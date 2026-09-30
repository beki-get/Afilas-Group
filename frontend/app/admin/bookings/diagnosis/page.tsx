import { redirect } from "next/navigation";

export default function LegacyDiagnosisBookingsPage() {
  redirect("/admin/diagnosis/appointments");
}
