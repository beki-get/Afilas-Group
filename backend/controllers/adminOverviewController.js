import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../utils/prisma.js";

const getToday = () => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return today;
};

const getLast14DateKeys = () => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const days = [];
  for (let offset = 13; offset >= 0; offset -= 1) {
    const date = new Date(today);
    date.setUTCDate(today.getUTCDate() - offset);
    days.push(date.toISOString().slice(0, 10));
  }

  return days;
};

const getStatusBreakdown = (items, order) => {
  const totals = new Map();

  items.forEach((item) => {
    const key = item.status || item.name || item.label;
    totals.set(key, (totals.get(key) || 0) + 1);
  });

  return order
    .map((status) => ({ name: status, value: totals.get(status) || 0 }))
    .filter((entry) => entry.value > 0);
};

const getCategoryBreakdown = (items, categoryKey, limit = 6) => {
  const totals = new Map();

  items.forEach((item) => {
    const key = item[categoryKey];
    if (!key) return;
    totals.set(key, (totals.get(key) || 0) + 1);
  });

  return [...totals.entries()]
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
};

const getDailyCounts = (records, dateKey, valueKey = "count") => {
  const dateKeys = getLast14DateKeys();
  const counts = new Map(dateKeys.map((date) => [date, 0]));

  records.forEach((record) => {
    const date = new Date(record[dateKey]).toISOString().slice(0, 10);
    if (counts.has(date)) {
      counts.set(date, counts.get(date) + 1);
    }
  });

  return dateKeys.map((date) => ({
    date,
    [valueKey]: counts.get(date) || 0,
  }));
};

export const getGroupOverview = asyncHandler(async (req, res) => {
  const today = getToday();
  const [
    hospitalToday,
    diagnosisToday,
    hospitalPending,
    diagnosisPending,
    newPharmaInquiries,
    uniquePatientCounts,
    totalDoctors,
    totalPharmaInquiries,
  ] = await Promise.all([
    prisma.hospitalBooking.count({ where: { preferredDate: today } }),
    prisma.diagnosisBooking.count({ where: { preferredDate: today } }),
    prisma.hospitalBooking.count({ where: { status: "PENDING" } }),
    prisma.diagnosisBooking.count({ where: { status: "PENDING" } }),
    prisma.pharmaInquiry.count({ where: { status: "NEW" } }),
    prisma.$queryRaw`
      SELECT COUNT(DISTINCT "phone")::int AS "count"
      FROM (
        SELECT "phone" FROM "HospitalBooking"
        UNION ALL
        SELECT "phone" FROM "DiagnosisBooking"
      ) AS patients
    `,
    prisma.doctor.count({ where: { isActive: true } }),
    prisma.pharmaInquiry.count(),
  ]);

  const totalPendingAcrossAll =
    hospitalPending + diagnosisPending + newPharmaInquiries;

  res.status(200).json({
    success: true,
    data: {
      totalAppointmentsToday: hospitalToday + diagnosisToday,
      totalPendingAcrossAll,
      totalUniquePatients: uniquePatientCounts[0]?.count ?? 0,
      totalDoctors,
      totalPharmaInquiries,
      newPharmaInquiries,
    },
  });
});

export const getHospitalOverview = asyncHandler(async (req, res) => {
  const today = getToday();
  const [
    appointmentsToday,
    pendingCount,
    confirmedCount,
    totalAppointments,
    activeDoctors,
    totalDepartments,
  ] = await Promise.all([
    prisma.hospitalBooking.count({ where: { preferredDate: today } }),
    prisma.hospitalBooking.count({ where: { status: "PENDING" } }),
    prisma.hospitalBooking.count({ where: { status: "CONFIRMED" } }),
    prisma.hospitalBooking.count(),
    prisma.doctor.count({ where: { isActive: true } }),
    prisma.department.count({ where: { isActive: true } }),
  ]);

  res.status(200).json({
    success: true,
    data: {
      appointmentsToday,
      pendingCount,
      confirmedCount,
      totalAppointments,
      activeDoctors,
      totalDepartments,
    },
  });
});

