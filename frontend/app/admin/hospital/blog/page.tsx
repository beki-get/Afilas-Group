import BlogAdminList from "../../components/BlogAdminList";

export default function HospitalBlogPage() {
  return (
    <BlogAdminList
      pillar="HOSPITAL"
      title="Hospital blog"
      newHref="/admin/hospital/blog/new"
    />
  );
}
