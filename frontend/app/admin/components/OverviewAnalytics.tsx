"use client";

import { type ReactNode, useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { adminFetch } from "../../../lib/adminApi";

const accentColors = [
  "#3B82F6",
  "#F59E0B",
  "#22C55E",
  "#8B5CF6",
  "#14B8A6",
  "#F97316",
];

const chartTooltipStyle = {
  background: "var(--admin-surface)",
  border: "1px solid var(--admin-border)",
  color: "var(--admin-text-primary)",
};

const axisTick = { fill: "var(--admin-text-secondary)" };

type DayCount = { date: string; count: number };
type BreakdownItem = { name: string; value: number };
type GroupDayCount = { date: string; hospital: number; diagnosis: number };
type AnalyticsData = {
  bookingsPerDay?: DayCount[];
  inquiriesPerDay?: DayCount[];
  statusBreakdown?: BreakdownItem[];
  departmentBreakdown?: BreakdownItem[];
  testTypeBreakdown?: BreakdownItem[];
  interestAreaBreakdown?: BreakdownItem[];
  combinedBookingsPerDay?: GroupDayCount[];
  pharmaInquiriesPerDay?: DayCount[];
};

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface)] p-4">
      <div className="mb-3 text-sm font-medium text-[var(--admin-text-primary)]">
        {title}
      </div>
      <div className="h-64 w-full">{children}</div>
    </div>
  );
}

function SmallChartCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface)] p-4">
      <div className="mb-3 text-sm font-medium text-[var(--admin-text-primary)]">
        {title}
      </div>
      <div className="h-52 w-full">{children}</div>
    </div>
  );
}

export default function OverviewAnalytics({
  endpoint,
  pageType,
}: {
  endpoint: string;
  pageType: "hospital" | "diagnosis" | "pharma" | "group";
}) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    adminFetch<AnalyticsData>(endpoint)
      .then((result) => {
        if (isMounted) {
          setData(result || {});
        }
      })
      .catch(() => {
        if (isMounted) {
          setData({});
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  if (loading) {
    return (
      <div className="mt-8 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface)] p-4 text-sm text-[var(--admin-text-secondary)]">
        Loading analytics...
      </div>
    );
  }

  const mainKey = pageType === "pharma" ? "inquiriesPerDay" : "bookingsPerDay";
  const mainData = Array.isArray(data?.[mainKey])
    ? (data?.[mainKey] as DayCount[])
    : [];
  const statusBreakdown = Array.isArray(data?.statusBreakdown)
    ? (data.statusBreakdown as BreakdownItem[])
    : [];
  const secondaryBreakdown = Array.isArray(data?.departmentBreakdown)
    ? (data.departmentBreakdown as BreakdownItem[])
    : Array.isArray(data?.testTypeBreakdown)
      ? (data.testTypeBreakdown as BreakdownItem[])
      : Array.isArray(data?.interestAreaBreakdown)
        ? (data.interestAreaBreakdown as BreakdownItem[])
        : [];
  const combinedData = Array.isArray(data?.combinedBookingsPerDay)
    ? (data.combinedBookingsPerDay as GroupDayCount[])
    : [];
  const pharmaInquiries = Array.isArray(data?.pharmaInquiriesPerDay)
    ? (data.pharmaInquiriesPerDay as DayCount[])
    : [];

  return (
    <div className="mt-8 space-y-6">
      {pageType === "group" ? (
        <>
          <ChartCard title="Combined bookings, last 14 days">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={combinedData}
                margin={{ top: 8, right: 8, bottom: 8, left: 0 }}
              >
                <CartesianGrid stroke="var(--admin-border)" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={axisTick}
                  stroke="var(--admin-border)"
                />
                <YAxis tick={axisTick} stroke="var(--admin-border)" />
                <Tooltip
                  contentStyle={chartTooltipStyle}
                  cursor={{ fill: "rgba(148,163,184,0.08)" }}
                />
                <Legend wrapperStyle={{ color: "var(--admin-text-primary)" }} />
                <Bar
                  dataKey="hospital"
                  fill={accentColors[0]}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="diagnosis"
                  fill={accentColors[1]}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Pharma inquiries, last 14 days">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={pharmaInquiries}
                margin={{ top: 8, right: 8, bottom: 8, left: 0 }}
              >
                <CartesianGrid stroke="var(--admin-border)" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={axisTick}
                  stroke="var(--admin-border)"
                />
                <YAxis tick={axisTick} stroke="var(--admin-border)" />
                <Tooltip
                  contentStyle={chartTooltipStyle}
                  cursor={{ fill: "rgba(148,163,184,0.08)" }}
                />
                <Bar
                  dataKey="count"
                  fill={accentColors[2]}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </>
      ) : (
        <>
          <ChartCard
            title={
              pageType === "pharma"
                ? "Inquiries, last 14 days"
                : "Bookings, last 14 days"
            }
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mainData}
                margin={{ top: 8, right: 8, bottom: 8, left: 0 }}
              >
                <CartesianGrid stroke="var(--admin-border)" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={axisTick}
                  stroke="var(--admin-border)"
                />
                <YAxis tick={axisTick} stroke="var(--admin-border)" />
                <Tooltip
                  contentStyle={chartTooltipStyle}
                  cursor={{ fill: "rgba(148,163,184,0.08)" }}
                />
                <Bar
                  dataKey="count"
                  fill={accentColors[0]}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <div className="grid gap-6 md:grid-cols-2">
            <SmallChartCard title="By status">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={statusBreakdown}
                  layout="vertical"
                  margin={{ top: 8, right: 12, bottom: 8, left: 8 }}
                >
                  <CartesianGrid
                    stroke="var(--admin-border)"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    tick={axisTick}
                    stroke="var(--admin-border)"
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={96}
                    tick={axisTick}
                    stroke="var(--admin-border)"
                  />
                  <Tooltip contentStyle={chartTooltipStyle} />
                  <Bar
                    dataKey="value"
                    fill={accentColors[1]}
                    radius={[0, 6, 6, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </SmallChartCard>

            <SmallChartCard
              title={
                pageType === "hospital"
                  ? "By department"
                  : pageType === "diagnosis"
                    ? "By test type"
                    : "By interest area"
              }
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={secondaryBreakdown}
                  layout="vertical"
                  margin={{ top: 8, right: 12, bottom: 8, left: 8 }}
                >
                  <CartesianGrid
                    stroke="var(--admin-border)"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    tick={axisTick}
                    stroke="var(--admin-border)"
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={96}
                    tick={axisTick}
                    stroke="var(--admin-border)"
                  />
                  <Tooltip contentStyle={chartTooltipStyle} />
                  <Bar
                    dataKey="value"
                    fill={accentColors[2]}
                    radius={[0, 6, 6, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </SmallChartCard>
          </div>
        </>
      )}
    </div>
  );
}
