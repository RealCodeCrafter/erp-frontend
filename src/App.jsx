import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Admin = lazy(() => import("./pages/admin/Admin"));
const Auth = lazy(() => import("./pages/auth/Auth"));
const SingleCustomer = lazy(() =>
  import("./pages/single-customer/SingleCustomer")
);
const Login = lazy(() => import("./pages/login/Login"));
const Register = lazy(() => import("./pages/register/Register"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const Students = lazy(() => import("./pages/admin/students/Students"));
const CreateStudents = lazy(() =>
  import("./pages/admin/createStudent/CreateStudents")
);
const Homework = lazy(() => import("./pages/admin/homework/Homework"));
const CreateTeacher = lazy(() =>
  import("./pages/admin/createTeacher/CreateTeacher")
);
const Teachers = lazy(() => import("./pages/admin/teachers/Teachers"));
const Course = lazy(() => import("./pages/courses/Course"));
const StudentRating = lazy(() =>
  import("./pages/admin/studentsRank/StudentsRank")
);
const Group = lazy(() => import("./pages/group/Group"));
const SingleGroup = lazy(() => import("./pages/group/singleGroup/SingleGroup"));
const Ranking = lazy(() => import("./components/rangking/Ranking"));
const Home = lazy(() => import("./pages/home/Home"));
import { Toaster } from "react-hot-toast";
import GroupTeacher from "./pages/group/GroupTeacher";
import GroupStudent from "./pages/group/GroupStudent";
import Lesson from "./pages/lessons/teacher/Lesson";
import Tasks from "./pages/lessons/teacher/Tasks";
import LessonStudent from "./pages/lessons/student/LessonStudent";
import TaskStudent from "./pages/lessons/student/TaskStudnet";
import StudentDetail from "./pages/studentDetail/StudentDetail";
import TeacherDetail from "./pages/teacherDetail/TeacherDetail";
import Davomat from "./components/davomat/Davomat";
import AttendanceAdminPanel from "./pages/attendance/AttendanceAdminPanel";
import CreateAdmin from "./pages/createAdmin/CreateAdmin";
import PaymentModule from "./pages/paymentModule/PaymentModule";
import PaymentTeacher from "./pages/paymentTeacher/PaymentTeacher";
import PaymentStudentsGroup from "./pages/paymentTeacher/PaymentStudentsGroup";
import AttendanceMissing from "./pages/attendanceMissing/AttendanceMissing";
import PaymentAccepted from "./pages/paymet/PaymentAccepted";

const App = () => {
  const role = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user")).role
    : "";

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={
                role === "superAdmin"
                  ? "/dashboard/statistics"
                  : role === "admin"
                  ? "/dashboard/students"
                  : "/dashboard/groupTeacher"
              }
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Auth />}>
          <Route path="dashboard/" element={<Admin />}>
            <Route path="statistics" element={<Home />} />
            <Route path="attendanceMissing" element={<AttendanceMissing />} />
            <Route path="create-admin" element={<CreateAdmin />} />
            <Route path="students" element={<Students />} />
            <Route path="attendance" element={<AttendanceAdminPanel />} />
            <Route path="paymentModule" element={<PaymentModule />} />
            <Route path="StudentRating" element={<StudentRating />} />
            <Route path="homework" element={<Homework />} />
            {/* <Route path="createStudents" element={<CreateStudents />} /> */}
            <Route path="customer/:id" element={<SingleCustomer />} />
            <Route path="teachers" element={<Teachers />} />
            <Route path="group" element={<Group />} />
            <Route path="groupTeacher" element={<GroupTeacher />} />
            <Route path="paymentTeacher" element={<PaymentTeacher />} />
            <Route path="groupStudent" element={<GroupStudent />} />
            <Route path="ranking" element={<Ranking />} />
            <Route path="task/:id" element={<Tasks />} />
            <Route path="taskStudent/:id" element={<TaskStudent />} />
            <Route path="profile" element={<Profile />} />
            <Route path="paymentAll" element={<PaymentAccepted />} />
            <Route path="groups/:id" element={<SingleGroup />} />
            <Route path="lessons/group/:id/" element={<Lesson />} />
            <Route
              path="lessons/group/:id/lesson/:lessonId"
              element={<Davomat />}
            />
            <Route
              path="group/paymetTeacher/:id"
              element={<PaymentStudentsGroup />}
            />
            <Route path="lessonStudent/:id" element={<LessonStudent />} />
            <Route path="createTeacher" element={<CreateTeacher />} />
            <Route path="course" element={<Course />} />
            <Route path="students/:id" element={<StudentDetail />} />
            <Route path="teacher/:id" element={<TeacherDetail />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
