import { apiSlice } from "@/store/apiSlice";

interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "EMPLOYER" | "USER";
  employerProfile?: {
    id: string;
    companyId: string;
    designation?: string;
  } | null;
  createdAt: string;
}

interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken?: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔐 Login
    login: builder.mutation<ApiResponse<AuthResponse>, LoginInput>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    // 📝 Register
    register: builder.mutation<ApiResponse<AuthResponse>, RegisterInput>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),

    // 👤 Get current user
    getMe: builder.query<ApiResponse<User>, void>({
      query: () => "/auth/me",
      providesTags: ["User"],
    }),

    // 🚪 Logout
    logout: builder.mutation<ApiResponse<void>, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    // 🔄 Refresh Token
    refresh: builder.mutation<ApiResponse<{ accessToken: string }>, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useLogoutMutation,
  useRefreshMutation,
} = authApi;
