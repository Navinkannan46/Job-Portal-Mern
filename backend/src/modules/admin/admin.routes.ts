import { Role } from "@prisma/client";
import { authMiddleware } from "../../common/middleware/auth.middleware";
import { roleMiddleware } from "../../common/middleware/role.middleware";
import router from "../auth/auth.routes";
import {
  getAllEmployerProfiles,
  getEmployerProfileById,
  getUserProfileById,
  getAllUsers,
  getAllCompanies,
  getAllJobs,
  getAllApplications,
} from "./admin.controller";

router.get(
  "/employers",
  authMiddleware,
  roleMiddleware(Role.ADMIN),
  getAllEmployerProfiles,
);

router.get(
  "/employer/:id",
  authMiddleware,
  roleMiddleware(Role.ADMIN),
  getEmployerProfileById,
);

router.get(
  "/user/:id",
  authMiddleware,
  roleMiddleware(Role.ADMIN),
  getUserProfileById,
);

router.get(
  "/users",
  authMiddleware,
  roleMiddleware(Role.ADMIN),
  getAllUsers,
);

router.get(
  "/companies",
  authMiddleware,
  roleMiddleware(Role.ADMIN),
  getAllCompanies,
);

router.get(
  "/jobs",
  authMiddleware,
  roleMiddleware(Role.ADMIN),
  getAllJobs,
);

router.get(
  "/applications",
  authMiddleware,
  roleMiddleware(Role.ADMIN),
  getAllApplications,
);

export default router;
