import { Router } from "express";
import { validateMiddleware } from "../../common/middleware/validate.middleware";
import { authMiddleware } from "../../common/middleware/auth.middleware";
import { registerSchema, loginSchema } from "./auth.validation";
import { register, login, refresh, logout, getMe } from "./auth.controller";

const router = Router();

router.post("/register", validateMiddleware(registerSchema), register);
router.post("/login", validateMiddleware(loginSchema), login);
router.post("/refresh", refresh);
router.post("/logout", authMiddleware, logout);
router.get("/me", authMiddleware, getMe);

export default router;
