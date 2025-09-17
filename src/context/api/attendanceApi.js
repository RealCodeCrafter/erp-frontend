import { use } from "react";
import { api } from ".";

export const attendanceApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAttendances: build.query({
      query: (params) => ({
        url: "/attendance",
        params,
      }),
      providesTags: ["Attendance"],
    }),
    getAttendancesDailyStats: build.query({
      query: (params) => ({
        url: "/attendance/search/daily-stats",
        params,
      }),
      providesTags: ["Attendance"],
    }),
    getAttendancesDailyStatistics: build.query({
      query: (params) => ({
        url: "/attendance/missing",
        params,
      }),
      providesTags: ["Attendance"],
    }),
    getLessonAttendance: build.query({
      query: (id) => ({
        url: `/lessons/${id}/attendance-history`,
      }),
      providesTags: ["Attendance"],
    }),
    createAttendance: build.mutation({
      query: (body) => ({
        url: "/attendance",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Attendance"],
    }),
  }),
});

export const {
  useGetAttendancesQuery,
  useGetAttendancesDailyStatsQuery,
  useGetAttendancesDailyStatisticsQuery,
  useGetLessonAttendanceQuery,
  useCreateAttendanceMutation,
} = attendanceApi;
