// import React, { useState, useEffect } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { useDispatch } from "react-redux";
// import { logout } from "../../context/slices/authSlice";
// import { IoMdSettings } from "react-icons/io";
// import { jwtDecode } from "jwt-decode";
// import EqualizerIcon from "@mui/icons-material/Equalizer";
// import Groups2SharpIcon from "@mui/icons-material/Groups2Sharp";
// import AssignmentSharpIcon from "@mui/icons-material/AssignmentSharp";
// import PersonAddAltSharpIcon from "@mui/icons-material/PersonAddAltSharp";
// import PeopleIcon from "@mui/icons-material/People";
// import LogoutIcon from "@mui/icons-material/Logout";
// import AccountTreeIcon from "@mui/icons-material/AccountTree";
// import Diversity2SharpIcon from "@mui/icons-material/Diversity2Sharp";
// import HomeIcon from "@mui/icons-material/Home";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
// import ReportIcon from "@mui/icons-material/Report";
// import PaymentsIcon from "@mui/icons-material/Payments";
// import Groups3Icon from "@mui/icons-material/Groups3";
// import "./sidebar.scss";

// function Sidebar() {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // const [profileHide, setProfileHide] = useState(null);
//   const [role, setRole] = useState(
//     localStorage.getItem("user")
//       ? JSON.parse(localStorage.getItem("user")).role
//       : null
//   );

//   // console.log(role);

//   // useEffect(() => {
//   //   const token = localStorage.getItem("accessToken");
//   //   if (token) {
//   //     try {
//   //       const decodedToken = jwtDecode(token);
//   //       setRole(decodedToken.role);
//   //     } catch (error) {
//   //       console.error("Tokenni decoding qilishda xatolik:", error);
//   //     }
//   //   }
//   // }, []);

