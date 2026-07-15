import { Router } from "express";
import {
  createJob,
  deleteJob,
  getActiveJobs,
  getAllJobs,
  getJob,
  updateJob,
} from "./job.controller";
import { authMiddleware } from "../../common/middleware/auth.middleware";
import { roleMiddleware } from "../../common/middleware/role.middleware";
import { validateMiddleware } from "../../common/middleware/validate.middleware";
import { Role } from "../../common/constants/role.enum";
import { createJobSchema, updateJobSchema } from "./job.validation";

const router = Router();

// Public routes
router.get("/", getActiveJobs);
router.get("/:id", getJob);

// Employer routes
router.get("/all", authMiddleware, roleMiddleware(Role.ADMIN), getAllJobs);

router.post(
  "/",
  authMiddleware,
  roleMiddleware(Role.EMPLOYER),
  validateMiddleware(createJobSchema),
  createJob,
);

router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware(Role.EMPLOYER),
  validateMiddleware(updateJobSchema),
  updateJob,
);

router.delete("/:id", authMiddleware, roleMiddleware(Role.EMPLOYER), deleteJob);

export default router;
