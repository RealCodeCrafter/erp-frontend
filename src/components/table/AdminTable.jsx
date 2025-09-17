import React, { useState, useEffect, useRef } from "react";
import "./table.scss";
import "react-phone-input-2/lib/style.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { AiOutlineDelete } from "react-icons/ai";
import { IoMdMore } from "react-icons/io";
import toast from "react-hot-toast";
import { useDeleteAdminMutation } from "../../context/api/adminApi";

const AdminTable = ({ data }) => {
  const [activeStudentId, setActiveStudentId] = useState(null);

  const menuRef = useRef(null);

  const [deleteAdmin] = useDeleteAdminMutation();

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

  const handleDelete = async (id) => {
    try {
      await deleteAdmin(id);

      toast.success("O'chirildi");
    } catch (error) {
      toast.error("Xatolik yuz berdi", error);
    }
  };

  const toggleMenu = (id) => {
    setActiveStudentId(activeStudentId === id ? null : id);
  };

  const customerTbody = data?.map((el, index) => (
    <tr key={el?.id}>
      <td data-cell="id">{index + 1}</td>
      <td data-cell="Ismi">{el?.firstName}</td>
      <td data-cell="Familyasi">{el?.lastName}</td>
      <td data-cell="Manzili">{el?.address}</td>
      <td data-cell="Telefon raqam">
        {el?.phone ? el?.phone : "+998123531282"}
      </td>

      <td
        style={{ cursor: "pointer" }}
        onClick={() => toggleMenu(el?.id)}
        data-cell="Info"
      >
        <IoMdMore />
      </td>

      {activeStudentId === el?.id && (
        <div className="table__hide" ref={menuRef}>
          <button
            onClick={() => handleDelete(el?.id)}
            className="table__btns-view"
          >
            <AiOutlineDelete />
            O'chirish
          </button>
        </div>
      )}
    </tr>
  ));

  return (
    <div className="table">
      {/* Table Rows */}
      <table className="table__row">
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th>№</th>
            <th>Ism</th>
            <th>Familiya</th>
            <th>Manzil</th>
            <th>Telefon nomer</th>

            <th>/</th>
          </tr>
        </thead>
        <tbody>{customerTbody}</tbody>
      </table>
      {/* Pagination */}
      <div className="table__pagenation">
        <Stack spacing={2}>
          <Pagination />
        </Stack>
      </div>
    </div>
  );
};

export default AdminTable;
