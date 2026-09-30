import { redirect } from "next/navigation";

export default function LegacyHospitalBookingsPage() {
  redirect("/admin/hospital/appointments");
}
