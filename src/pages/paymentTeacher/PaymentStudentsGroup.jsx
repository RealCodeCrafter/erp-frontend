// // import React, { useState } from "react";
// // import { useParams } from "react-router-dom";
// // import {
// //   useGetPaymentsStudentTeacherQuery,
// //   useUpdatePaymetTeacherMutation,
// // } from "../../context/api/paymetApi";
// // import "./paymentTeacher.scss";

// // const PaymentStudentsGroup = () => {
// //   const { id: groupId } = useParams();
// //   const [studentName, setStudentName] = useState("");
// //   const [loadingRowId, setLoadingRowId] = useState(null); // faqat 1ta row uchun loading

// //   const [sendTeacherPay] = useUpdatePaymetTeacherMutation();

// //   const { data: dataStudent, isLoading } = useGetPaymentsStudentTeacherQuery({
// //     groupId,
// //     studentName,
// //   });

// //   if (isLoading) return <p>Yuklanmoqda...</p>;

// //   const handlePaymentSend = async (id) => {
// //     try {
// //       setLoadingRowId(id);
// //       await sendTeacherPay(id).unwrap();
// //     } catch (err) {
// //       console.error("Xatolik:", err);
// //     } finally {
// //       setLoadingRowId(null);
// //     }
// //   };

// //   return (
// //     <div className="payment-students-group">
// //       <h2>To‘lov qilmagan o‘quvchilar</h2>
// //       <input
// //         type="text"
// //         placeholder="O‘quvchi ismi"
// //         value={studentName}
// //         onChange={(e) => setStudentName(e.target.value)}
// //         style={{ padding: "6px 10px", marginBottom: "10px" }}
// //       />
// //       <table className="responsive-table">
// //         <thead>
// //           <tr>
// //             <th>#</th>
// //             <th>Ism Familiya</th>
// //             <th>Telefon</th>
// //             <th>Guruh</th>
// //             <th>Kurs</th>
// //             <th>Summa</th>
// //             <th>Oy</th>
// //             <th>Ustoz Status</th>
// //             <th>Tasdiqlash</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {dataStudent?.length > 0 ? (
// //             dataStudent?.map((item, index) => {
// //               // Button holatini aniqlash
// //               let buttonText = "Tasdiqlash";
// //               let buttonDisabled = false;
// //               let buttonClass = "";

// //               if (item.teacherStatus === null && item.adminStatus === null) {
// //                 buttonText = "To'lov qilmagan";
// //                 buttonDisabled = true;
// //                 buttonClass = "btn-danger"; // 🔴 qizil
// //               } else if (
// //                 item.teacherStatus === "accepted" &&
// //                 item.adminStatus === "accepted"
// //               ) {
// //                 buttonText = "To'lov qilgan";
// //                 buttonDisabled = true;
// //                 buttonClass = "btn-success"; // 🟢 yashil
// //               } else if (item.adminStatus === "accepted") {
// //                 buttonText =
// //                   loadingRowId === item.id ? "Tasdiqlanmoqda..." : "Kutilmoqda";
// //                 buttonDisabled = loadingRowId === item.id;
// //                 buttonClass = "btn-successes"; // 🟢 yashil
// //               }

// //               return (
// //                 <tr key={item.id}>
// //                   <td data-label="#">{index + 1}</td>
// //                   <td data-label="Ism Familiya">
// //                     {item?.student.firstName} {item?.student.lastName}
// //                   </td>
// //                   <td data-label="Telefon">{item?.student.phone}</td>
// //                   <td data-label="Guruh">{item?.group.name}</td>
// //                   <td data-label="Kurs">{item?.group?.course?.name}</td>
// //                   <td data-label="Summa">
// //                     {Number(item?.amount).toLocaleString()} so‘m
// //                   </td>
// //                   <td data-label="Oy">{item?.monthFor}</td>
// //                   <td data-label="Ustoz Status">
// //                     {item?.teacherStatus || "Kutilmoqda"}
// //                   </td>
// //                   <td data-label="Tasdiqlash">
// //                     <button
// //                       className={buttonClass}
// //                       disabled={buttonDisabled}
// //                       onClick={() => handlePaymentSend(item.id)}
// //                     >
// //                       {buttonText}
// //                     </button>
// //                   </td>
// //                 </tr>
// //               );
// //             })
// //           ) : (
// //             <tr>
// //               <td colSpan="9" style={{ textAlign: "center" }}>
// //                 Ma’lumot topilmadi
// //               </td>
// //             </tr>
// //           )}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default PaymentStudentsGroup;

