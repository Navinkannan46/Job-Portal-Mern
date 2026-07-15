import { Router } from "express";
import { authMiddleware } from "../../common/middleware/auth.middleware";
import { validateMiddleware } from "../../common/middleware/validate.middleware";
import { updateUserSchema } from "./user.validation";
import { getProfile, updateProfile } from "./user.controller";
import { getMyApplications } from "./user.controller";
import { roleMiddleware } from "../../common/middleware/role.middleware";
import { Role } from "@prisma/client";

const router = Router();

// Requires authentication
router.use(authMiddleware);

router.get("/profile", roleMiddleware(Role.USER), getProfile);
router.patch(
  "/profile",
  roleMiddleware(Role.USER),
  validateMiddleware(updateUserSchema),
  updateProfile,
);
router.get("/applications", roleMiddleware(Role.USER), getMyApplications);

export default router;
