import BlogAdminList from "../../components/BlogAdminList";

export default function PharmaBlogPage() {
  return (
    <BlogAdminList
      pillar="PHARMA"
      title="Pharma blog"
      newHref="/admin/pharma/blog/new"
    />
  );
}