//   const renderMenuByRole = () => {
//     switch (role) {
//       case "superAdmin":
//         return (
//           <>
//             <li className="sidebar__list">
//               <NavLink to={"statistics"} className={"sidebar__left__text"}>
//                 <BarChartIcon />
//                 Dashboard
//               </NavLink>
//             </li>
//             <li className="sidebar__list">
//               <NavLink to={"create-admin"} className={"sidebar__left__text"}>
//                 <AdminPanelSettingsIcon />
//                 {t("Adminlar")}
//               </NavLink>
//             </li>
//             <li className="sidebar__list">
//               <NavLink to={"attendance"} className={"sidebar__left__text"}>
//                 <ReportIcon />
//                 Davomat
//               </NavLink>
//             </li>
//             <li className="sidebar__list">
//               <NavLink to={"paymentModule"} className={"sidebar__left__text"}>
//                 <PaymentsIcon />
//                 Oylik to'lov
//               </NavLink>
//             </li>
//             <li className="sidebar__list">
//               <NavLink to={"students"} className={"sidebar__left__text"}>
//                 <Groups2SharpIcon />
//                 {t("O'quvchilar")}
//               </NavLink>
//             </li>
//             <li className="sidebar__list">
//               <NavLink to={"teachers"} className={"sidebar__left__text"}>
//                 <PeopleIcon />
//                 {t("O'qituvchilar")}
//               </NavLink>
//             </li>
//             <li className="sidebar__list">
//               <NavLink
//                 to={"attendanceMissing"}
//                 className={"sidebar__left__text"}
//               >
//                 <Groups3Icon />
//                 Yoqlama qilmaganlar
//               </NavLink>
//             </li>
//             <li className="sidebar__list">
//               <NavLink to={"group"} className={"sidebar__left__text"}>
//                 <Diversity2SharpIcon />
//                 {t("Guruhlar")}
//               </NavLink>
//             </li>
//             {/* <li className="sidebar__list">
//               <NavLink to={"StudentRating"} className={"sidebar__left__text"}>
//                 <EqualizerIcon />
//                 {t("O'quvchilar reytingi")}
//               </NavLink>
//             </li>
//             {/* <li className="sidebar__list">
//               <NavLink to={"homework"} className={"sidebar__left__text"}>
//                 <AssignmentSharpIcon />
//                 {t("Vazifalar")}
//               </NavLink>
//             </li> */}
//             <li className="sidebar__list">
//               <NavLink to={"course"} className={"sidebar__left__text"}>
//                 <AccountTreeIcon />
//                 {t("Kurslar")}
//               </NavLink>
//             </li>
//           </>
//         );
//       case "admin":
//         return (
//           <>
//             <li className="sidebar__list">
//               <NavLink to={"attendance"} className={"sidebar__left__text"}>
//                 <ReportIcon />
//                 Davomat
//               </NavLink>
//             </li>
//             <li className="sidebar__list">
//               <NavLink to={"paymentModule"} className={"sidebar__left__text"}>
//                 <PaymentsIcon />
//                 Oylik to'lov
//               </NavLink>
//             </li>
//             <li className="sidebar__list">
//               <NavLink to={"students"} className={"sidebar__left__text"}>
//                 <Groups2SharpIcon />
//                 {t("O'quvchilar")}
//               </NavLink>
//             </li>
//             <li className="sidebar__list">
//               <NavLink
//                 to={"attendanceMissing"}
//                 className={"sidebar__left__text"}
//               >
//                 <Groups3Icon />
//                 Yoqlama qilmaganlar
//               </NavLink>
//             </li>
//             <li className="sidebar__list">
//               <NavLink to={"teachers"} className={"sidebar__left__text"}>
//                 <PeopleIcon />
//                 {t("O'qituvchilar")}
//               </NavLink>
//             </li>
//             <li className="sidebar__list">
//               <NavLink to={"group"} className={"sidebar__left__text"}>
//                 <Diversity2SharpIcon />
//                 {t("Guruhlar")}
//               </NavLink>
//             </li>
//             {/* <li className="sidebar__list">
//               <NavLink to={"StudentRating"} className={"sidebar__left__text"}>
//                 <EqualizerIcon />
//                 {t("O'quvchilar reytingi")}
//               </NavLink>
//             </li>
//             {/* <li className="sidebar__list">
//               <NavLink to={"homework"} className={"sidebar__left__text"}>
//                 <AssignmentSharpIcon />
//                 {t("Vazifalar")}
//               </NavLink>
//             </li> */}
//             <li className="sidebar__list">
//               <NavLink to={"course"} className={"sidebar__left__text"}>
//                 <AccountTreeIcon />
//                 {t("Kurslar")}
//               </NavLink>
//             </li>
//           </>
//         );
//       case "teacher":
//         return (
//           <>
//             <li className="sidebar__list">
//               <NavLink to={"groupTeacher"} className={"sidebar__left__text"}>
//                 <Diversity2SharpIcon />
//                 {t("Guruhlar")}
//               </NavLink>
//             </li>
//             <li className="sidebar__list">
//               <NavLink to={"paymentTeacher"} className={"sidebar__left__text"}>
//                 <EqualizerIcon />
//                 To'lovni tasdiqlash
//               </NavLink>
//             </li>
//           </>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <section className="sidebar">
//       <div>
//         <div className="sidebar__top">
//           <Link
//             onClick={() => setProfileHide(false)}
//             className="sidebar__top__info"
//             to={"profile"}
//           >
//             <button>D</button>
//             <h2>Diamond</h2>
//           </Link>
//         </div>

//         <ul className="sidebar__item">{renderMenuByRole()}</ul>
//       </div>
//       <div className="sidebar__btns">
//         <div className="sidebar__btns__title">
//           <IoMdSettings />
//           <p className="sidebar__btns-text">{t("Sozlamalar")}</p>
//         </div>
//         <div
//           className="sidebar__btns__title"
//           onClick={() => dispatch(logout())}
//         >
//           <LogoutIcon />
//           <p className="sidebar__btns-text">{t("Chiqish")}</p>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Sidebar;


import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { logout } from "../../context/slices/authSlice";
import { IoMdSettings, IoMdClose } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import Groups2SharpIcon from "@mui/icons-material/Groups2Sharp";
import AssignmentSharpIcon from "@mui/icons-material/AssignmentSharp";
import PersonAddAltSharpIcon from "@mui/icons-material/PersonAddAltSharp";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import Diversity2SharpIcon from "@mui/icons-material/Diversity2Sharp";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ReportIcon from "@mui/icons-material/Report";
import PaymentsIcon from "@mui/icons-material/Payments";
import Groups3Icon from "@mui/icons-material/Groups3";
import "./sidebar.scss";

