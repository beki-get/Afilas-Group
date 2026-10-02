import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../utils/prisma.js";

export const getActiveInterestAreas = asyncHandler(async (req, res) => {
  const interestAreas = await prisma.interestArea.findMany({
    where: { isActive: true },
    select: { id: true, name: true, description: true },
    orderBy: { name: "asc" },
  });
  res.status(200).json({ success: true, data: interestAreas });
});
