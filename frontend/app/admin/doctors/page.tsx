import { redirect } from "next/navigation";

export default function LegacyDoctorsPage() {
  redirect("/admin/hospital/doctors");
}