// import React, { useState, useMemo } from "react";
// import { useParams } from "react-router-dom";
// import {
//   useGetPaymentsStudentTeacherQuery,
//   useUpdatePaymetTeacherMutation,
// } from "../../context/api/paymetApi";
// import "./paymentTeacher.scss";

// const PaymentStudentsGroup = () => {
//   const { id: groupId } = useParams();
//   const [studentName, setStudentName] = useState("");
//   const [paymentStatus, setPaymentStatus] = useState("");
//   const [loadingRowId, setLoadingRowId] = useState(null);

//   const [sendTeacherPay] = useUpdatePaymetTeacherMutation();

//   const { data: dataStudent, isLoading } = useGetPaymentsStudentTeacherQuery({
//     groupId,
//     studentName,
//   });

//   // Client-side filtering faqat to'lov statusiga qarab
//   const filteredData = useMemo(() => {
//     if (!dataStudent) return [];

//     return dataStudent.filter((item) => {
//       // Status filtering logic
//       let status = "";
//       if (item.teacherStatus === null && item.adminStatus === null) {
//         status = "tolov_qilmagan";
//       } else if (
//         item.teacherStatus === "accepted" &&
//         item.adminStatus === "accepted"
//       ) {
//         status = "tolov_qilgan";
//       } else if (item.adminStatus === "accepted") {
//         status = "kutilmoqda";
//       }

//       return paymentStatus === "" || status === paymentStatus;
//     });
//   }, [dataStudent, paymentStatus]);

//   const clearAllFilters = () => {
//     setStudentName("");
//     setPaymentStatus("");
//   };

//   if (isLoading) return <p>Yuklanmoqda...</p>;

//   const handlePaymentSend = async (id) => {
//     try {
//       setLoadingRowId(id);
//       await sendTeacherPay(id).unwrap();
//     } catch (err) {
//       console.error("Xatolik:", err);
//     } finally {
//       setLoadingRowId(null);
//     }
//   };

//   return (
//     <div className="payment-students-group">
//       <h2>To'lov qilmagan o'quvchilar</h2>

//       {/* Search and Filter Section */}
//       <div
//         className="search-filters-container"
//         style={{ marginBottom: "20px" }}
//       >
//         {/* Main Search */}
//         <div className="search-main">
//           <input
//             type="text"
//             placeholder="O'quvchi ismi bo'yicha qidirish..."
//             value={studentName}
//             onChange={(e) => setStudentName(e.target.value)}
//             style={{
//               padding: "8px 12px",
//               width: "90%",
//               border: "1px solid #ddd",
//               borderRadius: "4px",
//             }}
//           />

//           <select
//             value={paymentStatus}
//             onChange={(e) => setPaymentStatus(e.target.value)}
//             style={{
//               padding: "8px 12px",
//               border: "1px solid #ddd",
//               borderRadius: "4px",
//               minWidth: "200px",
//             }}
//           >
//             <option value="">Barcha statuslar</option>
//             <option value="tolov_qilmagan">To'lov qilmagan</option>
//             <option value="kutilmoqda">Kutilmoqda</option>
//             <option value="tolov_qilgan">To'lov qilgan</option>
//           </select>

//           <button
//             onClick={clearAllFilters}
//             style={{
//               padding: "9px 12px",
//               backgroundColor: "#6c757d",
//               color: "white",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//             }}
//           >
//             Tozalash
//           </button>
//         </div>

//         {/* Results Count */}
//         <div style={{ color: "#6c757d", fontSize: "14px" }}>
//           {filteredData.length} ta natija topildi
//         </div>
//       </div>

//       <table className="responsive-table">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Ism Familiya</th>
//             <th>Telefon</th>
//             <th>Guruh</th>
//             <th>Kurs</th>
//             <th>Summa</th>
//             <th>Oy</th>
//             <th>Ustoz Status</th>
//             <th>Tasdiqlash</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData?.length > 0 ? (
//             filteredData?.map((item, index) => {
//               // Button holatini aniqlash
//               let buttonText = "Tasdiqlash";
//               let buttonDisabled = false;
//               let buttonClass = "";

