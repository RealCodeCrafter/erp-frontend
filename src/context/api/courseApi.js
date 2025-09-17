import { api } from ".";

export const courseApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCourses: build.query({
      query: (params) => ({
        url: `/courses`,
        params,
      }),
      providesTags: ["Course"],
    }),
    getCourseById: build.query({
      query: (id) => ({
        url: `/courses/${id}`,
      }),
      providesTags: ["Course"],
    }),
    createCourse: build.mutation({
      query: (body) => ({
        url: "/courses",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Course"],
    }),
    deleteCourse: build.mutation({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),
    updateCourse: build.mutation({
      query: ({ id, body }) => ({
        url: `/courses/${id}`,
        method: "PUT", // or "PATCH"
        body,
      }),
      invalidatesTags: ["Course"],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
} = courseApi;
