// import React, { useMemo, useState } from "react";
// import Select from "react-select";
// import {
//   CreditCard,
//   User,
//   Calendar,
//   DollarSign,
//   Receipt,
//   Save,
//   Plus,
//   AlertCircle,
//   Search,
//   CheckCircle,
//   X,
//   Users,
// } from "lucide-react";
// import "./paymentModule.scss";
// import {
//   useGetStudentByIdQuery,
//   useGetStudentQuery,
// } from "../../context/api/studentApi";
// import {
//   useCreatePaymetMutation,
//   useGetPaymetsQuery,
// } from "../../context/api/paymetApi";
// import { formatNumber } from "../../static";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";

// const PaymentModule = () => {
//   const [amount, setAmount] = useState("");
//   const [selectedStudentId, setSelectedStudentId] = useState(null);
//   const [page, setPage] = useState(1);

//   const {
//     data: students = [],
//     isFetching,
//     isError,
//     refetch,
//   } = useGetStudentQuery();

//   const { data: studentData } = useGetStudentByIdQuery(selectedStudentId, {
//     skip: !selectedStudentId,
//   });

//   const [createPayment, { isLoading: isCreating }] = useCreatePaymetMutation();

//   const { data: paymentData } = useGetPaymetsQuery();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [selectedGroup, setSelectedGroup] = useState("");
//   const [showForm, setShowForm] = useState(false);

//   const [formData, setFormData] = useState({
//     studentId: "",
//     groupId: "",
//     courseId: "",
//     amount: "",
//     monthFor: "",
//   });

//   const ITEMS_PER_PAGE = 10;

//   const filteredPayments = useMemo(() => {
//     if (!paymentData || paymentData.length === 0) return [];

//     let filtered = paymentData;

//     if (selectedMonth) {
//       filtered = filtered.filter(
//         (payment) => payment?.monthFor === selectedMonth
//       );
//     }

//     if (selectedGroup) {
//       filtered = filtered.filter(
//         (payment) => payment?.group?.id?.toString() === selectedGroup
//       );
//     }

//     if (searchTerm.trim()) {
//       const term = searchTerm.trim().toLowerCase();

//       filtered = filtered.filter((payment) => {
//         const studentFirstName =
//           payment?.student?.firstName?.toLowerCase() || "";
//         const studentLastName = payment?.student?.lastName?.toLowerCase() || "";
//         const fullName = `${studentFirstName} ${studentLastName}`.toLowerCase();

//         const groupName = payment?.group?.name?.toLowerCase() || "";
//         const courseName = payment?.course?.name?.toLowerCase() || "";
//         const amount = payment?.amount?.toString() || "";

//         return (
//           fullName.includes(term) ||
//           studentFirstName.includes(term) ||
//           studentLastName.includes(term) ||
//           groupName.includes(term) ||
//           courseName.includes(term) ||
//           amount.includes(term)
//         );
//       });
//     }

//     return filtered;
//   }, [paymentData, searchTerm, selectedMonth, selectedGroup]);

//   const totalPages = Math.ceil(
//     (filteredPayments?.length || 0) / ITEMS_PER_PAGE
//   );
//   const startIndex = (page - 1) * ITEMS_PER_PAGE;
//   const endIndex = startIndex + ITEMS_PER_PAGE;
//   const currentPagePayments =
//     filteredPayments?.slice(startIndex, endIndex) || [];

//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };

//   React.useEffect(() => {
//     if (page > totalPages && totalPages > 0) {
//       setPage(1);
//     }
//   }, [filteredPayments?.length, page, totalPages]);

//   const totalAmount = useMemo(() => {
//     if (!filteredPayments || filteredPayments.length === 0) return 0;

//     return filteredPayments.reduce(
//       (sum, p) => sum + (Number(p.amount) || 0),
//       0
//     );
//   }, [filteredPayments]);

//   const availableMonths = useMemo(() => {
//     if (!paymentData || paymentData.length === 0) return [];

//     const months = [
//       ...new Set(paymentData.map((p) => p.monthFor).filter(Boolean)),
//     ];
//     return months.sort().reverse();
//   }, [paymentData]);