//               if (item.teacherStatus === null && item.adminStatus === null) {
//                 buttonText = "To'lov qilmagan";
//                 buttonDisabled = true;
//                 buttonClass = "btn-danger"; // 🔴 qizil
//               } else if (
//                 item.teacherStatus === "accepted" &&
//                 item.adminStatus === "accepted"
//               ) {
//                 buttonText = "To'lov qilgan";
//                 buttonDisabled = true;
//                 buttonClass = "btn-success"; // 🟢 yashil
//               } else if (item.adminStatus === "accepted") {
//                 buttonText =
//                   loadingRowId === item.id ? "Tasdiqlanmoqda..." : "Kutilmoqda";
//                 buttonDisabled = loadingRowId === item.id;
//                 buttonClass = "btn-successes"; // 🟢 yashil
//               }

//               return (
//                 <tr key={item.id}>
//                   <td data-label="#">{index + 1}</td>
//                   <td data-label="Ism Familiya">
//                     {item?.student.firstName} {item?.student.lastName}
//                   </td>
//                   <td data-label="Telefon">{item?.student.phone}</td>
//                   <td data-label="Guruh">{item?.group.name}</td>
//                   <td data-label="Kurs">{item?.group?.course?.name}</td>
//                   <td data-label="Summa">
//                     {Number(item?.amount).toLocaleString()} so'm
//                   </td>
//                   <td data-label="Oy">{item?.monthFor}</td>
//                   <td data-label="Ustoz Status">
//                     {item?.teacherStatus || "Kutilmoqda"}
//                   </td>
//                   <td data-label="Tasdiqlash">
//                     <button
//                       className={buttonClass}
//                       disabled={buttonDisabled}
//                       onClick={() => handlePaymentSend(item.id)}
//                     >
//                       {buttonText}
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })
//           ) : (
//             <tr>
//               <td colSpan="9" style={{ textAlign: "center" }}>
//                 {studentName || paymentStatus
//                   ? "Qidiruv natijasida hech narsa topilmadi"
//                   : "Ma'lumot topilmadi"}
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PaymentStudentsGroup;

import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  useGetPaymentsStudentTeacherQuery,
  useUpdatePaymetTeacherMutation,
} from "../../context/api/paymetApi";
import "./paymentTeacher.scss";

