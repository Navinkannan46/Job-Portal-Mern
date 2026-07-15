import { Router, Request, Response } from "express";
import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/user/user.routes";
import employerRoutes from "../modules/employer/employer.routes";
import companyRoutes from "../modules/company/company.routes";
import jobRoutes from "../modules/job/job.routes";
import applicationRoutes from "../modules/application/application.routes";
import adminRoutes from "../modules/admin/admin.routes";
import uploadRoutes from "../modules/upload/upload.routes";
import { sendResponse } from "../common/utils/response";

const router = Router();

// Health Check
router.get("/health", (req: Request, res: Response) => {
  sendResponse(res, 200, "Server is healthy");
});

// Modular Routes
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/employers", employerRoutes);
router.use("/companies", companyRoutes);
router.use("/jobs", jobRoutes);
router.use("/applications", applicationRoutes);
router.use("/admin", adminRoutes);
router.use("/upload", uploadRoutes);

export default router;
