import { Router } from "express";
import { uploadResume } from "./upload.controller";
import { resumeUpload } from "../../common/utils/upload.utils";
import { authMiddleware } from "../../common/middleware/auth.middleware";

const router = Router();

// Endpoint for uploading a resume (authenticated)
router.post(
  "/resume",
  authMiddleware,
  resumeUpload.single("resume"),
  uploadResume,
);

export default router;
