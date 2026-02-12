import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";

export const adminApi = createApi({
  reducerPath: "adminApi",

  baseQuery,

  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/admin/users",
    }),

    getAuditLogs: builder.query({
      query: () => "/admin/audit-logs",
    }),

    updateUserRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `/admin/users/${id}/role`,
        method: "PATCH",
        body: { role },
      }),
    }),

    deactivateUser: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}/deactivate`,
        method: "PATCH",
      }),
    }),

    getAdminStats: builder.query({
      query: () => "/admin/stats",
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetAuditLogsQuery,
  useUpdateUserRoleMutation,
  useDeactivateUserMutation,
  useGetAdminStatsQuery,

} = adminApi;