const PaymentStudentsGroup = () => {
  const { id: groupId } = useParams();
  const [searchTerm, setSearchTerm] = useState(""); // O'zgartirildi: studentName -> searchTerm
  const [paymentStatus, setPaymentStatus] = useState("");

  // Joriy oyni YYYY-MM formatda olish
  const getCurrentMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    return `${year}-${month}`;
  };

  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [loadingRowId, setLoadingRowId] = useState(null);

  const [sendTeacherPay] = useUpdatePaymetTeacherMutation();

  // API chaqiruvi
  const { data: dataStudent, isLoading } = useGetPaymentsStudentTeacherQuery({
    groupId,
  });

  console.log(dataStudent);

  // Oylarni inson o'qiy oladigan formatga o'zgartirish
  const formatMonthForDisplay = (monthString) => {
    if (!monthString) return monthString;
    const [year, month] = monthString.split("-");
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
    return `${monthNames[parseInt(month) - 1]}  ${year}`;
  };

  // Barcha mavjud oylarni olish
  const availableMonths = useMemo(() => {
    if (!dataStudent) return [];

    const months = [...new Set(dataStudent.map((item) => item.monthFor))];
    return months.sort();
  }, [dataStudent]);

  // Client-side filtering - ism, oy va status uchun
  const filteredData = useMemo(() => {
    if (!dataStudent) return [];

    return dataStudent.filter((item) => {
      // Name search - firstName va lastName bo'yicha qidirish
      const fullName =
        `${item.student.firstName} ${item.student.lastName}`.toLowerCase();
      const searchMatch =
        searchTerm === "" ||
        fullName.includes(searchTerm.toLowerCase()) ||
        item.student.firstName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.student.lastName.toLowerCase().includes(searchTerm.toLowerCase());

      // Month filtering
      const monthMatch =
        selectedMonth === "" || item.monthFor === selectedMonth;

      // Status filtering logic
      let status = "";
      if (item.teacherStatus === null && item.adminStatus === null) {
        status = "tolov_qilmagan";
      } else if (
        item.teacherStatus === "accepted" &&
        item.adminStatus === "accepted"
      ) {
        status = "tolov_qilgan";
      } else if (item.adminStatus === "accepted") {
        status = "kutilmoqda";
      }

      const statusMatch = paymentStatus === "" || status === paymentStatus;

      return searchMatch && monthMatch && statusMatch;
    });
  }, [dataStudent, searchTerm, paymentStatus, selectedMonth]);

  const clearAllFilters = () => {
    setSearchTerm(""); // O'zgartirildi
    setPaymentStatus("");
    setSelectedMonth(getCurrentMonth());
  };

  if (isLoading) return <p>Yuklanmoqda...</p>;

  const handlePaymentSend = async (id) => {
    try {
      setLoadingRowId(id);
      await sendTeacherPay(id).unwrap();
    } catch (err) {
      console.error("Xatolik:", err);
    } finally {
      setLoadingRowId(null);
    }
  };

  return (
    <div className="payment-students-group">
      <h2>Gruhdagi to'lovlar </h2>

      {/* Search and Filter Section */}
      <div
        className="search-filters-container"
        style={{ marginBottom: "20px" }}
      >
        {/* Main Search */}
        <div
          className="search-main"
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="O'quvchi ismi yoki familiyasi bo'yicha qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // O'zgartirildi
            style={{
              padding: "8px 12px",
              minWidth: "250px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={{
              padding: "8px 12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              minWidth: "150px",
            }}
          >
            <option value="">Barcha oylar</option>
            {availableMonths.map((month) => (
              <option key={month} value={month}>
                {formatMonthForDisplay(month)}
              </option>
            ))}
          </select>

          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            style={{
              padding: "8px 12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              minWidth: "200px",
            }}
          >
            <option value="">Barcha statuslar</option>
            <option value="tolov_qilmagan">To'lov qilmagan</option>
            <option value="kutilmoqda">Kutilmoqda</option>
            <option value="tolov_qilgan">To'lov qilgan</option>
          </select>

          <button
            onClick={clearAllFilters}
            style={{
              padding: "9px 12px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Tozalash
          </button>
        </div>

        {/* Results Count */}
        <div style={{ color: "#6c757d", fontSize: "14px", marginTop: "10px" }}>
          {filteredData.length} ta natija topildi
          {selectedMonth &&
            ` (${formatMonthForDisplay(selectedMonth)} oyi uchun)`}
        </div>
      </div>

      <table className="responsive-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Ism Familiya</th>
            <th>Telefon</th>
            <th>Guruh</th>
            <th>Kurs</th>
            <th>Summa</th>
            <th>Oy</th>
            <th>Ustoz Status</th>
            <th>Tasdiqlash</th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.length > 0 ? (
            filteredData?.map((item, index) => {
              // Button holatini aniqlash
              let buttonText = "Tasdiqlash";
              let buttonDisabled = false;
              let buttonClass = "";

              if (item.teacherStatus === null && item.adminStatus === null) {
                buttonText = "To'lov qilmagan";
                buttonDisabled = true;
                buttonClass = "btn-danger"; // 🔴 qizil
              } else if (
                item.teacherStatus === "accepted" &&
                item.adminStatus === "accepted"
              ) {
                buttonText = "To'lov qilgan";
                buttonDisabled = true;
                buttonClass = "btn-success"; // 🟢 yashil
              } else if (item.adminStatus === "accepted") {
                buttonText =
                  loadingRowId === item.id ? "Tasdiqlanmoqda..." : "Kutilmoqda";
                buttonDisabled = loadingRowId === item.id;
                buttonClass = "btn-successes"; // 🟢 yashil
              }

              return (
                <tr key={item.id || `${item.student.id}-${item.monthFor}`}>
                  <td data-label="#">{index + 1}</td>
                  <td data-label="Ism Familiya">
                    {item?.student.firstName} {item?.student.lastName}
                  </td>
                  <td data-label="Telefon">{item?.student.phone}</td>
                  <td data-label="Guruh">{item?.group.name}</td>
                  <td data-label="Kurs">{item?.group?.course?.name}</td>
                  <td data-label="Summa">
                    {item?.amount
                      ? `${Number(item.amount).toLocaleString()} so'm`
                      : `${Number(item?.group?.price).toLocaleString()} so'm`}
                  </td>
                  <td data-label="Oy">
                    {formatMonthForDisplay(item?.monthFor)}
                  </td>
                  <td data-label="Ustoz Status">
                    {item?.teacherStatus || "Kutilmoqda"}
                  </td>
                  <td data-label="Tasdiqlash">
                    <button
                      className={buttonClass}
                      disabled={buttonDisabled}
                      onClick={() => handlePaymentSend(item.id)}
                    >
                      {buttonText}
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: "center" }}>
                {searchTerm || paymentStatus || selectedMonth
                  ? "Qidiruv natijasida hech narsa topilmadi"
                  : "Ma'lumot topilmadi"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentStudentsGroup;