export const getDiagnosisOverview = asyncHandler(async (req, res) => {
  const today = getToday();
  const [
    appointmentsToday,
    pendingCount,
    confirmedCount,
    totalAppointments,
    totalServices,
  ] = await Promise.all([
    prisma.diagnosisBooking.count({ where: { preferredDate: today } }),
    prisma.diagnosisBooking.count({ where: { status: "PENDING" } }),
    prisma.diagnosisBooking.count({ where: { status: "CONFIRMED" } }),
    prisma.diagnosisBooking.count(),
    prisma.testType.count({ where: { isActive: true } }),
  ]);

  res.status(200).json({
    success: true,
    data: {
      appointmentsToday,
      pendingCount,
      confirmedCount,
      totalAppointments,
      totalServices,
    },
  });
});

export const getPharmaOverview = asyncHandler(async (req, res) => {
  const [totalInquiries, newCount, contactedCount, closedCount] =
    await Promise.all([
      prisma.pharmaInquiry.count(),
      prisma.pharmaInquiry.count({ where: { status: "NEW" } }),
      prisma.pharmaInquiry.count({ where: { status: "CONTACTED" } }),
      prisma.pharmaInquiry.count({ where: { status: "CLOSED" } }),
    ]);

  res.status(200).json({
    success: true,
    data: { totalInquiries, newCount, contactedCount, closedCount },
  });
});