//   const availableGroups = useMemo(() => {
//     if (!paymentData || paymentData.length === 0) return [];

//     const groups = paymentData
//       .map((p) => p.group)
//       .filter((group) => group && group.id && group.name)
//       .reduce((unique, group) => {
//         if (!unique.some((g) => g.id === group.id)) {
//           unique.push(group);
//         }
//         return unique;
//       }, [])
//       .sort((a, b) => a.name.localeCompare(b.name));

//     return groups;
//   }, [paymentData]);

//   const formatCurrency = (amount) =>
//     new Intl.NumberFormat("uz-UZ").format(Number(amount) || 0) + " so'm";

//   const currentGroups = studentData?.groups || [];

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "amount") {
//       let rawValue = value.replace(/\s/g, "");
//       if (!/^\d*$/.test(rawValue)) return;

//       setAmount(formatNumber(rawValue));
//       setFormData((prev) => ({ ...prev, amount: rawValue }));
//       return;
//     }

//     if (name === "studentId") {
//       setSelectedStudentId(value);
//       setFormData({
//         studentId: value,
//         groupId: "",
//         courseId: "",
//         amount: "",
//         monthFor: "",
//       });
//       setAmount("");
//       return;
//     }

//     if (name === "groupId") {
//       const grp = currentGroups.find((g) => String(g.id) === String(value));
//       setFormData((prev) => ({
//         ...prev,
//         groupId: value,
//         courseId: grp?.course?.id ?? "",
//       }));
//       return;
//     }

//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const clearAllFilters = () => {
//     setSearchTerm("");
//     setSelectedMonth("");
//     setSelectedGroup("");
//     setPage(1);
//   };

//   const formatMonthForDisplay = (monthValue) => {
//     if (!monthValue) return "";
//     const [year, month] = monthValue.split("-");
//     const monthNames = [
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
//     return `${monthNames[parseInt(month) - 1]} ${year}`;
//   };

//   const handleSubmit = async () => {
//     const { studentId, groupId, courseId, amount, monthFor } = formData;

//     if (!studentId || !groupId || !courseId || !amount || !monthFor) {
//       alert("Barcha maydonlar majburiy!");
//       return;
//     }

//     const payload = {
//       studentId: Number(studentId),
//       groupId: Number(groupId),
//       courseId: Number(courseId),
//       amount: Number(amount),
//       monthFor,
//     };

//     try {
//       await createPayment(payload).unwrap();
//       setFormData({
//         studentId: "",
//         groupId: "",
//         courseId: "",
//         amount: "",
//         monthFor: "",
//       });
//       setSelectedStudentId(null);
//       setShowForm(false);
//       setAmount("");
//       refetch();
//       setPage(1);
//     } catch (err) {
//       console.error(err);
//       alert("To'lov yaratishda xatolik yuz berdi.");
//     }
//   };

//   return (
//     <div className="payment-module">
//       <div className="payment-module__header">
//         <div className="header__info">
//           <div className="header__icon">
//             <CreditCard size={32} />
//           </div>
//           <div>
//             <h1 className="header__title">To'lovlar Boshqaruvi</h1>
//             <p className="header__subtitle">Offline to'lovlarni boshqaring</p>
//           </div>
//         </div>
//         <div className="header__actions">
//           <div className="total-amount">
//             <div className="label">Umumiy summa</div>
//             <div className="value">{formatCurrency(totalAmount)}</div>
//           </div>
//           <button
//             className="btn btn-primary"
//             onClick={() => {
//               setShowForm(true);
//               setFormData({
//                 studentId: "",
//                 groupId: "",
//                 courseId: "",
//                 amount: "",
//                 monthFor: "",
//               });
//               setSelectedStudentId(null);
//               setAmount("");
//             }}
//           >
//             <Plus size={18} /> Yangi To'lov
//           </button>
//         </div>
//       </div>

//       <div className="payment-module__search">
//         <div className="search-container">
//           <Search className="search-icon" size={18} />
//           <input
//             type="text"
//             placeholder="Talaba ismi, guruh, kurs yoki summa bo'yicha qidirish..."
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setPage(1);
//             }}
//             className="search-input"
//           />
//         </div>

//         <div className="month-filter-container">
//           <Calendar className="filter-icon" size={18} />
//           <select
//             value={selectedMonth}
//             onChange={(e) => {
//               setSelectedMonth(e.target.value);
//               setPage(1);
//             }}
//             className="month-filter-select"
//           >
//             <option value="">Barcha oylar</option>
//             {availableMonths.map((month) => (
//               <option key={month} value={month}>
//                 {formatMonthForDisplay(month)}
//               </option>
//             ))}
//           </select>
//           {selectedMonth && (
//             <button
//               onClick={() => {
//                 setSelectedMonth("");
//                 setPage(1);
//               }}
//               className="clear-filter-btn"
//               title="Oy filtrini tozalash"
//             >
//               <X size={16} />
//             </button>
//           )}
//         </div>

//         <div className="group-filter-container">
//           <Users className="filter-icon" size={18} />
//           <select
//             value={selectedGroup}
//             onChange={(e) => {
//               setSelectedGroup(e.target.value);
//               setPage(1);
//             }}
//             className="group-filter-select"
//           >
//             <option value="">Barcha guruhlar</option>
//             {availableGroups.map((group) => (
//               <option key={group.id} value={group.id.toString()}>
//                 {group.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className="payment-module__content">
//         {showForm && (
//           <div className="payment-form">
//             <div className="payment-form__header">
//               <Receipt size={20} />
//               <h2>Yangi To'lov Qo'shish</h2>
//             </div>

//             <div className="payment-form__body">
//               <label>
//                 <User size={16} /> Talaba *
//                 <Select
//                   options={students?.map((s) => ({
//                     value: s.id,
//                     label: `${s.firstName} ${s.lastName}`,
//                   }))}
//                   value={
//                     formData.studentId
//                       ? {
//                           value: formData.studentId,
//                           label: `${
//                             students?.students?.find(
//                               (s) => s.id === Number(formData.studentId)
//                             )?.firstName || ""
//                           } ${
//                             students?.students?.find(
//                               (s) => s.id === Number(formData.studentId)
//                             )?.lastName || ""
//                           }`,
//                         }
//                       : null
//                   }
//                   onChange={(selected) =>
//                     handleChange({
//                       target: { name: "studentId", value: selected?.value },
//                     })
//                   }
//                   placeholder="Talabani tanlang"
//                   isSearchable
//                 />
//               </label>

//               <label>
//                 <Calendar size={16} /> Guruh *
//                 <Select
//                   options={currentGroups.map((g) => ({
//                     value: g.id,
//                     label: g.course?.name
//                       ? `${g.name} — ${g.course.name}`
//                       : g.name,
//                   }))}
//                   value={
//                     formData.groupId
//                       ? {
//                           value: formData.groupId,
//                           label:
//                             currentGroups.find(
//                               (g) => String(g.id) === String(formData.groupId)
//                             )?.name || "",
//                         }
//                       : null
//                   }
//                   onChange={(selected) =>
//                     handleChange({
//                       target: { name: "groupId", value: selected?.value },
//                     })
//                   }
//                   placeholder={
//                     studentData ? "Guruhni tanlang" : "Avval talabani tanlang"
//                   }
//                   isDisabled={!studentData}
//                   isSearchable
//                 />
//               </label>

//               {/* Kurs */}
//               <label>
//                 <CheckCircle size={16} /> Kurs (avto)
//                 <input
//                   type="text"
//                   value={
//                     currentGroups.find(
//                       (g) => String(g.id) === String(formData.groupId)
//                     )?.course?.name || ""
//                   }
//                   readOnly
//                   placeholder="Guruh tanlang"
//                 />
//               </label>

//               <label>
//                 <Calendar size={16} /> Oy uchun *
//                 <input
//                   type="month"
//                   name="monthFor"
//                   value={formData.monthFor}
//                   onChange={handleChange}
//                 />
//               </label>

//               <label>
//                 <DollarSign size={16} /> Summa (so'm) *
//                 <input
//                   type="text"
//                   name="amount"
//                   value={amount}
//                   onChange={handleChange}
//                   placeholder="0"
//                 />
//               </label>

//               <div className="form-actions">
//                 <button
//                   className="btn btn-primary"
//                   onClick={handleSubmit}
//                   disabled={isCreating}
//                 >
//                   <Save size={18} />{" "}
//                   {isCreating ? "Yaratilmoqda..." : "Saqlash"}
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => {
//                     setShowForm(false);
//                     setAmount("");
//                   }}
//                   disabled={isCreating}
//                 >
//                   Bekor qilish
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Payments table */}
//         <div className={`payment-list ${showForm ? "with-form" : ""}`}>
//           <div className="payment-list__header">
//             <h2>To'lovlar Ro'yxati</h2>
//             {isFetching ? (
//               <p>Yuklanmoqda...</p>
//             ) : isError ? (
//               <p className="error">Ma'lumotlarni olishda xatolik.</p>
//             ) : searchTerm || selectedMonth || selectedGroup ? (
//               <p>{filteredPayments.length} ta to'lov topildi</p>
//             ) : (
//               <p>{paymentData?.length || 0} ta to'lov</p>
//             )}
//           </div>

//           <table>
//             <thead>
//               <tr>
//                 <th>№</th>
//                 <th>Talaba</th>
//                 <th>Guruh</th>
//                 <th>Kurs</th>
//                 <th>Summa</th>
//                 <th>Oy</th>
//                 <th>Holat</th>
//                 <th>Sana</th>
//               </tr>
//             </thead>
//             <tbody>
//               {isFetching ? (
//                 <tr>
//                   <td colSpan="8" className="no-data">
//                     Yuklanmoqda...
//                   </td>
//                 </tr>
//               ) : currentPagePayments?.length > 0 ? (
//                 currentPagePayments.map((p, index) => (
//                   <tr key={p.id}>
//                     <td>{startIndex + index + 1}</td>
//                     <td>
//                       {p?.student?.firstName} {p?.student?.lastName}
//                     </td>
//                     <td>{p?.group?.name || "-"}</td>
//                     <td>{p?.course?.name || "-"}</td>
//                     <td>{formatNumber(p.amount)} so'm</td>
//                     <td>{p.monthFor || "-"}</td>
//                     <td>
//                       {p.paid ? (
//                         <span className="badge badge-success">To'langan</span>
//                       ) : (
//                         <span className="badge badge-warning">Kutilmoqda</span>
//                       )}
//                     </td>
//                     <td>
//                       {p.createdAt
//                         ? new Date(p.createdAt).toLocaleString("uz-UZ")
//                         : "-"}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="8" className="no-data">
//                     <div className="no-data__content">
//                       <AlertCircle size={40} />
//                       <span>Hech qanday to'lov topilmadi</span>
//                       {(searchTerm || selectedMonth || selectedGroup) && (
//                         <button
//                           onClick={clearAllFilters}
//                           className="clear-search-button"
//                         >
//                           Filtrlarni tozalash
//                         </button>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>

//           {/* Pagination - faqat ma'lumotlar mavjud bo'lsa ko'rsatish */}
//           {filteredPayments && filteredPayments.length > ITEMS_PER_PAGE && (
//             <div className="payment-pagination">
//               <Stack spacing={2}>
//                 <Pagination
//                   count={totalPages}
//                   page={page}
//                   onChange={handlePageChange}
//                   variant="outlined"
//                   shape="rounded"
//                   size="large"
//                   showFirstButton
//                   showLastButton
//                 />
//               </Stack>
//               {/* Sahifa ma'lumotlarini ko'rsatish */}
//               <div
//                 style={{
//                   textAlign: "center",
//                   marginTop: "10px",
//                   color: "#666",
//                   fontSize: "14px",
//                 }}
//               ></div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentModule;

import React, { useMemo, useState, useEffect } from "react";
import Select from "react-select";
import {
  CreditCard,
  User,
  Calendar,
  DollarSign,
  Receipt,
  Save,
  Plus,
  AlertCircle,
  Search,
  CheckCircle,
  X,
  Users,
  Menu,
  ChevronLeft,
} from "lucide-react";
import "./paymentModule.scss";
import {
  useGetStudentByIdQuery,
  useGetStudentQuery,
} from "../../context/api/studentApi";
import {
  useCreatePaymetMutation,
  useGetPaymetsQuery,
} from "../../context/api/paymetApi";
import { formatNumber } from "../../static";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaymentModule = () => {
  const [amount, setAmount] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [page, setPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const {
    data: students = [],
    isFetching,
    isError,
    refetch,
  } = useGetStudentQuery();

  const { data: studentData } = useGetStudentByIdQuery(selectedStudentId, {
    skip: !selectedStudentId,
  });

  const [createPayment, { isLoading: isCreating }] = useCreatePaymetMutation();

  const { data: paymentData } = useGetPaymetsQuery();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [formData, setFormData] = useState({
    studentId: "",
    groupId: "",
    courseId: "",
    amount: "",
    monthFor: "",
  });

  const ITEMS_PER_PAGE = isMobile ? 5 : 10; // Mobile da kamroq element

  const filteredPayments = useMemo(() => {
    if (!paymentData || paymentData.length === 0) return [];

    let filtered = paymentData;

    if (selectedMonth) {
      filtered = filtered.filter(
        (payment) => payment?.monthFor === selectedMonth
      );
    }

    if (selectedGroup) {
      filtered = filtered.filter(
        (payment) => payment?.group?.id?.toString() === selectedGroup
      );
    }

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();

      filtered = filtered.filter((payment) => {
        const studentFirstName =
          payment?.student?.firstName?.toLowerCase() || "";
        const studentLastName = payment?.student?.lastName?.toLowerCase() || "";
        const fullName = `${studentFirstName} ${studentLastName}`.toLowerCase();

        const groupName = payment?.group?.name?.toLowerCase() || "";
        const courseName = payment?.course?.name?.toLowerCase() || "";
        const amount = payment?.amount?.toString() || "";

        return (
          fullName.includes(term) ||
          studentFirstName.includes(term) ||
          studentLastName.includes(term) ||
          groupName.includes(term) ||
          courseName.includes(term) ||
          amount.includes(term)
        );
      });
    }

    return filtered;
  }, [paymentData, searchTerm, selectedMonth, selectedGroup]);

  const totalPages = Math.ceil(
    (filteredPayments?.length || 0) / ITEMS_PER_PAGE
  );
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPagePayments =
    filteredPayments?.slice(startIndex, endIndex) || [];

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  React.useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(1);
    }
  }, [filteredPayments?.length, page, totalPages]);

  const totalAmount = useMemo(() => {
    if (!filteredPayments || filteredPayments.length === 0) return 0;

    return filteredPayments.reduce(
      (sum, p) => sum + (Number(p.amount) || 0),
      0
    );
  }, [filteredPayments]);

  const availableMonths = useMemo(() => {
    if (!paymentData || paymentData.length === 0) return [];

    const months = [
      ...new Set(paymentData.map((p) => p.monthFor).filter(Boolean)),
    ];
    return months.sort().reverse();
  }, [paymentData]);

  const availableGroups = useMemo(() => {
    if (!paymentData || paymentData.length === 0) return [];

    const groups = paymentData
      .map((p) => p.group)
      .filter((group) => group && group.id && group.name)
      .reduce((unique, group) => {
        if (!unique.some((g) => g.id === group.id)) {
          unique.push(group);
        }
        return unique;
      }, [])
      .sort((a, b) => a.name.localeCompare(b.name));

    return groups;
  }, [paymentData]);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("uz-UZ").format(Number(amount) || 0) + " so'm";

  const currentGroups = studentData?.groups || [];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount") {
      let rawValue = value.replace(/\s/g, "");
      if (!/^\d*$/.test(rawValue)) return;

      setAmount(formatNumber(rawValue));
      setFormData((prev) => ({ ...prev, amount: rawValue }));
      return;
    }

    if (name === "studentId") {
      setSelectedStudentId(value);
      setFormData({
        studentId: value,
        groupId: "",
        courseId: "",
        amount: "",
        monthFor: "",
      });
      setAmount("");
      return;
    }

    if (name === "groupId") {
      const grp = currentGroups.find((g) => String(g.id) === String(value));
      setFormData((prev) => ({
        ...prev,
        groupId: value,
        courseId: grp?.course?.id ?? "",
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedMonth("");
    setSelectedGroup("");
    setPage(1);
    if (isMobile) {
      setShowFilters(false);
    }
  };

  const formatMonthForDisplay = (monthValue) => {
    if (!monthValue) return "";
    const [year, month] = monthValue.split("-");
    const monthNames = [
      "Yanvar",
      "Fevral",
      "Mart",
      "Aprel",
      "May",
      "Iyun",
      "Iyul",
      "Avgust",
      "Sentabr",
      "Oktabr",
      "Noyabr",
      "Dekabr",
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const handleSubmit = async () => {
    const { studentId, groupId, courseId, amount, monthFor } = formData;

    if (!studentId || !groupId || !courseId || !amount || !monthFor) {
      alert("Barcha maydonlar majburiy!");
      return;
    }

    const payload = {
      studentId: Number(studentId),
      groupId: Number(groupId),
      courseId: Number(courseId),
      amount: Number(amount),
      monthFor,
    };

    try {
      await createPayment(payload).unwrap();
      setFormData({
        studentId: "",
        groupId: "",
        courseId: "",
        amount: "",
        monthFor: "",
      });
      setSelectedStudentId(null);
      setShowForm(false);
      setAmount("");
      refetch();
      setPage(1);
    } catch (err) {
      console.error(err);
      alert("To'lov yaratishda xatolik yuz berdi.");
    }
  };

  // Mobile table renderer
  const MobilePaymentCard = ({ payment, index }) => (
    <div className="mobile-payment-card" key={payment.id}>
      <div className="mobile-card-header">
        <span className="mobile-card-number">#{startIndex + index + 1}</span>
        <span
          className={`mobile-badge ${payment.paid ? "success" : "warning"}`}
        >
          {payment.paid ? "To'langan" : "Kutilmoqda"}
        </span>
      </div>
      <div className="mobile-card-body">
        <div className="mobile-card-row">
          <span className="mobile-card-label">Talaba:</span>
          <span className="mobile-card-value">
            {payment?.student?.firstName} {payment?.student?.lastName}
          </span>
        </div>
        <div className="mobile-card-row">
          <span className="mobile-card-label">Guruh:</span>
          <span className="mobile-card-value">
            {payment?.group?.name || "-"}
          </span>
        </div>
        <div className="mobile-card-row">
          <span className="mobile-card-label">Kurs:</span>
          <span className="mobile-card-value">
            {payment?.course?.name || "-"}
          </span>
        </div>
        <div className="mobile-card-row">
          <span className="mobile-card-label">Summa:</span>
          <span className="mobile-card-value mobile-amount">
            {formatNumber(payment.amount)} so'm
          </span>
        </div>
        <div className="mobile-card-row">
          <span className="mobile-card-label">Oy:</span>
          <span className="mobile-card-value">{payment.monthFor || "-"}</span>
        </div>
        <div className="mobile-card-row">
          <span className="mobile-card-label">Sana:</span>
          <span className="mobile-card-value">
            {payment.createdAt
              ? new Date(payment.createdAt).toLocaleDateString("uz-UZ")
              : "-"}
          </span>
        </div>
      </div>
    </div>
  );

  // Custom Select styles for mobile
  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: isMobile ? "32px" : "40px",
      fontSize: isMobile ? "14px" : "16px",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  return (
    <div className="payment-module">
      <div className="payment-module__header">
        <div className="header__info">
          <div className="header__icon">
            <CreditCard size={isMobile ? 24 : 32} />
          </div>
          <div>
            <h1 className="header__title">To'lovlar Boshqaruvi</h1>
            <p className="header__subtitle">Offline to'lovlarni boshqaring</p>
          </div>
        </div>
        <div className="header__actions">
          <div className="total-amount">
            <div className="label">Umumiy summa</div>
            <div className="value">{formatCurrency(totalAmount)}</div>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              setShowForm(true);
              setFormData({
                studentId: "",
                groupId: "",
                courseId: "",
                amount: "",
                monthFor: "",
              });
              setSelectedStudentId(null);
              setAmount("");
            }}
          >
            <Plus size={isMobile ? 16 : 18} />
            {isMobile ? "Yangi" : "Yangi To'lov"}
          </button>
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      {isMobile && (
        <div className="mobile-filter-toggle">
          <button
            className="btn btn-secondary"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Menu size={16} />
            {showFilters ? "Filtrlarni yashirish" : "Filtrlar"}
          </button>
          {(searchTerm || selectedMonth || selectedGroup) && (
            <button className="btn btn-secondary" onClick={clearAllFilters}>
              <X size={16} />
              Tozalash
            </button>
          )}
        </div>
      )}

      <div
        className={`payment-module__search ${
          isMobile && !showFilters ? "hidden" : ""
        }`}
      >
        <div className="search-container">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder={
              isMobile
                ? "Qidirish..."
                : "Talaba ismi, guruh, kurs yoki summa bo'yicha qidirish..."
            }
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="search-input"
          />
        </div>

        <div className="month-filter-container">
          <Calendar className="filter-icon" size={18} />
          <select
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(e.target.value);
              setPage(1);
            }}
            className="month-filter-select"
          >
            <option value="">Barcha oylar</option>
            {availableMonths.map((month) => (
              <option key={month} value={month}>
                {formatMonthForDisplay(month)}
              </option>
            ))}
          </select>
          {selectedMonth && (
            <button
              onClick={() => {
                setSelectedMonth("");
                setPage(1);
              }}
              className="clear-filter-btn"
              title="Oy filtrini tozalash"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="group-filter-container">
          <Users className="filter-icon" size={18} />
          <select
            value={selectedGroup}
            onChange={(e) => {
              setSelectedGroup(e.target.value);
              setPage(1);
            }}
            className="group-filter-select"
          >
            <option value="">Barcha guruhlar</option>
            {availableGroups.map((group) => (
              <option key={group.id} value={group.id.toString()}>
                {group.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="payment-module__content">
        {showForm && (
          <div className="payment-form">
            <div className="payment-form__header">
              {isMobile && (
                <button
                  className="mobile-back-btn"
                  onClick={() => setShowForm(false)}
                >
                  <ChevronLeft size={20} />
                </button>
              )}
              <Receipt size={20} />
              <h2>Yangi To'lov Qo'shish</h2>
            </div>

            <div className="payment-form__body">
              <label>
                <User size={16} /> Talaba *
                <Select
                  styles={customSelectStyles}
                  options={students?.map((s) => ({
                    value: s.id,
                    label: `${s.firstName} ${s.lastName}`,
                  }))}
                  value={
                    formData.studentId
                      ? students.find((s) => s.id === Number(formData.studentId))
                        ? {
                          value: formData.studentId,
                          label: `${students.find((s) => s.id === Number(formData.studentId))
                              .firstName
                            } ${students.find((s) => s.id === Number(formData.studentId))
                              .lastName
                            }`,
                        }
                        : null
                      : null
                  }
                  onChange={(selected) =>
                    handleChange({
                      target: { name: "studentId", value: selected?.value },
                    })
                  }
                  placeholder="Talabani tanlang"
                  isSearchable
                />
              </label>


              <label>
                <Calendar size={16} /> Guruh *
                <Select
                  styles={customSelectStyles}
                  options={currentGroups.map((g) => ({
                    value: g.id,
                    label: g.course?.name
                      ? `${g.name} — ${g.course.name}`
                      : g.name,
                  }))}
                  value={
                    formData.groupId
                      ? {
                        value: formData.groupId,
                        label:
                          currentGroups.find(
                            (g) => String(g.id) === String(formData.groupId)
                          )?.name || "",
                      }
                      : null
                  }
                  onChange={(selected) =>
                    handleChange({
                      target: { name: "groupId", value: selected?.value },
                    })
                  }
                  placeholder={
                    studentData ? "Guruhni tanlang" : "Avval talabani tanlang"
                  }
                  isDisabled={!studentData}
                  isSearchable
                />
              </label>

              <label>
                <CheckCircle size={16} /> Kurs (avto)
                <input
                  type="text"
                  value={
                    currentGroups.find(
                      (g) => String(g.id) === String(formData.groupId)
                    )?.course?.name || ""
                  }
                  readOnly
                  placeholder="Guruh tanlang"
                />
              </label>

              <label>
                <Calendar size={16} /> Oy uchun *
                <input
                  type="month"
                  name="monthFor"
                  value={formData.monthFor}
                  onChange={handleChange}
                />
              </label>

              <label>
                <DollarSign size={16} /> Summa (so'm) *
                <input
                  type="text"
                  name="amount"
                  value={amount}
                  onChange={handleChange}
                  placeholder="0"
                />
              </label>

              <div className="form-actions">
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={isCreating}
                >
                  <Save size={18} />
                  {isCreating ? "Yaratilmoqda..." : "Saqlash"}
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowForm(false);
                    setAmount("");
                  }}
                  disabled={isCreating}
                >
                  Bekor qilish
                </button>
              </div>
            </div>
          </div>
        )}

        <div className={`payment-list ${showForm ? "with-form" : ""}`}>
          <div className="payment-list__header">
            <h2>To'lovlar Ro'yxati</h2>
            {isFetching ? (
              <p>Yuklanmoqda...</p>
            ) : isError ? (
              <p className="error">Ma'lumotlarni olishda xatolik.</p>
            ) : searchTerm || selectedMonth || selectedGroup ? (
              <p>{filteredPayments.length} ta to'lov topildi</p>
            ) : (
              <p>{paymentData?.length || 0} ta to'lov</p>
            )}
          </div>

          {isMobile ? (
            // Mobile card view
            <div className="mobile-payment-list">
              {isFetching ? (
                <div className="no-data">Yuklanmoqda...</div>
              ) : currentPagePayments?.length > 0 ? (
                currentPagePayments.map((payment, index) => (
                  <MobilePaymentCard
                    key={payment.id}
                    payment={payment}
                    index={index}
                  />
                ))
              ) : (
                <div className="no-data">
                  <div className="no-data__content">
                    <AlertCircle size={40} />
                    <span>Hech qanday to'lov topilmadi</span>
                    {(searchTerm || selectedMonth || selectedGroup) && (
                      <button
                        onClick={clearAllFilters}
                        className="clear-search-button"
                      >
                        Filtrlarni tozalash
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Desktop table view
            <table>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Talaba</th>
                  <th>Guruh</th>
                  <th>Kurs</th>
                  <th>Summa</th>
                  <th>Oy</th>
                  <th>Holat</th>
                  <th>Sana</th>
                </tr>
              </thead>
              <tbody>
                {isFetching ? (
                  <tr>
                    <td colSpan="8" className="no-data">
                      Yuklanmoqda...
                    </td>
                  </tr>
                ) : currentPagePayments?.length > 0 ? (
                  currentPagePayments.map((p, index) => (
                    <tr key={p.id}>
                      <td>{startIndex + index + 1}</td>
                      <td>
                        {p?.student?.firstName} {p?.student?.lastName}
                      </td>
                      <td>{p?.group?.name || "-"}</td>
                      <td>{p?.course?.name || "-"}</td>
                      <td>{formatNumber(p.amount)} so'm</td>
                      <td>{p.monthFor || "-"}</td>
                      <td>
                        {p.paid ? (
                          <span className="badge badge-success">To'langan</span>
                        ) : (
                          <span className="badge badge-warning">
                            Kutilmoqda
                          </span>
                        )}
                      </td>
                      <td>
                        {p.createdAt
                          ? new Date(p.createdAt).toLocaleString("uz-UZ")
                          : "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-data">
                      <div className="no-data__content">
                        <AlertCircle size={40} />
                        <span>Hech qanday to'lov topilmadi</span>
                        {(searchTerm || selectedMonth || selectedGroup) && (
                          <button
                            onClick={clearAllFilters}
                            className="clear-search-button"
                          >
                            Filtrlarni tozalash
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          {filteredPayments && filteredPayments.length > ITEMS_PER_PAGE && (
            <div className="payment-pagination">
              <Stack spacing={2}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  variant="outlined"
                  shape="rounded"
                  size={isMobile ? "medium" : "large"}
                  showFirstButton={!isMobile}
                  showLastButton={!isMobile}
                />
              </Stack>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModule;
