import { Router } from "express";
import {
  createCompany,
  deleteCompany,
  getAllCompanies,
  getCompanyDetails,
  updateCompany,
} from "./company.controller";
import { authMiddleware } from "../../common/middleware/auth.middleware";
import { roleMiddleware } from "../../common/middleware/role.middleware";
import { validateMiddleware } from "../../common/middleware/validate.middleware";
import { createCompanySchema, updateCompanySchema } from "./company.validation";
import { Role } from "../../common/constants/role.enum";

const router = Router();
// create company
router.post(
  "/",
  authMiddleware,
  roleMiddleware(Role.EMPLOYER),
  validateMiddleware(createCompanySchema),
  createCompany,
);

// get all companies
router.get("/", authMiddleware, roleMiddleware(Role.ADMIN), getAllCompanies);

// get company details
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(Role.EMPLOYER, Role.ADMIN),
  getCompanyDetails,
);

// update company
router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware(Role.EMPLOYER),
  validateMiddleware(updateCompanySchema),
  updateCompany,
);

// delete company
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(Role.EMPLOYER),
  deleteCompany,
);

export default router;
