import { api } from ".";

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAdmins: build.query({
      query: (params) => ({
        url: "/profiles/me",
        params,
      }),
      providesTags: ["Admin", "Customer", "Profile"],
    }),
    getAdminsList: build.query({
      query: () => ({
        url: "/admin",
      }),
      providesTags: ["Admin"],
    }),
    getAdminById: build.query({
      query: (id) => ({
        url: `/get/payments/${id}`,
      }),
      providesTags: ["Admin", "Customer"],
    }),
    getAdminStatistics: build.query({
      query: () => ({
        url: "/admin/statistics",
      }),
      providesTags: ["Admin", "Customer"],
    }),
    createAdmin: build.mutation({
      query: (body) => ({
        url: "/admin",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin"],
    }),
    deleteAdmin: build.mutation({
      query: (id) => ({
        url: `/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin", "Customer"],
    }),
    updateAdmin: build.mutation({
      query: ({ id, body }) => ({
        url: `/update/profile`,
        method: "PATCH", // or "PATCH"
        body,
      }),
      invalidatesTags: ["Admin", "Customer"],
    }),
    updateProfile: build.mutation({
      query: (body) => ({
        url: `/profiles`,
        method: "PUT", // or "PATCH"
        body,
      }),
      invalidatesTags: ["Admin", "Customer", "Profile"],
    }),
  }),
});

export const {
  useGetAdminsQuery,
  useGetAdminsListQuery,
  useGetAdminStatisticsQuery,
  useGetAdminByIdQuery,
  useCreateAdminMutation,
  useDeleteAdminMutation,
  useUpdateAdminMutation,
  useUpdateProfileMutation,
} = productApi;
