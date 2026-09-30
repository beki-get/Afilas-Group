"use client";

import {
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ClipboardList,
  FlaskConical,
  ListOrdered,
  Stethoscope,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { adminFetch } from "../../../lib/adminApi";

type MetricDefinition = { label: string; key: string };

const accentColors = [
  "#3B82F6",
  "#F59E0B",
  "#22C55E",
  "#8B5CF6",
  "#14B8A6",
  "#F97316",
];

const resolveMetricIcon = (label: string, key: string) => {
  const search = `${label} ${key}`.toLowerCase();

  if (search.includes("appointment") || search.includes("booking")) {
    return CalendarDays;
  }
  if (search.includes("pending")) {
    return Clock3;
  }
  if (search.includes("confirmed") || search.includes("contacted")) {
    return CheckCircle2;
  }
  if (search.includes("unique patient") || search.includes("user")) {
    return Users;
  }
  if (search.includes("doctor") || search.includes("active doctor")) {
    return Stethoscope;
  }
  if (search.includes("department") || search.includes("service")) {
    return Building2;
  }
  if (
    search.includes("inquiry") ||
    search.includes("new") ||
    search.includes("closed")
  ) {
    return FlaskConical;
  }
  if (search.includes("total") || search.includes("count")) {
    return ListOrdered;
  }
  return ClipboardList;
};

export default function AdminOverviewMetrics({
  endpoint,
  metrics,
}: {
  endpoint: string;
  metrics: MetricDefinition[];
}) {
  const [data, setData] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    adminFetch<Record<string, number>>(endpoint)
      .then((result) => {
        if (mounted) setData(result);
      })
      .catch((requestError: unknown) => {
        if (mounted) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Failed to load overview",
          );
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [endpoint]);

  if (loading) {
    return (
      <p className="text-sm text-[var(--admin-text-secondary)]">Loading...</p>
    );
  }
  if (error) {
    return (
      <p role="alert" className="text-sm text-red-700">
        {error}
      </p>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {metrics.map((metric, index) => {
        const Icon = resolveMetricIcon(metric.label, metric.key);
        const accentColor = accentColors[index % accentColors.length];

        return (
          <div
            key={metric.key}
            className="flex items-center gap-3 rounded-lg bg-[var(--admin-surface)] px-4 py-3.5"
            style={{ borderLeft: `3px solid ${accentColor}` }}
          >
            <div>
              <div className="flex items-center gap-2 text-sm text-[var(--admin-text-secondary)]">
                <Icon className="size-4" aria-hidden="true" />
                <span>{metric.label}</span>
              </div>
              <div className="mt-2 text-2xl font-medium text-[var(--admin-text-primary)]">
                {data?.[metric.key] ?? 0}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
