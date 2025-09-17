import React, { useState } from "react";
import "./attendanceMissing.scss";
import { useGetAttendancesDailyStatisticsQuery } from "../../context/api/attendanceApi";

const AttendanceMissing = () => {
  // Bugungi sanani YYYY-MM-DD formatda olish
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);

  // Backenddan malumot olish
  const { data: LessonData = [], isLoading } =
    useGetAttendancesDailyStatisticsQuery({
      date,
    });

  return (
    <div className="attendance-missing">
      <h2>Yo‘qlama qilinmagan guruhlar</h2>

      {/* Filter select */}
      <div className="filter-box">
        <label htmlFor="date">Sana bo‘yicha filter:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="loading">Yuklanmoqda...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Guruh nomi</th>
              <th>Sana</th>
              <th>Darslik</th>
              <th>O‘qituvchi</th>
              <th>Telefon</th>
              <th>Sabab</th>
            </tr>
          </thead>
          <tbody>
            {LessonData?.length > 0 ? (
              LessonData?.map((item, index) => (
                <tr key={index}>
                  <td data-label="#"> {index + 1}</td>
                  <td data-label="Guruh nomi">{item?.groupName}</td>
                  <td data-label="Sana">{item?.date}</td>
                  <td
                    data-label="Darslik"
                    style={{
                      color:
                        !item?.lessonName || item?.lessonName.trim() === ""
                          ? "red"
                          : "black",
                      fontWeight:
                        !item?.lessonName || item?.lessonName.trim() === ""
                          ? "600"
                          : "400",
                    }}
                  >
                    {item?.lessonName && item?.lessonName.trim() !== ""
                      ? item?.lessonName
                      : "Darslik yaratilmagan"}
                  </td>
                  <td data-label="O‘qituvchi">{item?.teacher}</td>
                  <td data-label="Telefon">{item?.phone}</td>
                  <td data-label="Sabab">{item?.reason}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  Ma’lumot topilmadi
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttendanceMissing;
