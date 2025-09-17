// Tasks.js
import React from "react";
import "./task.scss";

const tasks = [
  {
    id: 1,
    title: "Matematika mashg‘ulotini o‘tkazish",
    deadline: "2024-12-20",
    status: "Bajarilmagan",
  },
  {
    id: 2,
    title: "Fizika amaliyoti uchun materiallar tayyorlash",
    deadline: "2024-12-22",
    status: "Bajarilgan",
  },
  {
    id: 3,
    title: "IT seminari uchun talabalar ro‘yxatini tuzish",
    deadline: "2024-12-25",
    status: "Jarayonda",
  },
];

const Homework = () => {
  return (
    <div className="tasks">
      <table className="tasks-table">
        <thead>
          <tr>
            <th>Vazifa</th>
            <th>Muddati</th>
            <th>Holati</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.deadline}</td>
              <td className={`status ${task.status.toLowerCase()}`}>
                {task.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Homework;
