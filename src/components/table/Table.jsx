// import React, { useState, useEffect, useRef } from "react";
// import "./table.scss";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import Module from "../Module/Module";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
// import {
//   useDeleteStudentMutation,
//   useGetStudentQuery,
//   useUpdateStudentMutation,
// } from "../../context/api/studentApi";
// import { AiOutlineDelete } from "react-icons/ai";
// import { CiEdit } from "react-icons/ci";
// import { IoMdMore } from "react-icons/io";
// import { VscCodeReview } from "react-icons/vsc";
// import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
// import toast from "react-hot-toast";
// import { Button, CircularProgress } from "@mui/material";
// import * as XLSX from "xlsx";
// import DeleteModule from "../deleteModule/DeleteModule";

// const Table = ({ data, payment, hide, filterBtn, groupData }) => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // URL parametrlarini o'qish
//   const getUrlParams = () => {
//     const params = new URLSearchParams(location.search);
//     return {
//       budget: params.get("budget") || "2",
//       filter: params.get("filter") || "0",
//       monthFilter:
//         params.get("month") ||
//         (() => {
//           const currentDate = new Date();
//           return `${currentDate.getFullYear()}-${String(
//             currentDate.getMonth() + 1
//           ).padStart(2, "0")}`;
//         })(),
//       page: parseInt(params.get("page")) || 1,
//     };
//   };

//   const urlParams = getUrlParams();

//   const [budget, setBudget] = useState("2"); // 2 = barchasi, 1 = to'lov qilgan, -1 = qilmagan
//   const [filter, setFilter] = useState("0"); // 0 = barchasi, boshqalar group id bo'ladi
//   const [monthFilter, setMonthFilter] = useState(() => {
//     // Joriy oyni default qilib o'rnatish
//     const currentDate = new Date();
//     return `${currentDate.getFullYear()}-${String(
//       currentDate.getMonth() + 1
//     ).padStart(2, "0")}`;
//   });
//   const [page, setPage] = useState(1);
//   const [deleteStudent, { isLoading: isDeleting }] = useDeleteStudentMutation();
//   const [updateStudent, { isError, isLoading, isSuccess }] =
//     useUpdateStudentMutation();
//   const [studentEdit, setStudentEdit] = useState(null);
//   const [activeStudentId, setActiveStudentId] = useState(null);
//   const { data: studentData } = useGetStudentQuery();
//   const [deleteHide, setDeleteHide] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);

//   // URL'ni yangilash funktsiyasi
//   const updateUrl = (newParams) => {
//     const searchParams = new URLSearchParams(location.search);

//     Object.entries(newParams).forEach(([key, value]) => {
//       if (value && value !== "0" && value !== "2" && value !== 1) {
//         searchParams.set(key, value);
//       } else if (key === "page" && value !== 1) {
//         searchParams.set(key, value);
//       } else if (
//         (key === "budget" && value !== "2") ||
//         (key === "filter" && value !== "0")
//       ) {
//         searchParams.set(key, value);
//       } else {
//         searchParams.delete(key);
//       }
//     });

//     const newSearch = searchParams.toString();
//     const newUrl = `${location.pathname}${newSearch ? `?${newSearch}` : ""}`;

//     if (newUrl !== `${location.pathname}${location.search}`) {
//       navigate(newUrl, { replace: true });
//     }
//   };

//   // Pagination uchun constants
//   const ITEMS_PER_PAGE = 10;

//   const getAvailableMonths = () => {
//     const months = new Set();

//     data?.forEach((student) => {
//       student.payments?.forEach((payment) => {
//         if (payment.monthFor) {
//           months.add(payment.monthFor);
//         }
//       });
//     });

//     const currentYear = new Date().getFullYear();
//     const years = [currentYear - 1, currentYear, currentYear + 1];

//     years.forEach((year) => {
//       for (let month = 1; month <= 12; month++) {
//         const monthStr = `${year}-${String(month).padStart(2, "0")}`;
//         months.add(monthStr);
//       }
//     });

//     return Array.from(months).sort().reverse(); // Eng yangi oyni birinchi qo'yish
//   };

