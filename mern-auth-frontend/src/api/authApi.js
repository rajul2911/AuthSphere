import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery,

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    signup: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    getMe: builder.query({
      query: () => "/auth/me",
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/auth/profile",
        method: "PATCH",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: data,
      }),
    }),
    getSessions: builder.query({
      query: () => "/auth/sessions",
    }),

    logoutSession: builder.mutation({
      query: (sessionId) => ({
        url: "/auth/logout-session",
        method: "POST",
        body: { sessionId },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useGetMeQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useGetSessionsQuery,
  useLogoutSessionMutation,
} = authApi;
