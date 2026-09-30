"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Building2,
  CalendarDays,
  FlaskConical,
  Hospital,
  LayoutDashboard,
  LogOut,
  Microscope,
  Newspaper,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useEffect } from "react";
import { adminFetch } from "../../../lib/adminApi";

type AdminSection = { label: string; href: string; icon: LucideIcon };

const pillars: {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  sections: AdminSection[];
}[] = [
  {
    id: "hospital",
    label: "Hospital",
    href: "/admin/hospital/overview",
    icon: Hospital,
    sections: [
      {
        label: "Overview",
        href: "/admin/hospital/overview",
        icon: LayoutDashboard,
      },
      { label: "Users", href: "/admin/hospital/users", icon: Users },
      {
        label: "Appointments",
        href: "/admin/hospital/appointments",
        icon: CalendarDays,
      },
      { label: "Doctors", href: "/admin/hospital/doctors", icon: Stethoscope },
      {
        label: "Departments",
        href: "/admin/hospital/departments",
        icon: Building2,
      },
      {
        label: "Blog",
        href: "/admin/hospital/blog",
        icon: Newspaper,
      },
    ],
  },
  {
    id: "diagnosis",
    label: "Diagnosis",
    href: "/admin/diagnosis/overview",
    icon: Microscope,
    sections: [
      {
        label: "Overview",
        href: "/admin/diagnosis/overview",
        icon: LayoutDashboard,
      },
      {
        label: "Appointments",
        href: "/admin/diagnosis/appointments",
        icon: CalendarDays,
      },
      { label: "Users", href: "/admin/diagnosis/users", icon: Users },
      {
        label: "Services",
        href: "/admin/diagnosis/services",
        icon: FlaskConical,
      },
      {
        label: "Blog",
        href: "/admin/diagnosis/blog",
        icon: Newspaper,
      },
    ],
  },
  {
    id: "pharma",
    label: "Pharma",
    href: "/admin/pharma/overview",
    icon: FlaskConical,
    sections: [
      {
        label: "Overview",
        href: "/admin/pharma/overview",
        icon: LayoutDashboard,
      },
      {
        label: "Appointments",
        href: "/admin/pharma/inquiries",
        icon: CalendarDays,
      },
      { label: "Users", href: "/admin/pharma/users", icon: Users },
      {
        label: "Services",
        href: "/admin/pharma/services",
        icon: FlaskConical,
      },
      {
        label: "Blog",
        href: "/admin/pharma/blog",
        icon: Newspaper,
      },
    ],
  },
];

const adminTheme = {
  "--admin-bg": "#121317",
  "--admin-surface": "#1A1C20",
  "--admin-border": "#2A2D33",
  "--admin-accent-bg": "rgba(56,139,253,0.15)",
  "--admin-accent-text": "#58A6FF",
  "--admin-text-primary": "#F5F5F5",
  "--admin-text-secondary": "#9A9DA3",
  "--admin-hover-bg": "#22252B",
} as React.CSSProperties;
export default function AdminShell({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/admin/login";
  const activePillar = pillars.find((pillar) =>
    pathname.startsWith(`/admin/${pillar.id}/`),
  );

  useEffect(() => {
    document.body.classList.add("admin-mode");
    return () => document.body.classList.remove("admin-mode");
  }, []);

  useEffect(() => {
    if (isLogin) return;
    adminFetch<{ email: string }>("/api/admin/auth/me")
      .then(() => undefined)
      .catch(() => router.replace("/admin/login"));
  }, [isLogin, router]);

  const logout = async () => {
    try {
      await adminFetch<unknown>("/api/admin/auth/logout", { method: "POST" });
    } finally {
      router.replace("/admin/login");
    }
  };

  if (isLogin) {
    return (
      <div className="fixed inset-0 z-[100] overflow-auto bg-[var(--admin-bg)]">
        {children}
      </div>
    );
  }

  return (
    <div
      style={adminTheme}
      className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-[var(--admin-bg)] text-[var(--admin-text-primary)]"
    >
      <header className="flex min-h-12 flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-1.5 sm:px-5">
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          <Link href="/admin" className="shrink-0 text-sm font-medium">
            Afilas
          </Link>
          <nav aria-label="Admin pillars" className="flex items-center gap-1">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              const active = activePillar?.id === pillar.id;
              return (
                <Link
                  key={pillar.id}
                  href={pillar.href}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs transition-colors sm:text-sm ${
                    active
                      ? "bg-[var(--admin-accent-bg)] font-medium text-[var(--admin-accent-text)]"
                      : "text-[var(--admin-text-secondary)] hover:bg-[var(--admin-hover-bg)]"
                  }`}
                >
                  <Icon aria-hidden="true" className="size-4" />
                  {pillar.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin"
            className="inline-flex shrink-0 items-center gap-1.5 text-xs text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)] sm:text-sm"
          >
            <LayoutDashboard aria-hidden="true" className="size-4" />
            Group overview
          </Link>
          <button
            type="button"
            aria-label="Logout"
            title="Logout"
            onClick={logout}
            className="inline-flex size-8 items-center justify-center rounded-md border border-[var(--admin-border)] bg-[var(--admin-surface)] text-[var(--admin-text-secondary)] transition-colors hover:bg-[var(--admin-hover-bg)] hover:text-[var(--admin-text-primary)]"
          >
            <LogOut aria-hidden="true" className="size-4" />
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {activePillar && (
          <aside className="flex w-[150px] shrink-0 flex-col border-r border-[var(--admin-border)] bg-[var(--admin-surface)] px-2 py-3">
            <nav
              aria-label={`${activePillar.label} sections`}
              className="space-y-1"
            >
              {activePillar.sections.map((section) => {
                const Icon = section.icon;
                const active =
                  pathname === section.href ||
                  pathname.startsWith(`${section.href}/`);
                return (
                  <Link
                    key={section.href}
                    href={section.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-2 rounded-md px-2 py-2 text-sm ${
                      active
                        ? "bg-[var(--admin-hover-bg)] font-medium text-[var(--admin-text-primary)]"
                        : "text-[var(--admin-text-secondary)] hover:bg-[var(--admin-hover-bg)]"
                    }`}
                  >
                    <Icon aria-hidden="true" className="size-4 shrink-0" />
                    <span>{section.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        )}

        <main className="min-w-0 flex-1 overflow-y-auto bg-[var(--admin-bg)] p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
