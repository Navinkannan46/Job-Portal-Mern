import { z } from "zod";

export const createCompanySchema = z.object({
  name: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100),
  description: z.string().max(2000).optional(),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  logo: z.string().optional(),
  location: z.string().optional(),
  industry: z.string().optional(),
  companySize: z.string().optional(),
  foundedYear: z
    .number()
    .int()
    .min(1800)
    .max(new Date().getFullYear())
    .optional(),
});

export type CreateCompanyInput = z.infer<typeof createCompanySchema>;

export const updateCompanySchema = createCompanySchema.partial();

export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>;
