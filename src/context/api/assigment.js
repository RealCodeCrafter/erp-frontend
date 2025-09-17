import { api } from ".";

export const assignmentApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAssignment: build.query({
      query: (id) => ({
        url: `assignments/lesson/${id}`,
      }),
      providesTags: ["Assigment"],
    }),
    createAssignment: build.mutation({
      query: (body) => ({
        url: "/assignments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Assigment"],
    }),
    deleteAssignment: build.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Assigment"],
    }),
    updateAssignment: build.mutation({
      query: ({ id, body }) => ({
        url: `/assignments/${id}`,
        method: "PUT", // or "PATCH"
        body,
      }),
      invalidatesTags: ["Assigment"],
    }),
  }),
});

export const {
  useGetAssignmentQuery,
  useCreateAssignmentMutation,
  useDeleteAssignmentMutation,
  useUpdateAssignmentMutation,
} = assignmentApi;
