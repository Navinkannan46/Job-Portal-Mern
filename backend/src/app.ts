import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes";
import { errorMiddleware } from "./common/middleware/error.middleware";
import { AppError } from "./common/errors/AppError";

const app: Application = express();

// Middlewares
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:4173"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// API Routes
app.use("/api/v1", routes);

// ✅ Handle undefined routes (FIXED)
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(errorMiddleware);

export default app;
