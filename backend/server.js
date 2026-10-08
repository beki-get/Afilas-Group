import express from "express";
import dotenv from "dotenv";
dotenv.config();

import AppError from "./utils/AppError.js";
import hospitalRoutes from "./routes/hospitalRoutes.js";
import availabilityRoutes from "./routes/availabilityRoutes.js";
import diagnosisRoutes from "./routes/diagnosisRoutes.js";
import pharmaRoutes from "./routes/pharmaRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import userAuthRoutes from "./routes/userAuthRoutes.js";
import adminDoctorRoutes from "./routes/adminDoctorRoutes.js";
import adminBookingRoutes from "./routes/adminBookingRoutes.js";
import adminInquiryRoutes from "./routes/adminInquiryRoutes.js";
import adminDepartmentRoutes from "./routes/adminDepartmentRoutes.js";
import adminTestTypeRoutes from "./routes/adminTestTypeRoutes.js";
import adminInterestAreaRoutes from "./routes/adminInterestAreaRoutes.js";
import adminServiceRoutes from "./routes/adminServiceRoutes.js";
import adminBlogRoutes from "./routes/adminBlogRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import adminOverviewRoutes from "./routes/adminOverviewRoutes.js";
import adminUsersRoutes from "./routes/adminUsersRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import testTypeRoutes from "./routes/testTypeRoutes.js";
import interestAreaRoutes from "./routes/interestAreaRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = Number(process.env.PORT) || 5001;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use("/api/book", hospitalRoutes);
app.use("/api/bookings", availabilityRoutes);
app.use("/api/book", diagnosisRoutes);
app.use("/api/book", pharmaRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/auth", userAuthRoutes);
app.use("/api/admin/doctors", adminDoctorRoutes);
app.use("/api/admin/bookings", adminBookingRoutes);
app.use("/api/admin/notifications", notificationRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin/inquiries", adminInquiryRoutes);
app.use("/api/admin/departments", adminDepartmentRoutes);
app.use("/api/admin/test-types", adminTestTypeRoutes);
app.use("/api/admin/interest-areas", adminInterestAreaRoutes);
app.use("/api/admin/services", adminServiceRoutes);
app.use("/api/admin/blog", adminBlogRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/admin/overview", adminOverviewRoutes);
app.use("/api/admin/users", adminUsersRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/test-types", testTypeRoutes);
app.use("/api/interest-areas", interestAreaRoutes);
app.use("/api/services", serviceRoutes);
app.get("/", (req, res) => {
  res.send("Hello, World! Running beautifully with ES Modules.");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  if (statusCode >= 500) {
    console.error(`${req.method} ${req.originalUrl} failed:`, err);
  }

  res.status(statusCode).json({
    success: false,
    error:
      err.isOperational || process.env.NODE_ENV !== "production"
        ? err.message
        : "Something went wrong",
  });
});
