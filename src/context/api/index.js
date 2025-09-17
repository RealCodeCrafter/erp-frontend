import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { logout } from "../slices/authSlice";

const baseQuery = async (args, api, extraOptions) => {
  const { dispatch } = api;
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: "https://api.juratbekweb.uz",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  const result = await rawBaseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // Tokenni localStorage dan o'chirish
    localStorage.removeItem("accessToken");

    // Redux store dan user ma'lumotlarini o'chirish
    dispatch(logout());

    window.location.href = "/login";
  }

  return result;
};

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

export const api = createApi({
  reducerPath: "myApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: [
    "User",
    "Teacher",
    "Course",
    "Group",
    "Lesson",
    "Assigment",
    "Submission",
    "Attendance",
    ,
    "Profile",
  ],
  endpoints: () => ({}),
});
