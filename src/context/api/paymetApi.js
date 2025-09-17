import { api } from ".";

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPaymets: build.query({
      query: (params) => ({
        url: "/payments",
        params,
      }),
      providesTags: ["Payment", "Customer"],
    }),
    getPaymetsAccepted: build.query({
      query: (params) => ({
        url: "/payments/paid",
        params,
      }),
      providesTags: ["Payment", "Customer"],
    }),
    getPaymetById: build.query({
      query: (id) => ({
        url: `/payments/${id}`,
      }),
      providesTags: ["Payment", "Customer"],
    }),
    getPaymentsStudentTeacher: build.query({
      query: ({ groupId, studentName }) => ({
        url: `/payments/report?groupId=${groupId}`,
      }),
      providesTags: ["Payment", "Customer"],
    }),
    createPaymet: build.mutation({
      query: (body) => ({
        url: "/payments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Payment", "Customer"],
    }),
    deletePaymet: build.mutation({
      query: (id) => ({
        url: `payments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Payment", "Customer"],
    }),
    updatePaymet: build.mutation({
      query: ({ id, body }) => ({
        url: `/update/payment/${id}`,
        method: "PUT", // or "PATCH"
        body,
      }),
      invalidatesTags: ["Payment", "Customer"],
    }),
    updatePaymetTeacher: build.mutation({
      query: (id) => ({
        url: `/payments/${id}/confirm-teacher`,
        method: "PUT", // or "PATCH"
      }),
      invalidatesTags: ["Payment", "Customer"],
    }),
  }),
});

export const {
  useGetPaymetsQuery,
  useGetPaymetsAcceptedQuery,
  useGetPaymentsStudentTeacherQuery,
  useGetPaymetByIdQuery,
  useCreatePaymetMutation,
  useDeletePaymetMutation,
  useUpdatePaymetMutation,
  useUpdatePaymetTeacherMutation,
} = productApi;
