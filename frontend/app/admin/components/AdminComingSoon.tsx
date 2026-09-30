export default function AdminComingSoon({ title }: { title: string }) {
  return (
    <section className="space-y-2">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-sm text-[var(--admin-text-secondary)]">Coming soon</p>
    </section>
  );
}
