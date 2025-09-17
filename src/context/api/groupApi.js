import { api } from ".";

export const groupApi = api.injectEndpoints({
  endpoints: (build) => ({
    getGroupsAll: build.query({
      query: (params) => ({
        url: `/groups`,
        params,
      }),
      providesTags: ["Group"],
    }),
    getGroupsTeacher: build.query({
      query: (params) => ({
        url: `/groups/my/teacher/groups`,
        params,
      }),
      providesTags: ["Group"],
    }),
    getGroupsStudent: build.query({
      query: (params) => ({
        url: `/groups/my/student/groups`,
        params,
      }),
      providesTags: ["Group"],
    }),
    getGroupsIdStudents: build.query({
      query: (id) => ({
        url: `groups/${id}/students`,
      }),
      providesTags: ["Group"],
    }),
    getGroupsCourseId: build.query({
      query: (id) => ({
        url: `/groups/course/${id}`,
      }),
      providesTags: ["Group"],
    }),
    getGroupById: build.query({
      query: (id) => ({
        url: `/groups/${id}`,
      }),
      providesTags: ["Group"],
    }),
    createGroup: build.mutation({
      query: (body) => ({
        url: "/groups",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Group"],
    }),
    deleteGroup: build.mutation({
      query: (id) => ({
        url: `/groups/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Group"],
    }),
    updateGroup: build.mutation({
      query: ({ id, body }) => ({
        url: `/groups/${id}`,
        method: "PUT", // or "PATCH"
        body,
      }),
      invalidatesTags: ["Group"],
    }),
    addStudentToGroup: build.mutation({
      query: ({ groupId, studentId }) => ({
        url: `/groups/${groupId}/add-student?studentId=${studentId}`,
        method: "POST",
      }),
      invalidatesTags: ["Group", "Student"], // agar kerak bo‘lsa list yangilanishi uchun
    }),
  }),
});

export const {
  useGetGroupsAllQuery,
  useGetGroupsStudentQuery,
  useGetGroupsTeacherQuery,
  useGetGroupsIdStudentsQuery,
  useGetGroupsCourseIdQuery,
  useGetGroupByIdQuery,
  useCreateGroupMutation,
  useDeleteGroupMutation,
  useUpdateGroupMutation,
  useAddStudentToGroupMutation,
} = groupApi;
