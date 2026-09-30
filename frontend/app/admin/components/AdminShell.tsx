"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { adminFetch } from "../../../lib/adminApi";

const navigation = [
  { label: "Doctors", href: "/admin/doctors" },
  { label: "Hospital Bookings", href: "/admin/bookings/hospital" },
  { label: "Diagnosis Bookings", href: "/admin/bookings/diagnosis" },
  { label: "Pharma Inquiries", href: "/admin/inquiries" },
];

export default function AdminShell({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    document.body.classList.add("admin-mode");
    return () => document.body.classList.remove("admin-mode");
  }, []);

  useEffect(() => {
    if (isLogin) return;
    adminFetch<{ email: string }>("/api/admin/auth/me")
      .then((admin) => setEmail(admin.email))
      .catch(() => router.replace("/admin/login"));
  }, [isLogin, router]);

  if (isLogin) {
    return (
      <>
        <style jsx global>{`
          body.admin-mode > header {
            display: none;
          }
        `}</style>
        {children}
      </>
    );
  }

  const logout = async () => {
    try {
      await adminFetch<unknown>("/api/admin/auth/logout", { method: "POST" });
    } finally {
      router.replace("/admin/login");
    }
  };

  return (
    <>
      <style jsx global>{`
        body.admin-mode > header {
          display: none;
        }
      `}</style>
      <div className="min-h-screen bg-[var(--admin-bg)] text-[var(--admin-text-primary)]">
        <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-[var(--admin-border)] bg-[var(--admin-surface)] lg:block">
          <div className="border-b border-[var(--admin-border)] px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--admin-text-secondary)]">
              Afilas
            </p>
            <h1 className="mt-1 text-lg font-semibold text-[var(--admin-text-primary)]">
              Admin Console
            </h1>
          </div>
          <nav className="space-y-1 p-4">
            {navigation.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-md px-3 py-2 text-sm font-medium ${active ? "bg-[var(--admin-accent-bg)] text-[var(--admin-accent-text)]" : "text-[var(--admin-text-secondary)] hover:bg-[var(--admin-hover-bg)] hover:text-[var(--admin-text-primary)]"}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            onClick={logout}
            className="absolute bottom-5 left-4 right-4 rounded-md border border-[var(--admin-border)] px-3 py-2 text-left text-sm font-medium text-[var(--admin-text-primary)] hover:bg-[var(--admin-hover-bg)]"
          >
            Logout
          </button>
        </aside>
        <div className="lg:pl-64">
          <header className="flex min-h-16 items-center justify-between border-b border-[var(--admin-border)] bg-[var(--admin-surface)] px-5 sm:px-8">
            <div className="lg:hidden">
              <span className="font-semibold text-[var(--admin-text-primary)]">
                Afilas Admin
              </span>
            </div>
            <div className="hidden lg:block" />
            <div className="flex items-center gap-4 text-sm text-[var(--admin-text-secondary)]">
              <span>{email || "Loading account..."}</span>
              <button
                type="button"
                onClick={logout}
                className="text-[var(--admin-text-primary)] underline lg:hidden"
              >
                Logout
              </button>
            </div>
          </header>
          <main className="p-5 sm:p-8">{children}</main>
        </div>
      </div>
    </>
  );
}
