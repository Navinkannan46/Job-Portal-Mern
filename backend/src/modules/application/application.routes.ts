import { Router } from "express";
import { authMiddleware } from "../../common/middleware/auth.middleware";
import { roleMiddleware } from "../../common/middleware/role.middleware";
import { validateMiddleware } from "../../common/middleware/validate.middleware";
import { Role } from "../../common/constants/role.enum";
import { applyForJobSchema } from "./application.validation";
import { applyForJob } from "./application.controller";

const router = Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(Role.USER),
  validateMiddleware(applyForJobSchema),
  applyForJob,
);

export default router;