//   const formatMonthName = (monthString) => {
//     if (!monthString) return "";
//     const [year, month] = monthString.split("-");
//     const months = [
//       "Yanvar",
//       "Fevral",
//       "Mart",
//       "Aprel",
//       "May",
//       "Iyun",
//       "Iyul",
//       "Avgust",
//       "Sentabr",
//       "Oktabr",
//       "Noyabr",
//       "Dekabr",
//     ];
//     return `${months[parseInt(month) - 1]} ${year}`;
//   };

//   // Filterlangan data
//   const filteredData = data
//     ?.filter((el) => {
//       // To'lov holati bo'yicha filter
//       if (budget === "1") {
//         return el?.payments?.some(
//           (p) => p.monthFor === monthFilter && p.paid === true
//         );
//       } else if (budget === "-1") {
//         const hasPaymentForMonth = el?.payments?.find(
//           (p) => p.monthFor === monthFilter
//         );
//         if (hasPaymentForMonth) {
//           return hasPaymentForMonth.paid === false;
//         } else {
//           return true;
//         }
//       }
//       return true;
//     })
//     ?.filter((el) => {
//       if (filter !== "0") {
//         return el?.groups?.some((g) => String(g.id) === filter);
//       }
//       return true;
//     });

//   // Pagination uchun
//   const totalPages = Math.ceil((filteredData?.length || 0) / ITEMS_PER_PAGE);
//   const startIndex = (page - 1) * ITEMS_PER_PAGE;
//   const endIndex = startIndex + ITEMS_PER_PAGE;
//   const currentPageData = filteredData?.slice(startIndex, endIndex) || [];

//   const menuRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setActiveStudentId(null);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Filter o'zgarishini kuzatish va URL yangilash
//   useEffect(() => {
//     updateUrl({ budget, filter, month: monthFilter, page });
//   }, [budget, filter, monthFilter, page]);

//   // URL o'zgarishini kuzatish
//   useEffect(() => {
//     const newParams = getUrlParams();
//     if (newParams.budget !== budget) setBudget(newParams.budget);
//     if (newParams.filter !== filter) setFilter(newParams.filter);
//     if (newParams.monthFilter !== monthFilter)
//       setMonthFilter(newParams.monthFilter);
//     if (newParams.page !== page) setPage(newParams.page);
//   }, [location.search]);

//   const handlePageChange = (event, value) => {
//     setPage(value);
//     setActiveStudentId(null);
//   };

//   useEffect(() => {
//     if (page > totalPages && totalPages > 0) {
//       setPage(1);
//     }
//   }, [filteredData?.length, page, totalPages]);

//   const handleDeleteClick = (id) => {
//     setDeleteId(id);
//     setDeleteHide(true);
//     setActiveStudentId(null); // Menuni yopish
//   };

//   const handleDeleteConfirm = async () => {
//     if (deleteId) {
//       try {
//         await deleteStudent(deleteId).unwrap();
//         toast.success("O'quvchi o'chirildi");
//         setDeleteHide(false);
//         setDeleteId(null);
//       } catch (error) {
//         toast.error("O'quvchini o'chirishda xatolik yuz berdi");
//         console.error("Delete error:", error);
//       }
//     }
//   };

//   const handleEdit = (student) => {
//     setStudentEdit(student);
//     setActiveStudentId(null); // Menuni yopish
//   };

//   const formatPhoneNumber = (phone) => {
//     if (!phone) return "";
//     return phone.startsWith("+") ? phone : `+${phone}`;
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();

//     const updatedStudent = {
//       firstName: studentEdit.firstName,
//       lastName: studentEdit.lastName,
//       address: studentEdit.address,
//       phone: formatPhoneNumber(studentEdit.phone),
//       parentPhone: formatPhoneNumber(studentEdit.parentPhone),
//     };

//     await updateStudent({
//       body: updatedStudent,
//       id: studentEdit.id,
//     });
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success("O'quvchi ma'lumotlari yangilandi");
//       setStudentEdit(null);
//       setActiveStudentId(null);
//     }
//     if (isError) {
//       toast.error("Xatolik yuz berdi, iltimos qayta urinib ko'ring");
//     }
//   }, [isError, isLoading, isSuccess]);

//   const toggleMenu = (id) => {
//     setActiveStudentId(activeStudentId === id ? null : id);
//   };

//   // Excel export function
//   const handleExportToExcel = () => {
//     if (!filteredData || filteredData.length === 0) {
//       toast.error("Export uchun ma'lumot topilmadi");
//       return;
//     }

