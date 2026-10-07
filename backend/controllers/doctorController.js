import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../utils/prisma.js";

const getDoctors = asyncHandler(async (req, res, next) => {
  try {
    const { department } = req.query;

    const doctors = await prisma.doctor.findMany({
      where: {
        isActive: true,
        ...(department ? { department } : {}),
      },
      select: { id: true, name: true, department: true,  photoUrl: true,},
      orderBy: { name: "asc" },
    });

    res.status(200).json({ success: true, data: doctors });
  } catch (error) {
    next(error);
    console.error(error);
  }
});

export { getDoctors };