function Sidebar({ isOpen, setIsOpen }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [role, setRole] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).role
      : null
  );

  // Close sidebar when clicking on a navigation item on mobile
  const handleNavClick = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  // Close sidebar when clicking outside
  const handleOverlayClick = () => {
    setIsOpen(false);
  };

  const renderMenuByRole = () => {
    switch (role) {
      case "superAdmin":
        return (
          <>
            <li className="sidebar__list">
              <NavLink
                to={"statistics"}
                className={"sidebar__left__text"}
                onClick={handleNavClick}
              >
                <BarChartIcon />
                Dashboard
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink
                to={"create-admin"}
                className={"sidebar__left__text"}
                onClick={handleNavClick}
              >
                <AdminPanelSettingsIcon />
                {t("Adminlar")}
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink
                to={"attendance"}
                className={"sidebar__left__text"}
                onClick={handleNavClick}
              >
                <ReportIcon />
                Davomat
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink
                to={"paymentModule"}
                className={"sidebar__left__text"}
                onClick={handleNavClick}
              >
                <PaymentsIcon />
                Oylik to'lov
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink
                to={"students"}
                className={"sidebar__left__text"}
                onClick={handleNavClick}
              >
                <Groups2SharpIcon />
                {t("O'quvchilar")}
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink
                to={"teachers"}
                className={"sidebar__left__text"}
                onClick={handleNavClick}
              >
                <PeopleIcon />
                {t("O'qituvchilar")}
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink
                to={"attendanceMissing"}
                className={"sidebar__left__text"}
                onClick={handleNavClick}
              >
                <Groups3Icon />
                Yoqlama qilmaganlar
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink
                to={"group"}
                className={"sidebar__left__text"}
                onClick={handleNavClick}
              >
                <Diversity2SharpIcon />
                {t("Guruhlar")}
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink
                to={"course"}
                className={"sidebar__left__text"}
                onClick={handleNavClick}
              >
                <AccountTreeIcon />
                {t("Kurslar")}
              </NavLink>
            </li>
          </>
        );
      case "admin":
        return (
          <>
            <li className="sidebar__list">
              <NavLink
                to={"attendance"}
                className={"sidebar__left__text"}
                onClick={handleNavClick}
              >
                <ReportIcon />
                Davomat
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink
                to={"paymentModule"}
                className={"sidebar__left__text"}
                onClick={handleNavClick}
              >
                <PaymentsIcon />
                Oylik to'lov
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink
                to={"students"}
                className={"sidebar__left__text"}
                onClick={handleNavClick}
              >
                <Groups2SharpIcon />
                {t("O'quvchilar")}
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink
                to={"attendanceMissing"}
                className={"sidebar__left__text"}
                onClick={handleNavClick}
              >
                <Groups3Icon />
                Yoqlama qilmaganlar
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink
                to={"teachers"}
                className={"sidebar__left__text"}
                onClick={handleNavClick}
              >
                <PeopleIcon />
                {t("O'qituvchilar")}
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink
                to={"group"}
                className={"sidebar__left__text"}
                onClick={handleNavClick}
              >
                <Diversity2SharpIcon />
                {t("Guruhlar")}
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink
                to={"course"}
                className={"sidebar__left__text"}
                onClick={handleNavClick}
              >
                <AccountTreeIcon />
                {t("Kurslar")}
              </NavLink>
            </li>
          </>
        );
      case "teacher":
        return (
          <>
            <li className="sidebar__list">
              <NavLink
                to={"groupTeacher"}
                className={"sidebar__left__text"}
                onClick={handleNavClick}
              >
                <Diversity2SharpIcon />
                {t("Guruhlar")}
              </NavLink>
            </li>
            <li className="sidebar__list">
              <NavLink
                to={"paymentTeacher"}
                className={"sidebar__left__text"}
                onClick={handleNavClick}
              >
                <EqualizerIcon />
                To'lovni tasdiqlash
              </NavLink>
            </li>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`sidebar-overlay ${isOpen ? "sidebar-overlay--show" : ""}`}
        onClick={handleOverlayClick}
      />

      <section className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        <div>
          {/* Close button for mobile */}
          <button
            className="sidebar__close-btn"
            onClick={() => setIsOpen(false)}
          >
            <IoMdClose />
          </button>

          <div className="sidebar__top">
            <Link
              className="sidebar__top__info"
              to={"profile"}
              onClick={handleNavClick}
            >
              <button>J</button>
              <h2>juratbekweb</h2>
            </Link>
          </div>

          <ul className="sidebar__item">{renderMenuByRole()}</ul>
        </div>
        <div className="sidebar__btns">
          <div className="sidebar__btns__title">
            <IoMdSettings />
            <p className="sidebar__btns-text">{t("Sozlamalar")}</p>
          </div>
          <div
            className="sidebar__btns__title"
            onClick={() => dispatch(logout())}
          >
            <LogoutIcon />
            <p className="sidebar__btns-text">{t("Chiqish")}</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Sidebar;