//     // Prepare data for Excel
//     const excelData = filteredData.map((el, index) => {
//       const relevantPayment = el?.payments?.find(
//         (p) => p.monthFor === monthFilter
//       );
//       const isPaid = relevantPayment ? relevantPayment.paid : false;
//       const paymentAmount = relevantPayment?.amount;

//       const rowData = {
//         "№": index + 1,
//         Ism: el?.firstName || "",
//         Familiya: el?.lastName || "",
//         "Telefon raqam": el?.phone || "",
//       };

//       if (hide) {
//         rowData["Ota/Ona nomeri"] = el?.parentPhone || "";
//       } else {
//         rowData["Guruh(lar)"] =
//           el?.groups?.map((g) => g.name).join(", ") || "-";
//       }

//       if (payment) {
//         rowData["To'lov holati"] = isPaid ? "To'lov qilgan" : "To'lov qilmagan";
//         rowData["To'lov miqdori"] = paymentAmount
//           ? `${Number(paymentAmount).toLocaleString()} so'm`
//           : "-";
//         rowData["To'lov oyi"] = formatMonthName(monthFilter);
//       }

//       return rowData;
//     });

//     // Create workbook and worksheet
//     const wb = XLSX.utils.book_new();
//     const ws = XLSX.utils.json_to_sheet(excelData);

//     // Set column widths
//     const colWidths = [
//       { wch: 5 },
//       { wch: 15 },
//       { wch: 15 },
//       { wch: 15 },
//       { wch: 20 },
//     ];

//     if (payment) {
//       colWidths.push({ wch: 15 }, { wch: 15 }, { wch: 15 });
//     }

//     ws["!cols"] = colWidths;
//     XLSX.utils.book_append_sheet(wb, ws, "O'quvchilar");

//     const currentDate = new Date()
//       .toLocaleDateString("uz-UZ")
//       .replace(/\//g, "-");
//     const filename = `oquvchilar_${formatMonthName(monthFilter).replace(
//       /\s/g,
//       "_"
//     )}_${currentDate}.xlsx`;

//     try {
//       XLSX.writeFile(wb, filename);
//       toast.success("Excel fayl muvaffaqiyatli yuklab olindi");
//     } catch (error) {
//       console.error("Excel export error:", error);
//       toast.error("Excel faylni yuklab olishda xatolik yuz berdi");
//     }
//   };

//   return (
//     <div className="table">
//       {filterBtn && (
//         <div className="table__select">
//           <button>Jami: {filteredData?.length}</button>

//           {/* Oy bo'yicha filter */}
//           <select
//             value={monthFilter}
//             onChange={(e) => {
//               setMonthFilter(e.target.value);
//               setPage(1);
//             }}
//           >
//             {getAvailableMonths().map((month) => (
//               <option key={month} value={month}>
//                 {formatMonthName(month)}
//               </option>
//             ))}
//           </select>

//           <select
//             value={budget}
//             onChange={(e) => {
//               setBudget(e.target.value);
//               setPage(1);
//             }}
//           >
//             <option value="2">Barchasi</option>
//             <option value="1">To'lov qilgan</option>
//             <option value="-1">To'lov qilmagan</option>
//           </select>

//           <select
//             value={filter}
//             onChange={(e) => {
//               setFilter(e.target.value);
//               setPage(1);
//             }}
//           >
//             <option value="0">Barcha guruhlar</option>
//             {groupData?.groups?.map((g) => (
//               <option key={g.id} value={g.id}>
//                 {g.name}
//               </option>
//             ))}
//           </select>

//           {/* Excel Export Button */}
//           <button
//             onClick={handleExportToExcel}
//             className="table__excel-btn"
//             style={{
//               backgroundColor: "#28a745",
//               color: "white",
//               border: "none",
//               padding: "12px 16px",
//               borderRadius: "4px",
//               cursor: "pointer",
//               display: "flex",
//               alignItems: "center",
//               gap: "8px",
//               fontSize: "14px",
//               fontWeight: "bold",
//               transition: "background-color 0.2s",
//             }}
//             onMouseEnter={(e) => (e.target.style.backgroundColor = "#218838")}
//             onMouseLeave={(e) => (e.target.style.backgroundColor = "#28a745")}
//           >
//             <PiMicrosoftExcelLogoFill size={18} />
//             Excel yuklash
//           </button>
//         </div>
//       )}

