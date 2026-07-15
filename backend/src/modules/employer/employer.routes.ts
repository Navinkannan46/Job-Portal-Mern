import { Router } from "express";
import {
  getEmployerJobs,
  getMyCompany,
  getOwnProfile,
  updateEmployerProfile,
  updateEmployerJob,
  deleteEmployerJob,
  getEmployerApplicants,
  updateApplicantStatus,
} from "./employer.controller";
import { authMiddleware } from "../../common/middleware/auth.middleware";
import { roleMiddleware } from "../../common/middleware/role.middleware";
import { validateMiddleware } from "../../common/middleware/validate.middleware";
import { updateEmployerProfileSchema, updateApplicantStatusSchema } from "./employer.validation";
import { updateJobSchema } from "../job/job.validation";
import { Role } from "../../common/constants/role.enum";

const router = Router();

// Employer Profile Routes

router.get(
  "/profile",
  authMiddleware,
  roleMiddleware(Role.EMPLOYER),
  getOwnProfile,
);

router.patch(
  "/profile",
  authMiddleware,
  roleMiddleware(Role.EMPLOYER),
  validateMiddleware(updateEmployerProfileSchema),
  updateEmployerProfile,
);

router.get(
  "/my-companies",
  authMiddleware,
  roleMiddleware(Role.EMPLOYER),
  getMyCompany,
);

router.get(
  "/jobs",
  authMiddleware,
  roleMiddleware(Role.EMPLOYER),
  getEmployerJobs,
);

router.patch(
  "/jobs/:id",
  authMiddleware,
  roleMiddleware(Role.EMPLOYER),
  validateMiddleware(updateJobSchema),
  updateEmployerJob,
);

router.delete(
  "/jobs/:id",
  authMiddleware,
  roleMiddleware(Role.EMPLOYER),
  deleteEmployerJob,
);

router.get(
  "/applicants",
  authMiddleware,
  roleMiddleware(Role.EMPLOYER),
  getEmployerApplicants,
);

router.patch(
  "/applicants/:id/status",
  authMiddleware,
  roleMiddleware(Role.EMPLOYER),
  validateMiddleware(updateApplicantStatusSchema),
  updateApplicantStatus,
);

export default router;
