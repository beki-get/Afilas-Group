import { Prisma } from "@prisma/client";
import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../utils/prisma.js";

const getPagination = (query) => {
  const page = Math.max(Number.parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(
    Math.max(Number.parseInt(query.limit, 10) || 10, 1),
    100,
  );
  return { page, limit, skip: (page - 1) * limit };
};

export const getHospitalUsers = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const search = typeof req.query.search === "string" ? req.query.search : "";
  const searchFilter = search
    ? Prisma.sql`WHERE "fullName" ILIKE ${`%${search}%`} OR "phone" ILIKE ${`%${search}%`}`
    : Prisma.empty;

  const countQuery = Prisma.sql`
    SELECT COUNT(*)::int AS "total"
    FROM (
      SELECT "phone"
      FROM "HospitalBooking"
      ${searchFilter}
      GROUP BY "phone"
    ) AS phone_groups
  `;
  const usersQuery = Prisma.sql`
    WITH matching_phones AS (
      SELECT DISTINCT "phone"
      FROM "HospitalBooking"
      ${searchFilter}
    ), ranked_bookings AS (
      SELECT
        booking."fullName",
        booking."phone",
        booking."email",
        COUNT(*) OVER (PARTITION BY booking."phone")::int AS "totalBookings",
        MAX(booking."preferredDate") OVER (PARTITION BY booking."phone") AS "lastAppointmentDate",
        ROW_NUMBER() OVER (
          PARTITION BY booking."phone"
          ORDER BY booking."createdAt" DESC, booking."preferredDate" DESC
        ) AS row_number
      FROM "HospitalBooking" AS booking
      INNER JOIN matching_phones USING ("phone")
    )
    SELECT "fullName", "phone", "email", "totalBookings", "lastAppointmentDate"
    FROM ranked_bookings
    WHERE row_number = 1
    ORDER BY "lastAppointmentDate" DESC, "phone" ASC
    LIMIT ${limit} OFFSET ${skip}
  `;

  const [countRows, users] = await prisma.$transaction([
    prisma.$queryRaw(countQuery),
    prisma.$queryRaw(usersQuery),
  ]);
  const total = countRows[0]?.total ?? 0;

  res.status(200).json({
    success: true,
    data: { users, total, page, totalPages: Math.ceil(total / limit) },
  });
});

export const getDiagnosisUsers = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const search = typeof req.query.search === "string" ? req.query.search : "";
  const searchFilter = search
    ? Prisma.sql`WHERE "fullName" ILIKE ${`%${search}%`} OR "phone" ILIKE ${`%${search}%`}`
    : Prisma.empty;

  const countQuery = Prisma.sql`
    SELECT COUNT(*)::int AS "total"
    FROM (
      SELECT "phone"
      FROM "DiagnosisBooking"
      ${searchFilter}
      GROUP BY "phone"
    ) AS phone_groups
  `;
  const usersQuery = Prisma.sql`
    WITH matching_phones AS (
      SELECT DISTINCT "phone"
      FROM "DiagnosisBooking"
      ${searchFilter}
    ), ranked_bookings AS (
      SELECT
        booking."fullName",
        booking."phone",
        booking."email",
        COUNT(*) OVER (PARTITION BY booking."phone")::int AS "totalBookings",
        MAX(booking."preferredDate") OVER (PARTITION BY booking."phone") AS "lastAppointmentDate",
        ROW_NUMBER() OVER (
          PARTITION BY booking."phone"
          ORDER BY booking."createdAt" DESC, booking."preferredDate" DESC
        ) AS row_number
      FROM "DiagnosisBooking" AS booking
      INNER JOIN matching_phones USING ("phone")
    )
    SELECT "fullName", "phone", "email", "totalBookings", "lastAppointmentDate"
    FROM ranked_bookings
    WHERE row_number = 1
    ORDER BY "lastAppointmentDate" DESC, "phone" ASC
    LIMIT ${limit} OFFSET ${skip}
  `;

  const [countRows, users] = await prisma.$transaction([
    prisma.$queryRaw(countQuery),
    prisma.$queryRaw(usersQuery),
  ]);
  const total = countRows[0]?.total ?? 0;

  res.status(200).json({
    success: true,
    data: { users, total, page, totalPages: Math.ceil(total / limit) },
  });
});

export const getPharmaUsers = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const search = typeof req.query.search === "string" ? req.query.search : "";
  const searchFilter = search
    ? Prisma.sql`WHERE "companyName" ILIKE ${`%${search}%`} OR "contactPerson" ILIKE ${`%${search}%`} OR "phone" ILIKE ${`%${search}%`}`
    : Prisma.empty;

  const countQuery = Prisma.sql`
    SELECT COUNT(*)::int AS "total"
    FROM (
      SELECT "phone"
      FROM "PharmaInquiry"
      ${searchFilter}
      GROUP BY "phone"
    ) AS phone_groups
  `;
  const usersQuery = Prisma.sql`
    WITH matching_phones AS (
      SELECT DISTINCT "phone"
      FROM "PharmaInquiry"
      ${searchFilter}
    ), ranked_inquiries AS (
      SELECT
        inquiry."companyName",
        inquiry."contactPerson",
        inquiry."phone",
        inquiry."businessEmail",
        COUNT(*) OVER (PARTITION BY inquiry."phone")::int AS "totalInquiries",
        MAX(inquiry."createdAt") OVER (PARTITION BY inquiry."phone") AS "lastInquiryDate",
        ROW_NUMBER() OVER (
          PARTITION BY inquiry."phone"
          ORDER BY inquiry."createdAt" DESC
        ) AS row_number
      FROM "PharmaInquiry" AS inquiry
      INNER JOIN matching_phones USING ("phone")
    )
    SELECT
      "companyName",
      "contactPerson",
      "phone",
      "businessEmail" AS "email",
      "totalInquiries",
      "lastInquiryDate"
    FROM ranked_inquiries
    WHERE row_number = 1
    ORDER BY "lastInquiryDate" DESC, "phone" ASC
    LIMIT ${limit} OFFSET ${skip}
  `;

  const [countRows, users] = await prisma.$transaction([
    prisma.$queryRaw(countQuery),
    prisma.$queryRaw(usersQuery),
  ]);
  const total = countRows[0]?.total ?? 0;

  res.status(200).json({
    success: true,
    data: { users, total, page, totalPages: Math.ceil(total / limit) },
  });
});
