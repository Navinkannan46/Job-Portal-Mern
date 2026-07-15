import { z } from "zod";



export const updateEmployerProfileSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  companyId: z.string().optional(),
  designation: z.string().optional(),
  isPrimary: z.boolean().optional(),
});

export const updateApplicantStatusSchema = z.object({
  status: z.enum(["APPLIED", "SHORTLISTED", "REVIEWING", "HIRED", "REJECTED"]),
});
