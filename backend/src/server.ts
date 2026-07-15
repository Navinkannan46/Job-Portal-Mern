import app from "./app";
import { env } from "./config/env";
import { logger } from "./common/logger/logger";
import { prisma } from "./config/prisma";

const startServer = async () => {
  try {
    // Check DB connection
    await prisma.$connect();
    logger.info("Database connected successfully");
    console.log("Database connected successfully");

    app.listen(env.PORT, () => {
      logger.info(
        `Server is running in ${env.NODE_ENV} mode, on port ${env.PORT}`,
      );
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

// Handle unhandled Promise rejections mapping correctly via node events
process.on("unhandledRejection", (err: Error) => {
  logger.error("UNHANDLED REJECTION! 💥 Shutting down...");
  logger.error(err.name, { message: err.message });
  process.exit(1);
});