//       {/* Table Rows */}
//       <table className="table__row">
//         <thead>
//           <tr style={{ textAlign: "center" }}>
//             <th>№</th>
//             <th>F.I.Sh</th>
//             <th>Manzil</th>
//             <th>Telefon nomer</th>
//             {hide ? <th>Ota/Ona nomeri</th> : <th>Guruh(lar)</th>}
//             {payment && <th>To'lov holati</th>}
//             {payment && <th>To'lov miqdori</th>}
//             <th>/</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentPageData?.length > 0 ? (
//             currentPageData.map((el, index) => {
//               const relevantPayment = el?.payments?.find(
//                 (p) => p.monthFor === monthFilter
//               );
//               const isPaid = relevantPayment ? relevantPayment.paid : false;
//               const paymentAmount = relevantPayment?.amount;

//               return (
//                 <tr key={el?.id}>
//                   <td data-cell="№">{startIndex + index + 1}</td>
//                   <td data-cell="F.I.Sh">
//                     {el?.firstName} {el?.lastName}
//                   </td>
//                   <td data-cell="Manzil">{el?.address}</td>
//                   <td data-cell="Tel raqam">{el?.phone || "+998123531282"}</td>

//                   {hide ? (
//                     <td data-cell="Ota ona nomeri">{el?.parentPhone}</td>
//                   ) : (
//                     <td data-cell="Gruhi">
//                       {el?.groups?.map((g) => g.name).join(", ") || "-"}
//                     </td>
//                   )}

//                   {payment && (
//                     <>
//                       <td
//                         style={{
//                           color: isPaid ? "green" : "red",
//                           fontWeight: "bold",
//                         }}
//                         data-cell="Holati"
//                       >
//                         {isPaid ? "To'lov qilgan" : "To'lov qilmagan"}
//                       </td>
//                       <td data-cell="Tolov ">
//                         {paymentAmount
//                           ? `${Number(paymentAmount).toLocaleString()} so'm`
//                           : "-"}
//                       </td>
//                     </>
//                   )}

//                   <td
//                     style={{ cursor: "pointer" }}
//                     onClick={() => toggleMenu(el?.id)}
//                     data-cell="info"
//                   >
//                     <IoMdMore />
//                   </td>

//                   {activeStudentId === el?.id && (
//                     <div className="table__hide" ref={menuRef}>
//                       <button
//                         onClick={() => handleDeleteClick(el?.id)}
//                         className="table__btns-view"
//                         disabled={isDeleting}
//                       >
//                         <AiOutlineDelete />
//                         <span>delete</span>
//                       </button>
//                       <button
//                         onClick={() => handleEdit(el)}
//                         className="table__btns-view"
//                         disabled={isDeleting}
//                       >
//                         <CiEdit />
//                         <span>edit</span>
//                       </button>
//                       {hide ? (
//                         <Link to={`/dashboard/students/${el?.id}`}>
//                           <button
//                             className="table__btns-view"
//                             disabled={isDeleting}
//                           >
//                             <VscCodeReview />
//                             <span>batafsil</span>
//                           </button>
//                         </Link>
//                       ) : (
//                         <Link to={`/dashboard/teacher/${el.id}`}>
//                           <button
//                             className="table__btns-view"
//                             disabled={isDeleting}
//                           >
//                             <VscCodeReview />
//                             batafsil
//                           </button>
//                         </Link>
//                       )}
//                     </div>
//                   )}
//                 </tr>
//               );
//             })
//           ) : (
//             <tr>
//               <td colSpan={8} style={{ textAlign: "center", padding: "20px" }}>
//                 Ma'lumot topilmadi
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Delete Module */}
//       {deleteHide && (
//         <DeleteModule
//           close={() => {
//             setDeleteHide(false);
//             setDeleteId(null);
//           }}
//           width="250px"
//           onConfirm={handleDeleteConfirm}
//           isLoading={isDeleting}
//         />
//       )}

//       {/* Pagination har doim ko'rinadi */}
//       {filteredData && (
//         <div className="table__pagenation">
//           <Stack spacing={2}>
//             <Pagination
//               count={totalPages || 1}
//               page={page}
//               onChange={handlePageChange}
//               variant="outlined"
//               shape="rounded"
//               size="large"
//               showFirstButton
//               showLastButton
//             />
//           </Stack>
//         </div>
//       )}

