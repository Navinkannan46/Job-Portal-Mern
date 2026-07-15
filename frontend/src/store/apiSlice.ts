import {
  type BaseQueryFn,
  type FetchArgs,
  fetchBaseQuery,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { logout } from "../features/auth/store/authSlice";
import { createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: "include",
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // try to get a new token - browser will send the refreshToken cookie automatically
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      // retry the initial query - browser will now have the new accessToken cookie
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Job", "Application", "Profile"],
  endpoints: () => ({}),
});