export const getHospitalAnalytics = asyncHandler(async (req, res) => {
  const dayKeys = getLast14DateKeys();
  const startDate = new Date(`${dayKeys[0]}T00:00:00.000Z`);
  const endDate = new Date(`${dayKeys[dayKeys.length - 1]}T23:59:59.999Z`);

  const [bookings, statusCounts, departmentCounts] = await Promise.all([
    prisma.hospitalBooking.findMany({
      where: { preferredDate: { gte: startDate, lte: endDate } },
      select: { preferredDate: true, status: true, department: true },
    }),
    prisma.hospitalBooking.groupBy({
      by: ["status"],
      where: { preferredDate: { gte: startDate, lte: endDate } },
      _count: { _all: true },
    }),
    prisma.hospitalBooking.groupBy({
      by: ["department"],
      where: { preferredDate: { gte: startDate, lte: endDate } },
      _count: { _all: true },
    }),
  ]);

  const bookingsPerDay = dayKeys.map((date) => ({
    date,
    count: bookings.filter(
      (booking) => booking.preferredDate.toISOString().slice(0, 10) === date,
    ).length,
  }));

  const statusBreakdown = getStatusBreakdown(
    statusCounts.map((item) => ({
      status: item.status,
      count: item._count._all,
    })),
    ["PENDING", "CONFIRMED", "CANCELLED", "ARRIVED"],
  );

  const departmentBreakdown = departmentCounts
    .map((item) => ({ name: item.department, value: item._count._all }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  res.status(200).json({
    success: true,
    data: { bookingsPerDay, statusBreakdown, departmentBreakdown },
  });
});

export const getDiagnosisAnalytics = asyncHandler(async (req, res) => {
  const dayKeys = getLast14DateKeys();
  const startDate = new Date(`${dayKeys[0]}T00:00:00.000Z`);
  const endDate = new Date(`${dayKeys[dayKeys.length - 1]}T23:59:59.999Z`);

  const [bookings, statusCounts, testTypeCounts] = await Promise.all([
    prisma.diagnosisBooking.findMany({
      where: { preferredDate: { gte: startDate, lte: endDate } },
      select: { preferredDate: true, status: true, testType: true },
    }),
    prisma.diagnosisBooking.groupBy({
      by: ["status"],
      where: { preferredDate: { gte: startDate, lte: endDate } },
      _count: { _all: true },
    }),
    prisma.diagnosisBooking.groupBy({
      by: ["testType"],
      where: { preferredDate: { gte: startDate, lte: endDate } },
      _count: { _all: true },
    }),
  ]);

  const bookingsPerDay = dayKeys.map((date) => ({
    date,
    count: bookings.filter(
      (booking) => booking.preferredDate.toISOString().slice(0, 10) === date,
    ).length,
  }));

  const statusBreakdown = getStatusBreakdown(
    statusCounts.map((item) => ({
      status: item.status,
      count: item._count._all,
    })),
    ["PENDING", "CONFIRMED", "CANCELLED", "ARRIVED"],
  );

  const testTypeBreakdown = testTypeCounts
    .map((item) => ({ name: item.testType, value: item._count._all }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  res.status(200).json({
    success: true,
    data: { bookingsPerDay, statusBreakdown, testTypeBreakdown },
  });
});

export const getPharmaAnalytics = asyncHandler(async (req, res) => {
  const dayKeys = getLast14DateKeys();
  const startDate = new Date(`${dayKeys[0]}T00:00:00.000Z`);
  const endDate = new Date(`${dayKeys[dayKeys.length - 1]}T23:59:59.999Z`);

  const [inquiries, statusCounts, interestAreaCounts] = await Promise.all([
    prisma.pharmaInquiry.findMany({
      where: { createdAt: { gte: startDate, lte: endDate } },
      select: { createdAt: true, status: true, interestArea: true },
    }),
    prisma.pharmaInquiry.groupBy({
      by: ["status"],
      where: { createdAt: { gte: startDate, lte: endDate } },
      _count: { _all: true },
    }),
    prisma.pharmaInquiry.groupBy({
      by: ["interestArea"],
      where: { createdAt: { gte: startDate, lte: endDate } },
      _count: { _all: true },
    }),
  ]);

  const inquiriesPerDay = dayKeys.map((date) => ({
    date,
    count: inquiries.filter(
      (inquiry) => inquiry.createdAt.toISOString().slice(0, 10) === date,
    ).length,
  }));

  const statusBreakdown = getStatusBreakdown(
    statusCounts.map((item) => ({
      status: item.status,
      count: item._count._all,
    })),
    ["NEW", "CONTACTED", "CLOSED"],
  );

  const interestAreaBreakdown = interestAreaCounts
    .map((item) => ({ name: item.interestArea, value: item._count._all }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  res.status(200).json({
    success: true,
    data: { inquiriesPerDay, statusBreakdown, interestAreaBreakdown },
  });
});

export const getGroupAnalytics = asyncHandler(async (req, res) => {
  const dayKeys = getLast14DateKeys();
  const startDate = new Date(`${dayKeys[0]}T00:00:00.000Z`);
  const endDate = new Date(`${dayKeys[dayKeys.length - 1]}T23:59:59.999Z`);

  const [hospitalBookings, diagnosisBookings, pharmaInquiries] =
    await Promise.all([
      prisma.hospitalBooking.findMany({
        where: { preferredDate: { gte: startDate, lte: endDate } },
        select: { preferredDate: true },
      }),
      prisma.diagnosisBooking.findMany({
        where: { preferredDate: { gte: startDate, lte: endDate } },
        select: { preferredDate: true },
      }),
      prisma.pharmaInquiry.findMany({
        where: { createdAt: { gte: startDate, lte: endDate } },
        select: { createdAt: true },
      }),
    ]);

  const combinedBookingsPerDay = dayKeys.map((date) => ({
    date,
    hospital: hospitalBookings.filter(
      (booking) => booking.preferredDate.toISOString().slice(0, 10) === date,
    ).length,
    diagnosis: diagnosisBookings.filter(
      (booking) => booking.preferredDate.toISOString().slice(0, 10) === date,
    ).length,
  }));

  const pharmaInquiriesPerDay = dayKeys.map((date) => ({
    date,
    count: pharmaInquiries.filter(
      (inquiry) => inquiry.createdAt.toISOString().slice(0, 10) === date,
    ).length,
  }));

  res.status(200).json({
    success: true,
    data: { combinedBookingsPerDay, pharmaInquiriesPerDay },
  });
});
