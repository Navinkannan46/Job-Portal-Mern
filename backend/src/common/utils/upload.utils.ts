import multer from "multer";
import path from "path";
import fs from "fs";
import { AppError } from "../errors/AppError";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/resumes";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `resume-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  const allowedExtensions = [".pdf", ".doc", ".docx"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(
      new AppError("Only .pdf, .doc, and .docx files are allowed", 400),
      false,
    );
  }
};

export const resumeUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});
