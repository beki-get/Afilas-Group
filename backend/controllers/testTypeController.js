import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../utils/prisma.js";

export const getActiveTestTypes = asyncHandler(async (req, res) => {
  const testTypes = await prisma.testType.findMany({
    where: { isActive: true },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
  res.status(200).json({ success: true, data: testTypes });
});
