import { apiSlice } from "@/store/apiSlice";

export const JobType = {
  FULL_TIME: "FULL_TIME",
  PART_TIME: "PART_TIME",
  CONTRACT: "CONTRACT",
  INTERNSHIP: "INTERNSHIP",
} as const;

export type JobType = (typeof JobType)[keyof typeof JobType];

export const JobStatus = {
  OPEN: "OPEN",
  CLOSED: "CLOSED",
  DRAFT: "DRAFT",
} as const;

export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus];

export interface CreateJobInput {
  title: string;
  description: string;
  companyId: string;
  skillsRequired: string[];
  location?: string;
  jobType: JobType;
  experienceRequired?: number;
  salaryMin?: number;
  salaryMax?: number;
  expiresAt?: string;
  status?: JobStatus;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface CreateCompanyInput {
  name: string;
  description?: string;
  website?: string;
  logo?: string;
  location?: string;
  industry?: string;
  companySize?: string;
  foundedYear?: number;
}

export interface Company extends CreateCompanyInput {
  id: string;
  isVerified: boolean;
  createdById: string;
  createdAt: string;
  updatedAt: string;
}

export const employerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    createJob: builder.mutation<ApiResponse<any>, CreateJobInput>({
      query: (jobData) => ({
        url: "/jobs",
        method: "POST",
        body: jobData,
      }),
      invalidatesTags: ["Job"],
    }),

    getMyJobs: builder.query<ApiResponse<any[]>, void>({
      query: () => "/employers/jobs",
      providesTags: ["jobs" as any],
    }),

    updateJob: builder.mutation<ApiResponse<any>, { id: string; data: Partial<CreateJobInput> }>({
      query: ({ id, data }) => ({
        url: `/employers/jobs/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["jobs" as any, "Job" as any],
    }),

    deleteJob: builder.mutation<ApiResponse<any>, string>({
      query: (id) => ({
        url: `/employers/jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["jobs" as any, "Job" as any],
    }),

    getApplicants: builder.query<ApiResponse<any[]>, void>({
      query: () => "/employers/applicants",
      providesTags: ["applicants" as any],
    }),

    updateApplicantStatus: builder.mutation<ApiResponse<any>, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/employers/applicants/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["applicants" as any],
    }),

    getJobById: builder.query<ApiResponse<any>, string>({
      query: (id) => `/jobs/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Job" as any, id }],
    }),

    createCompany: builder.mutation<ApiResponse<any>, CreateCompanyInput>({
      query: (companyData) => ({
        url: "/companies",
        method: "POST",
        body: companyData,
      }),
      invalidatesTags: ["Company" as any],
    }),


    getMyCompanies: builder.query<ApiResponse<Company[]>, void>({
      query: () => "/employers/my-companies",
      providesTags: ["Company" as any],
    }),

    getMyProfile: builder.query<ApiResponse<any>, void>({
      query: () => "/employers/profile",
      providesTags: ["profile" as any],
    }),

    updateProfile: builder.mutation<ApiResponse<any>, Partial<any>>({
      query: (profileData) => ({
        url: "/employers/profile",
        method: "PATCH",
        body: profileData,
      }),
      invalidatesTags: ["profile" as any],
    }),
  }),
});

export const {
  useCreateJobMutation,
  useCreateCompanyMutation,
  useGetMyCompaniesQuery,
  useGetMyJobsQuery,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useGetApplicantsQuery,
  useUpdateApplicantStatusMutation,
  useGetJobByIdQuery,
  useGetMyProfileQuery,
  useUpdateProfileMutation,
} = employerApi;
