import { apiSlice } from "@/store/apiSlice";
import type {
  JobType as EmployerJobType,
  JobStatus as EmployerJobStatus,
} from "../../employer/store/employerApi";

export type JobType = EmployerJobType;
export type JobStatus = EmployerJobStatus;

export interface CompanyInfo {
  id: string;
  name: string;
  logo?: string;
  location?: string;
  industry?: string;
  description?: string;
  website?: string;
}

export interface JobListJob {
  id: string;
  title: string;
  company: CompanyInfo;
  location?: string;
  jobType: JobType;
  salaryMin?: number;
  salaryMax?: number;
  createdAt: string;
}

export interface Job extends JobListJob {
  description: string;
  skillsRequired: string[];
  experienceRequired?: number;
  status: JobStatus;
  expiresAt?: string;
  applicantsCount: number;
  updatedAt: string;
  postedBy: {
    id: string;
    name: string;
    email: string;
  };
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description?: string;
  isCurrentJob: boolean;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  fieldOfStudy?: string;
  startYear: number;
  endYear?: number;
}

export interface UserProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  skills: string[];
  resume?: string;
  location?: string;
  expectedSalary?: number;
  bio?: string;
  experiences: Experience[];
  educations: Education[];
  createdAt: string;
  updatedAt: string;
}

export type ApplicationStatus =
  | "APPLIED"
  | "SHORTLISTED"
  | "PENDING"
  | "REVIEWING"
  | "HIRED"
  | "REJECTED";

export interface Application {
  id: string;
  status: ApplicationStatus;
  createdAt: string;
  job: {
    id: string;
    title: string;
    status: JobStatus;
    location: string;
    jobType: JobType;
    company: {
      id: string;
      name: string;
      logo?: string;
    };
  };
  resume?: string;
  coverLetter?: string;
}

export interface ApplicationStats {
  totalSent: number;
  shortlisted: number;
  hired: number;
  rejected: number;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const jobSeekerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔍 Get all jobs
    getJobs: builder.query<
      ApiResponse<JobListJob[]>,
      {
        search?: string;
        location?: string;
        experienceLevel?: string;
        salaryMin?: number;
        sort?: string;
      } | void
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          if (params.search) queryParams.append("search", params.search);
          if (params.location) queryParams.append("location", params.location);
          if (params.experienceLevel) queryParams.append("experienceLevel", params.experienceLevel);
          if (params.salaryMin !== undefined) queryParams.append("salaryMin", String(params.salaryMin));
          if (params.sort) queryParams.append("sort", params.sort);
        }
        const queryString = queryParams.toString();
        return queryString ? `/jobs?${queryString}` : "/jobs";
      },
      providesTags: ["Job"],
    }),

    // 🔍 Get a single job by ID
    getJob: builder.query<ApiResponse<Job>, string>({
      query: (id) => `/jobs/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Job", id }],
    }),

    // 👤 Get current user's profile
    getProfile: builder.query<ApiResponse<UserProfile>, void>({
      query: () => "/users/profile",
      providesTags: ["Profile"],
    }),

    // 📝 Update profile
    updateJobSeekerProfile: builder.mutation<
      ApiResponse<UserProfile>,
      Partial<UserProfile>
    >({
      query: (data) => ({
        url: "/users/profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),

    // 📄 Get user applications
    getApplications: builder.query<
      ApiResponse<{ stats: ApplicationStats; applications: Application[] }>,
      void
    >({
      query: () => "/users/applications",
      providesTags: ["Application"],
    }),

    // 📥 Apply for a job
    applyForJob: builder.mutation<
      ApiResponse<Application>,
      { jobId: string; resume: string; coverLetter?: string }
    >({
      query: (data) => ({
        url: "/applications",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application", "Job"],
    }),

    // 📁 Upload resume
    uploadResume: builder.mutation<ApiResponse<{ url: string }>, FormData>({
      query: (formData) => ({
        url: "/upload/resume",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobQuery,
  useGetProfileQuery,
  useUpdateJobSeekerProfileMutation,
  useGetApplicationsQuery,
  useApplyForJobMutation,
  useUploadResumeMutation,
} = jobSeekerApi;
