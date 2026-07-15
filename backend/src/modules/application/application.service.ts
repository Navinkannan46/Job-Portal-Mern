import {
  createApplication,
  findApplicationByJobAndUser,
} from "./application.repository";
import { AppError } from "../../common/errors/AppError";
import { prisma } from "../../config/prisma";

export const applyForJobService = async (data: {
  jobId: string;
  applicantId: string;
  resume: string;
  coverLetter?: string;
}) => {
  // Check if already applied
  const existingApplication = await findApplicationByJobAndUser(
    data.jobId,
    data.applicantId,
  );
  if (existingApplication) {
    throw new AppError("You have already applied for this job", 400);
  }

  // Check if job exists and is open
  const job = await prisma.job.findUnique({
    where: { id: data.jobId },
  });

  if (!job) {
    throw new AppError("Job not found", 404);
  }

  if (job.status !== "OPEN") {
    throw new AppError("This job is no longer accepting applications", 400);
  }

  // Create application and increment applicants count
  return await prisma.$transaction(async (tx) => {
    const application = await tx.application.create({
      data,
      include: {
        job: {
          select: {
            id: true,
            title: true,
            status: true,
            company: {
              select: {
                id: true,
                name: true,
                logo: true,
              },
            },
          },
        },
      },
    });

    await tx.job.update({
      where: { id: data.jobId },
      data: {
        applicantsCount: {
          increment: 1,
        },
      },
    });

    return application;
  });
};
