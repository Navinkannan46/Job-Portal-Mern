import { apiSlice } from "../../../store/apiSlice";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminApplications: builder.query({
      query: () => "/admin/applications",
      providesTags: ["Application"],
    }),
    getAdminCompanies: builder.query({
      query: () => "/admin/companies",
      // Assuming 'Company' tag might be added later, using a string for now
      providesTags: ["Profile"], 
    }),
    getAdminJobs: builder.query({
      query: () => "/admin/jobs",
      providesTags: ["Job"],
    }),
    getAdminUsers: builder.query({
      query: () => "/admin/users",
      providesTags: ["User"],
    }),
    getAdminEmployers: builder.query({
      query: () => "/admin/employers",
      providesTags: ["Profile"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAdminApplicationsQuery,
  useGetAdminCompaniesQuery,
  useGetAdminJobsQuery,
  useGetAdminUsersQuery,
  useGetAdminEmployersQuery,
} = adminApi;