//       {/* Edit Form */}
//       {studentEdit && (
//         <Module close={setStudentEdit} bg={"#aaa6"}>
//           <form className="students__edit" onSubmit={handleEditSubmit}>
//             <h3 className="students__edit-title">O'quvchini taxrirlash</h3>

//             <label>
//               Ism
//               <input
//                 type="text"
//                 value={studentEdit.firstName}
//                 onChange={(e) =>
//                   setStudentEdit((prev) => ({
//                     ...prev,
//                     firstName: e.target.value,
//                   }))
//                 }
//                 required
//                 disabled={isLoading}
//               />
//             </label>

//             <label>
//               Familiya
//               <input
//                 type="text"
//                 value={studentEdit.lastName}
//                 onChange={(e) =>
//                   setStudentEdit((prev) => ({
//                     ...prev,
//                     lastName: e.target.value,
//                   }))
//                 }
//                 required
//                 disabled={isLoading}
//               />
//             </label>

//             <label>
//               Telefon raqam
//               <PhoneInput
//                 country={"uz"}
//                 value={studentEdit.phone}
//                 onChange={(phone) =>
//                   setStudentEdit((prev) => ({
//                     ...prev,
//                     phone: phone,
//                   }))
//                 }
//                 disabled={isLoading}
//                 inputClass="phone-input"
//               />
//             </label>

//             <label>
//               Ota ona telefon raqami
//               <PhoneInput
//                 country={"uz"}
//                 value={studentEdit.parentPhone}
//                 onChange={(phone) =>
//                   setStudentEdit((prev) => ({
//                     ...prev,
//                     parentPhone: phone,
//                   }))
//                 }
//                 disabled={isLoading}
//                 inputClass="phone-input"
//               />
//             </label>

//             <Button
//               className="students__edit-btn"
//               type="submit"
//               disabled={isLoading}
//               variant="contained"
//               startIcon={
//                 isLoading ? (
//                   <CircularProgress size={20} color="inherit" />
//                 ) : null
//               }
//             >
//               {isLoading ? "O'zgartirilmoqda..." : "O'zgartirish"}
//             </Button>
//           </form>
//         </Module>
//       )}
//     </div>
//   );
// };

// export default Table;
import React, { useState, useEffect, useRef } from "react";
import "./table.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Module from "../Module/Module";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
  useDeleteStudentMutation,
  useGetStudentQuery,
  useUpdateStudentMutation,
} from "../../context/api/studentApi";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { IoMdMore } from "react-icons/io";
import { VscCodeReview } from "react-icons/vsc";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import toast from "react-hot-toast";
import { Button, CircularProgress } from "@mui/material";
import * as XLSX from "xlsx";
import DeleteModule from "../deleteModule/DeleteModule";

