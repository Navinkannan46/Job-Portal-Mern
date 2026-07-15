import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  // Profile fields
  bio: z.string().optional(),
  skills: z.array(z.string()).optional(),
  resume: z.string().optional(),
  location: z.string().optional(),
  expectedSalary: z.number().optional(),
  experiences: z
    .array(
      z.object({
        company: z.string(),
        position: z.string(),
        startDate: z.string().transform((val) => new Date(val)),
        endDate: z
          .string()
          .optional()
          .transform((val) => (val ? new Date(val) : undefined)),
        description: z.string().optional(),
        isCurrentJob: z.boolean().optional().default(false),
      }),
    )
    .optional(),
  educations: z
    .array(
      z.object({
        degree: z.string(),
        institution: z.string(),
        fieldOfStudy: z.string().optional(),
        startYear: z.number(),
        endYear: z.number().nullable().optional(),
      }),
    )
    .optional(),
});
