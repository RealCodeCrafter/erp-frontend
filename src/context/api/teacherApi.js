import { api } from ".";

export const teacherApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTeacher: build.query({
      query: (params) => ({
        url: "/teachers",
        params,
      }),
      providesTags: ["Teacher", "Customer"],
    }),
    getTeacherStatistic: build.query({
      query: (params) => ({
        url: "/teachers/teacher/group/statistics",
        params,
      }),
      providesTags: ["Teacher", "Customer"],
    }),
    SearchTeacher: build.query({
      query: (params) => ({
        url: "/teachers/search/groups",
        method: "GET",
        params,
      }),
      invalidatesTags: ["Teacher"],
    }),
    getTeacherById: build.query({
      query: (id) => ({
        url: `/teachers/${id}`,
      }),
      providesTags: ["Teacher", "Customer"],
    }),
    createTeacher: build.mutation({
      query: (body) => ({
        url: "/teachers",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Teacher", "Customer"],
    }),
    deleteTeacher: build.mutation({
      query: (id) => ({
        url: `/teachers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Teacher", "Customer"],
    }),
    updateTeacher: build.mutation({
      query: ({ id, body }) => ({
        url: `/teachers/${id}`,
        method: "PUT", // or "PATCH"
        body,
      }),
      invalidatesTags: ["Teacher", "Customer"],
    }),
  }),
});

export const {
  useGetTeacherQuery,
  useGetTeacherByIdQuery,
  useCreateTeacherMutation,
  useDeleteTeacherMutation,
  useUpdateTeacherMutation,
  useSearchTeacherQuery,
  useGetTeacherStatisticQuery
  
} = teacherApi;
