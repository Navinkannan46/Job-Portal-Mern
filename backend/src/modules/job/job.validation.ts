import { z } from "zod";
import { JobType, JobStatus } from "../../common/constants/status.enum";

export const createJobSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  companyId: z.string().uuid("Invalid company ID format"),
  skillsRequired: z.array(z.string()).min(1, "At least one skill is required"),
  educationRequired: z.string().optional(),
  isRemote: z.boolean().optional(),
  location: z.string().optional(),
  jobType: z.nativeEnum(JobType),
  experienceRequired: z.number().int().min(0).optional(),
  salaryMin: z.number().positive().optional(),
  salaryMax: z.number().positive().optional(),
  expiresAt: z.string().datetime().optional(),
  status: z.nativeEnum(JobStatus).optional().default(JobStatus.OPEN),
});

export const updateJobSchema = createJobSchema.partial();
