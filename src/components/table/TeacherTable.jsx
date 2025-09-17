import React, { useState, useEffect, useRef } from "react";
import "./table.scss";
import { Link } from "react-router-dom";
import Module from "../Module/Module";
import PaymeForm from "../paymeForm/PaymeForm";
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
import toast from "react-hot-toast";
import { Button, CircularProgress } from "@mui/material";
import {
  useDeleteTeacherMutation,
  useUpdateTeacherMutation,
} from "../../context/api/teacherApi";
import DeleteModule from "../deleteModule/DeleteModule";

// 🆕 DeleteModule import qilamiz

const TeacherTable = ({ data, loc, hide, filterBtn }) => {
  const [tableClose, setTableClose] = useState(false);
  const [budget, setBudget] = useState(2);
  const [budgetDebt, setBudgetDebt] = useState(2);
  const [filter, setFilter] = useState(0);
  const [page, setPage] = useState(1);
  const [deleteTeacher] = useDeleteTeacherMutation();
  const [updateTeacher, { isError, isLoading, isSuccess }] =
    useUpdateTeacherMutation();
  const [studentEdit, setStudentEdit] = useState(null);
  const [activeStudentId, setActiveStudentId] = useState(null);
  const { data: studentData } = useGetStudentQuery();

  // 🆕 Delete uchun state
  const [deleteId, setDeleteId] = useState(null);
  const [deleteHide, setDeleteHide] = useState(false);

  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil((data?.length || 0) / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPageData = data?.slice(startIndex, endIndex) || [];

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

  const handlePageChange = (event, value) => {
    setPage(value);
    setActiveStudentId(null);
  };

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(1);
    }
  }, [data?.length, page, totalPages]);

  // 🆕 faqat o‘chirish funksiyasi
  const handleDelete = (id) => {
    deleteTeacher(id);
    toast.success("O'qituvchi o'chirildi");

    const remainingItems = data.length - 1;
    const newTotalPages = Math.ceil(remainingItems / ITEMS_PER_PAGE);
    if (page > newTotalPages && newTotalPages > 0) {
      setPage(newTotalPages);
    }
  };

  const handleEdit = (student) => {
    setStudentEdit(student);
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
      specialty: studentEdit.specialty,
    };

    await updateTeacher({
      body: updatedStudent,
      id: studentEdit.id,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("O'qituvchi ma'lumotlari yangilandi");
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

  const customerTbody = currentPageData?.map((el, index) => (
    <tr key={el?.id}>
      <td data-cell="id">{startIndex + index + 1}</td>
      <td data-cell="firstName">{el?.firstName}</td>
      <td data-cell="lastName">{el?.lastName}</td>
      <td data-cell="username">{el?.username}</td>
      <td data-cell="manzil">{el?.address}</td>
      <td data-cell="nomer">{el?.phone ? el?.phone : "+998123531282"}</td>
      {hide ? (
        <td data-cell="group">{el?.parentPhone}</td>
      ) : (
        <td data-cell="group">{el?.specialty}</td>
      )}

      <td data-cell="info">
        <div className="table__more-btn" onClick={() => toggleMenu(el?.id)}>
          <IoMdMore />
        </div>
      </td>

      {activeStudentId === el?.id && (
        <div className="table__hide" ref={menuRef}>
          {/* 🆕 Delete bosilganda modal ochiladi */}
          <button
            onClick={() => {
              setDeleteId(el?.id);
              setDeleteHide(true);
            }}
            className="table__btns-view"
          >
            <AiOutlineDelete />
            <span>O'chirish</span>
          </button>

          <button onClick={() => handleEdit(el)} className="table__btns-view">
            <CiEdit />
            <span>Tahrirlash</span>
          </button>

          <Link to={`/dashboard/teacher/${el.id}`}>
            <button className="table__btns-view">
              <VscCodeReview />
              Batafsil
            </button>
          </Link>
        </div>
      )}
    </tr>
  ));

  return (
    <div className="table">
      <table className="table__row">
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th>№</th>
            <th>Ism</th>
            <th>Familiya</th>
            <th>Username</th>
            <th>Manzil</th>
            <th>Telefon nomer</th>
            <th>Kurs</th>
            <th>/</th>
          </tr>
        </thead>
        <tbody>{customerTbody}</tbody>
      </table>

      {data && data.length > ITEMS_PER_PAGE && (
        <div className="table__pagenation">
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
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

      {/* Edit Form */}
      {studentEdit && (
        <Module close={setStudentEdit} bg={"#aaa6"}>
          <form className="students__edit" onSubmit={handleEditSubmit}>
            <h3 className="students__edit-title">Taxrirlash</h3>
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
                inputStyle={{
                  width: "100%",
                  padding: "20px 45px",
                  fontSize: "14px",
                  border: "1px solid #dcdfe3",
                  borderRadius: "8px",
                  opacity: isLoading ? 0.6 : 1,
                }}
                buttonStyle={{
                  background: "#f9fafe",
                  opacity: isLoading ? 0.6 : 1,
                }}
              />
            </label>

            <label>
              Manzil
              <input
                type="text"
                value={studentEdit.address}
                onChange={(e) =>
                  setStudentEdit((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
                required
                disabled={isLoading}
              />
            </label>
            <label>
              Mutaxasislik
              <input
                type="text"
                value={studentEdit.specialty}
                onChange={(e) =>
                  setStudentEdit((prev) => ({
                    ...prev,
                    specialty: e.target.value,
                  }))
                }
                required
                disabled={isLoading}
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

      {deleteHide && (
        <DeleteModule
          close={() => setDeleteHide(false)}
          onConfirm={() => {
            handleDelete(deleteId);
            setDeleteHide(false);
          }}
          bg="rgba(0,0,0,0.6)"
          width="300px"
        />
      )}
    </div>
  );
};

export default TeacherTable;