const Table = ({ data, payment, hide, filterBtn, groupData }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // URL parametrlarini o'qish
  const getUrlParams = () => {
    const params = new URLSearchParams(location.search);
    return {
      budget: params.get("budget") || "2",
      filter: params.get("filter") || "0",
      page: parseInt(params.get("page")) || 1,
    };
  };

  const urlParams = getUrlParams();

  const [budget, setBudget] = useState("2"); // 2 = barchasi, 1 = to'lov qilgan, -1 = qilmagan
  const [filter, setFilter] = useState("0"); // 0 = barchasi, boshqalar group id bo'ladi
  const [page, setPage] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const [deleteStudent, { isLoading: isDeleting }] = useDeleteStudentMutation();
  const [updateStudent, { isError, isLoading, isSuccess }] =
    useUpdateStudentMutation();
  const [studentEdit, setStudentEdit] = useState(null);
  const [activeStudentId, setActiveStudentId] = useState(null);
  const { data: studentData } = useGetStudentQuery();
  const [deleteHide, setDeleteHide] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Device detection functions
  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  const isAndroid = () => {
    return /Android/i.test(navigator.userAgent);
  };

  // URL'ni yangilash funktsiyasi
  const updateUrl = (newParams) => {
    const searchParams = new URLSearchParams(location.search);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value && value !== "0" && value !== "2" && value !== 1) {
        searchParams.set(key, value);
      } else if (key === "page" && value !== 1) {
        searchParams.set(key, value);
      } else if (
        (key === "budget" && value !== "2") ||
        (key === "filter" && value !== "0")
      ) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }
    });

    const newSearch = searchParams.toString();
    const newUrl = `${location.pathname}${newSearch ? `?${newSearch}` : ""}`;

    if (newUrl !== `${location.pathname}${location.search}`) {
      navigate(newUrl, { replace: true });
    }
  };

  // Pagination uchun constants
  const ITEMS_PER_PAGE = 10;

  // Filterlangan data
  const filteredData = data
    ?.filter((el) => {
      // To'lov holati bo'yicha filter
      if (budget === "1") {
        return el?.payments?.some((p) => p.paid === true);
      } else if (budget === "-1") {
        return !el?.payments?.some((p) => p.paid === true);
      }
      return true;
    })
    ?.filter((el) => {
      if (filter !== "0") {
        return el?.groups?.some((g) => String(g.id) === filter);
      }
      return true;
    });

  // Pagination uchun
  const totalPages = Math.ceil((filteredData?.length || 0) / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPageData = filteredData?.slice(startIndex, endIndex) || [];

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveStudentId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter o'zgarishini kuzatish va URL yangilash
  useEffect(() => {
    updateUrl({ budget, filter, page });
  }, [budget, filter, page]);

  // URL o'zgarishini kuzatish
  useEffect(() => {
    const newParams = getUrlParams();
    if (newParams.budget !== budget) setBudget(newParams.budget);
    if (newParams.filter !== filter) setFilter(newParams.filter);
    if (newParams.page !== page) setPage(newParams.page);
  }, [location.search]);

  const handlePageChange = (event, value) => {
    setPage(value);
    setActiveStudentId(null);
  };

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(1);
    }
  }, [filteredData?.length, page, totalPages]);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setDeleteHide(true);
    setActiveStudentId(null); // Menuni yopish
  };

  const handleDeleteConfirm = async () => {
    if (deleteId) {
      try {
        await deleteStudent(deleteId).unwrap();
        toast.success("O'quvchi o'chirildi");
        setDeleteHide(false);
        setDeleteId(null);
      } catch (error) {
        toast.error("O'quvchini o'chirishda xatolik yuz berdi");
        console.error("Delete error:", error);
      }
    }
  };

  const handleEdit = (student) => {
    setStudentEdit(student);
    setActiveStudentId(null); // Menuni yopish
  };

  const formatPhoneNumber = (phone) => {
    if (!phone) return "";
    return phone.startsWith("+") ? phone : `+${phone}`;
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const updatedStudent = {
      firstName: studentEdit.firstName,
      lastName: studentEdit.lastName,
      address: studentEdit.address,
      phone: formatPhoneNumber(studentEdit.phone),
      parentPhone: formatPhoneNumber(studentEdit.parentPhone),
    };

    await updateStudent({
      body: updatedStudent,
      id: studentEdit.id,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("O'quvchi ma'lumotlari yangilandi");
      setStudentEdit(null);
      setActiveStudentId(null);
    }
    if (isError) {
      toast.error("Xatolik yuz berdi, iltimos qayta urinib ko'ring");
    }
  }, [isError, isLoading, isSuccess]);

  const toggleMenu = (id) => {
    setActiveStudentId(activeStudentId === id ? null : id);
  };

  // Android uchun yangilangan Excel export function
  const handleExportToExcel = async () => {
    if (!filteredData || filteredData.length === 0) {
      toast.error("Export uchun ma'lumot topilmadi");
      return;
    }

    setIsExporting(true);

    try {
      // Prepare data for Excel
      const excelData = filteredData.map((el, index) => {
        const isPaid = el?.payments?.some((p) => p.paid === true);
        const paymentAmount = el?.payments?.find((p) => p.paid === true)?.amount;

        const rowData = {
          "№": index + 1,
          Ism: el?.firstName || "",
          Familiya: el?.lastName || "",
          "Telefon raqam": el?.phone || "",
        };

        if (hide) {
          rowData["Ota/Ona nomeri"] = el?.parentPhone || "";
        } else {
          rowData["Guruh(lar)"] =
            el?.groups?.map((g) => g.name).join(", ") || "-";
        }

        if (payment) {
          rowData["To'lov holati"] = isPaid
            ? "To'lov qilgan"
            : "To'lov qilmagan";
          rowData["To'lov miqdori"] = paymentAmount
            ? `${Number(paymentAmount).toLocaleString()} so'm`
            : "-";
        }

        return rowData;
      });

      // Create workbook and worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(excelData);

      // Set column widths
      const colWidths = [
        { wch: 5 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 20 },
      ];

      if (payment) {
        colWidths.push({ wch: 15 }, { wch: 15 });
      }

      ws["!cols"] = colWidths;
      XLSX.utils.book_append_sheet(wb, ws, "O'quvchilar");

      const currentDate = new Date()
        .toLocaleDateString("uz-UZ")
        .replace(/\//g, "-");
      const filename = `oquvchilar_${currentDate}.xlsx`;

      // Android va mobil qurilmalar uchun maxsus usul
      if (isAndroid() || isMobileDevice()) {
        // Binary data olish
        const wbout = XLSX.write(wb, {
          bookType: "xlsx",
          type: "array",
          compression: true,
        });

        // Blob yaratish
        const blob = new Blob([wbout], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        // Web Share API dan foydalanish (Android 6.0+)
        if (navigator.share) {
          try {
            const file = new File([blob], filename, {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            await navigator.share({
              files: [file],
              title: "Excel fayl",
              text: "O'quvchilar ro'yxati",
            });

            toast.success("Excel fayl ulashildi");
            return;
          } catch (shareError) {
            console.log("Share API ishlamadi, download usuli ishlatilmoqda");
          }
        }

        // Fallback: Direct download
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.style.display = "none";

        // Force download
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Cleanup
        setTimeout(() => URL.revokeObjectURL(url), 100);

        toast.success("Excel fayl yuklab olindi");
      } else {
        // Desktop va iPhone uchun standart usul
        XLSX.writeFile(wb, filename);
        toast.success("Excel fayl muvaffaqiyatli yuklab olindi");
      }
    } catch (error) {
      console.error("Excel export error:", error);
      toast.error("Excel faylni yuklashda xatolik yuz berdi");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="table">
      {filterBtn && (
        <div className="table__select">
          <button>Jami: {filteredData?.length}</button>

          <select
            value={budget}
            onChange={(e) => {
              setBudget(e.target.value);
              setPage(1);
            }}
          >
            <option value="2">Barchasi</option>
            <option value="1">To'lov qilgan</option>
            <option value="-1">To'lov qilmagan</option>
          </select>

          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="0">Barcha guruhlar</option>
            {groupData?.groups?.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleExportToExcel}
            className="table__excel-btn"
            disabled={isExporting}
            style={{
              backgroundColor: isExporting ? "#6c757d" : "#28a745",
              color: "white",
              border: "none",
              padding: "12px 16px",
              borderRadius: "4px",
              cursor: isExporting ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
              fontWeight: "bold",
              transition: "background-color 0.2s",
              opacity: isExporting ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isExporting) {
                e.target.style.backgroundColor = "#218838";
              }
            }}
            onMouseLeave={(e) => {
              if (!isExporting) {
                e.target.style.backgroundColor = "#28a745";
              }
            }}
          >
            {isExporting ? (
              <>
                <CircularProgress size={16} color="inherit" />
                Yuklanmoqda...
              </>
            ) : (
              <>
                <PiMicrosoftExcelLogoFill size={18} />
                Excel yuklash
              </>
            )}
          </button>
        </div>
      )}

      <table className="table__row">
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th>№</th>
            <th>F.I.Sh</th>
            <th>Manzil</th>
            <th>Telefon nomer</th>
            {hide ? <th>Ota/Ona nomeri</th> : <th>Guruh(lar)</th>}
            {payment && <th>To'lov holati</th>}
            {payment && <th>To'lov miqdori</th>}
            <th>/</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData?.length > 0 ? (
            currentPageData.map((el, index) => {
              const isPaid = el?.payments?.some((p) => p.paid === true);
              const paymentAmount = el?.payments?.find((p) => p.paid === true)?.amount;

              return (
                <tr key={el?.id}>
                  <td data-cell="№">{startIndex + index + 1}</td>
                  <td data-cell="F.I.Sh">
                    {el?.firstName} {el?.lastName}
                  </td>
                  <td data-cell="Manzil">{el?.address}</td>
                  <td data-cell="Tel raqam">{el?.phone || "+998123531282"}</td>

                  {hide ? (
                    <td data-cell="Ota ona nomeri">{el?.parentPhone}</td>
                  ) : (
                    <td data-cell="Gruhi">
                      {el?.groups?.map((g) => g.name).join(", ") || "-"}
                    </td>
                  )}

                  {payment && (
                    <>
                      <td
                        style={{
                          color: isPaid ? "green" : "red",
                          fontWeight: "bold",
                        }}
                        data-cell="Holati"
                      >
                        {isPaid ? "To'lov qilgan" : "To'lov qilmagan"}
                      </td>
                      <td data-cell="Tolov ">
                        {paymentAmount
                          ? `${Number(paymentAmount).toLocaleString()} so'm`
                          : "-"}
                      </td>
                    </>
                  )}

                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleMenu(el?.id)}
                    data-cell="info"
                  >
                    <IoMdMore />
                  </td>

                  {activeStudentId === el?.id && (
                    <div className="table__hide" ref={menuRef}>
                      <button
                        onClick={() => handleDeleteClick(el?.id)}
                        className="table__btns-view"
                        disabled={isDeleting}
                      >
                        <AiOutlineDelete />
                        <span>delete</span>
                      </button>
                      <button
                        onClick={() => handleEdit(el)}
                        className="table__btns-view"
                        disabled={isDeleting}
                      >
                        <CiEdit />
                        <span>edit</span>
                      </button>
                      {hide ? (
                        <Link to={`/dashboard/students/${el?.id}`}>
                          <button
                            className="table__btns-view"
                            disabled={isDeleting}
                          >
                            <VscCodeReview />
                            <span>batafsil</span>
                          </button>
                        </Link>
                      ) : (
                        <Link to={`/dashboard/teacher/${el.id}`}>
                          <button
                            className="table__btns-view"
                            disabled={isDeleting}
                          >
                            <VscCodeReview />
                            batafsil
                          </button>
                        </Link>
                      )}
                    </div>
                  )}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={8} style={{ textAlign: "center", padding: "20px" }}>
                Ma'lumot topilmadi
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {deleteHide && (
        <DeleteModule
          close={() => {
            setDeleteHide(false);
            setDeleteId(null);
          }}
          width="250px"
          onConfirm={handleDeleteConfirm}
          isLoading={isDeleting}
        />
      )}

      {filteredData && (
        <div className="table__pagenation">
          <Stack spacing={2}>
            <Pagination
              count={totalPages || 1}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              size="large"
              showFirstButton
              showLastButton
            />
          </Stack>
        </div>
      )}

      {studentEdit && (
        <Module close={setStudentEdit} bg={"#aaa6"}>
          <form className="students__edit" onSubmit={handleEditSubmit}>
            <h3 className="students__edit-title">O'quvchini taxrirlash</h3>

            <label>
              Ism
              <input
                type="text"
                value={studentEdit.firstName}
                onChange={(e) =>
                  setStudentEdit((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                required
                disabled={isLoading}
              />
            </label>

            <label>
              Familiya
              <input
                type="text"
                value={studentEdit.lastName}
                onChange={(e) =>
                  setStudentEdit((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
                required
                disabled={isLoading}
              />
            </label>

            <label>
              Telefon raqam
              <PhoneInput
                country={"uz"}
                value={studentEdit.phone}
                onChange={(phone) =>
                  setStudentEdit((prev) => ({
                    ...prev,
                    phone: phone,
                  }))
                }
                disabled={isLoading}
                inputClass="phone-input"
              />
            </label>

            <label>
              Ota ona telefon raqami
              <PhoneInput
                country={"uz"}
                value={studentEdit.parentPhone}
                onChange={(phone) =>
                  setStudentEdit((prev) => ({
                    ...prev,
                    parentPhone: phone,
                  }))
                }
                disabled={isLoading}
                inputClass="phone-input"
              />
            </label>

            <Button
              className="students__edit-btn"
              type="submit"
              disabled={isLoading}
              variant="contained"
              startIcon={
                isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null
              }
            >
              {isLoading ? "O'zgartirilmoqda..." : "O'zgartirish"}
            </Button>
          </form>
        </Module>
      )}
    </div>
  );
};

export default Table;