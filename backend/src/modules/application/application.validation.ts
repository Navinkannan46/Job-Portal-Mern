import { z } from "zod";

export const applyForJobSchema = z.object({
  jobId: z.string().min(1, "Job ID is required"),
  resume: z.string().min(1, "Resume is required to apply for this job"),
  coverLetter: z.string().optional(),
});
