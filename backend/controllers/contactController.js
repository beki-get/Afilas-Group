import { prisma } from "../utils/prisma.js";

export const createContactNotification = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      inquiry_type,
      subject,
      message,
    } = req.body;

    if (!name || !email || !inquiry_type || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Missing required contact fields",
      });
    }

    const notification = await prisma.notification.create({
      data: {
        type: "CONTACT",
        title: `New Contact Message: ${subject}`,
        message: `${name} (${email}) sent a ${inquiry_type} inquiry: ${message}`,
        relatedType: "CONTACT",
      },
    });

    return res.status(201).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    next(error);
  }
};