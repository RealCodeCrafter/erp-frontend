// import React, { useState, useEffect, useRef } from "react";
// import { TfiMenu } from "react-icons/tfi";
// import { FaBell } from "react-icons/fa";
// import { CiSearch } from "react-icons/ci";
// import { useTranslation } from "react-i18next";
// import uzb from "../../assets/icons/uzb.webp";
// import rus from "../../assets/icons/rus.png";
// import "./menu.scss";
// import { useSearchStudentQuery } from "../../context/api/studentApi";

// function Menu({ setClose }) {
//   const { t, i18n } = useTranslation();
//   const [selectedLang, setSelectedLang] = useState("uzb");
//   const dropdownRef = useRef(null);
//   const [value, setValue] = useState("");

//   const { data } = useSearchStudentQuery({ name: value.trim() });
//   // console.log(data);

//   const searchData = data?.map((el) => <h2>{el?.groups[0]?.name}</h2>);

//   const handleClearSearch = () => {
//     setValue("");
//   };

//   const handleLanguageChange = (lang) => {
//     setSelectedLang(lang);
//     i18n.changeLanguage(lang);

//     const dropdown = document.querySelector(".custom-dropdown-options");
//     if (dropdown.classList.contains("show")) {
//       dropdown.classList.remove("show");
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         document
//           .querySelector(".custom-dropdown-options")
//           ?.classList.remove("show");
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="products__top">
//       <div className="products__top__left">
//         <button onClick={() => setClose((p) => !p)}>
//           <TfiMenu />
//         </button>
//         {/* <div className="products__top__left-form">
//           <CiSearch />
//           <input
//             placeholder={t("Search")}
//             onChange={(e) => setValue(e.target.value)}
//             className="search-results-form"
//             type="search"
//             value={value}
//           />
//           {value ? (
//             <>
//               <div
//                 className={`search-results ${
//                   value && data?.length ? "show" : ""
//                 }`}
//               >
//                 {value &&
//                   data?.map((el, index) => (
//                     <div key={index} className="search-item">
//                       <h4>{el?.firstName}</h4>
//                       <h4>{el?.groups[0]?.name}</h4>
//                     </div>
//                   ))}
//               </div>
//             </>
//           ) : (
//             <></>
//           )}
//         </div> */}
//       </div>

//       <div className="products__top__right">
//         <FaBell />
//         <div className="custom-dropdown" ref={dropdownRef}>
//           <div
//             className="custom-dropdown-selected"
//             onClick={() =>
//               document
//                 .querySelector(".custom-dropdown-options")
//                 .classList.toggle("show")
//             }
//           >
//             <img
//               src={selectedLang === "uzb" ? uzb : rus}
//               alt={selectedLang}
//               className="lang-icon"
//             />
//             <span>{t(selectedLang === "uzb" ? "Uzbek" : "Rus")}</span>
//           </div>
//           <div className="custom-dropdown-options">
//             <div
//               className="custom-dropdown-option"
//               onClick={() => handleLanguageChange("uzb")}
//             >
//               <img
//                 src={uzb}
//                 style={{ width: "30px", height: "30px" }}
//                 alt="Uzbek"
//                 className="lang-icon"
//               />
//               {t("Uzbek")}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Menu;

import React, { useState, useEffect, useRef } from "react";
import { TfiMenu } from "react-icons/tfi";
import { FaBell } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoMdMenu } from "react-icons/io";
import { useTranslation } from "react-i18next";
// import uzb from "../../assets/icons/uzb.webp";
// import rus from "../../assets/icons/rus.png";
import "./menu.scss";
import { useSearchStudentQuery } from "../../context/api/studentApi";

function Menu({ setClose, setSidebarOpen, sidebarOpen }) {
  const { t, i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState("uzb");
  const dropdownRef = useRef(null);
  const [value, setValue] = useState("");

  const { data } = useSearchStudentQuery({ name: value.trim() });

  const searchData = data?.map((el) => <h2>{el?.groups[0]?.name}</h2>);

  const handleClearSearch = () => {
    setValue("");
  };

  const handleLanguageChange = (lang) => {
    setSelectedLang(lang);
    i18n.changeLanguage(lang);

    const dropdown = document.querySelector(".custom-dropdown-options");
    if (dropdown.classList.contains("show")) {
      dropdown.classList.remove("show");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        document
          .querySelector(".custom-dropdown-options")
          ?.classList.remove("show");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="products__top">
      <div className="products__top__left">
        {/* Mobile sidebar toggle button */}
        <button
          className="menu__hamburger"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <IoMdMenu />
        </button>

        {/* Desktop sidebar toggle button */}
        <button
          className="menu__desktop-toggle"
          onClick={() => setClose((p) => !p)}
        >
          <TfiMenu />
        </button>

        {/* Search form (commented out in your original code) */}
        {/* <div className="products__top__left-form">
          <CiSearch />
          <input
            placeholder={t("Search")}
            onChange={(e) => setValue(e.target.value)}
            className="search-results-form"
            type="search"
            value={value}
          />
          {value ? (
            <>
              <div
                className={`search-results ${
                  value && data?.length ? "show" : ""
                }`}
              >
                {value &&
                  data?.map((el, index) => (
                    <div key={index} className="search-item">
                      <h4>{el?.firstName}</h4>
                      <h4>{el?.groups[0]?.name}</h4>
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <></>
          )}
        </div> */}
      </div>

      {/* <div className="products__top__right">
        <FaBell />
        <div className="custom-dropdown" ref={dropdownRef}>
          <div
            className="custom-dropdown-selected"
            onClick={() =>
              document
                .querySelector(".custom-dropdown-options")
                .classList.toggle("show")
            }
          >
            <img
              src={selectedLang === "uzb" ? uzb : rus}
              alt={selectedLang}
              className="lang-icon"
            />
            <span>{t(selectedLang === "uzb" ? "Uzbek" : "Rus")}</span>
          </div>
          <div className="custom-dropdown-options">
            <div
              className="custom-dropdown-option"
              onClick={() => handleLanguageChange("uzb")}
            >
              <img
                src={uzb}
                style={{ width: "30px", height: "30px" }}
                alt="Uzbek"
                className="lang-icon"
              />
              {t("Uzbek")}
            </div>
          </div>
        </div>
      </div> */}
      <div></div>
    </div>
  );
}

export default Menu;
