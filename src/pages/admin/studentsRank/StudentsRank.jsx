import React from "react";
import "./studentsRating.scss";

const students = [
  { id: 1, name: "Aliyev Alisher", address: "Tashkent", group: "English", score: 95 },
  { id: 2, name: "Karimova Madina", address: "Tashkent", group: "Matematika", score: 90 },
  { id: 3, name: "Tursunov Shaxzod", address: "Tashkent", group: "Ona tili", score: 88 },
  { id: 4, name: "Abdullayev Diyor", address: "Samarqand", group: "English", score: 85 },
  { id: 5, name: "Nazarova Dilnoza", address: "Andijon", group: "Matematika", score: 92 },
  { id: 6, name: "Olimov Sardor", address: "Namangan", group: "Ona tili", score: 89 },
  { id: 7, name: "Rustamova Mohira", address: "Buxoro", group: "English", score: 87 },
  { id: 8, name: "Shomurodov Aziz", address: "Navoiy", group: "Matematika", score: 84 },
  { id: 9, name: "Xolmatova Laylo", address: "Farg‘ona", group: "Ona tili", score: 91 },
  { id: 10, name: "Yusupov Akmal", address: "Xorazm", group: "English", score: 86 },
  { id: 11, name: "Zokirova Sevara", address: "Jizzax", group: "Matematika", score: 93 },
  { id: 12, name: "Qodirov Bekzod", address: "Toshkent", group: "Ona tili", score: 88 },
];

const StudentRating = () => {
  return (
    <div className="student-rating">
      <div className="table-container">
        <table className="rating-table">
          <thead>
            <tr>
              <th>O'rni</th>
              <th>Ism</th>
              <th>Familiya</th>
              <th>Manzil</th>
              <th>Fan</th>
              <th>Ball</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => {
              const [lastName, firstName] = student.name.split(" ");
              return (
                <tr key={student.id}>
                  <td style={{textAlign: "start"}}>{index + 1}</td>
                  <td>{firstName}</td>
                  <td>{lastName}</td>
                  <td>{student.address}</td>
                  <td>{student.group}</td>
                  <td>{student.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentRating;
