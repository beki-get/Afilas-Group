import BlogAdminList from "../../components/BlogAdminList";

export default function DiagnosisBlogPage() {
  return (
    <BlogAdminList
      pillar="DIAGNOSIS"
      title="Diagnosis blog"
      newHref="/admin/diagnosis/blog/new"
    />
  );
}
