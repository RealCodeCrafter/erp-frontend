import React, { useState } from "react";
import "./teacher.scss";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import {
  useDeleteTeacherMutation,
  useGetTeacherQuery,
  useUpdateTeacherMutation,
} from "../../../context/api/teacherApi";
import Module from "../../../components/Module/Module";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast from "react-hot-toast";
import Table from "../../../components/table/Table";
import SecHeader from "../../../components/secHeader/SecHeader";
import CreateTeacher from "../createTeacher/CreateTeacher";
import TeacherTable from "../../../components/table/TeacherTable";

const Teachers = () => {
  const { data } = useGetTeacherQuery();
  const [deleteTeacher] = useDeleteTeacherMutation();
  const [updateTeacher] = useUpdateTeacherMutation();
  const [createHide, setCreatHide] = useState(false);

  const closeModal = () => {
    setCreatHide(false);
  };

  const [isEditVisible, setIsEditVisible] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    specialty: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async (id) => {
    if (window.confirm("O'qituvchi o'chirilsinmi?")) {
      try {
        setIsLoading(true);
        await deleteTeacher(id);
        toast.success("O'qituvchi o'chirildi!");
      } catch (err) {
        toast.error("O'qituvchini o'chirishda xatolik yuz berdi!");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEditClick = (teacher) => {
    setEditFormData(teacher);
    setIsEditVisible(true);
  };

  const handleEditChange = (field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!/^\+998[0-9]{9}$/.test(editFormData.phone)) {
      return toast.custom("Telefon raqami noto'g'ri formatda kiritilgan!");
    }

    const updatedUser = {
      firstName: editFormData.firstName,
      lastName: editFormData.lastName,
      phone:
        editFormData.phone.length === 12
          ? "+" + editFormData.phone
          : editFormData.phone,
      address: editFormData.address,
      specialty: editFormData.specialty,
    };

    try {
      setIsLoading(true);
      await updateTeacher({ body: updatedUser, id: editFormData.id });
      toast.success("O'qituvchi ma'lumotlari yangilandi!");
    } catch (err) {
      toast.error("O'qituvchini yangilashda xatolik yuz berdi!");
    } finally {
      setIsLoading(false);
      setIsEditVisible(false);
    }
  };

  return (
    <div className="teachers">
      <SecHeader title={"O'qituvchilar"}>
        <button
          style={{
            border: "1px solid transparent",
            padding: "5px 10px",
            borderRadius: "5px",
            fontSize: "16px",
            background: "#2980b9",
            color: "white",
          }}
          onClick={() => setCreatHide(true)}
        >
          + O'qituvchi yaratish
        </button>
      </SecHeader>
      <div className="teacher-list">
        <TeacherTable data={data} />
      </div>
      {isEditVisible && (
        <Module bg={"#aaa5"} close={() => setIsEditVisible(false)}>
          <form className="teachers__edit" onSubmit={handleEditSubmit}>
            <h3 className="teachers__edit-title">O'qituvchini taxrirlash</h3>
            <label>
              Ism
              <input
                type="text"
                value={editFormData.firstName}
                onChange={(e) => handleEditChange("firstName", e.target.value)}
                placeholder="Ismingizni kiriting"
                required
              />
            </label>
            <label>
              Familiya
              <input
                type="text"
                value={editFormData.lastName}
                onChange={(e) => handleEditChange("lastName", e.target.value)}
                placeholder="Familiyangizni kiriting"
                required
              />
            </label>
            <label>
              Telefon raqam
              <PhoneInput
                country={"uz"}
                value={editFormData.phone}
                onChange={(value) => handleEditChange("phone", value)}
                placeholder="Telefon raqamini kiriting"
                inputStyle={{
                  width: "100%",
                  paddingLeft: "43px",
                  fontSize: "14px",
                  borderRadius: "8px",
                }}
              />
            </label>
            <label>
              Manzil
              <input
                type="text"
                value={editFormData.address}
                onChange={(e) => handleEditChange("address", e.target.value)}
                placeholder="Manzilingizni kiriting"
                required
              />
            </label>
            <label>
              Mutaxassislik
              <input
                type="text"
                value={editFormData.specialty}
                onChange={(e) => handleEditChange("specialty", e.target.value)}
                placeholder="Mutaxassislikni kiriting"
                required
              />
            </label>
            <button
              className="teachers__edit-btn"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Yuklanmoqda..." : "O'zgartirish"}
            </button>
          </form>
        </Module>
      )}
      {error && <p className="error-message">{error}</p>}
      {createHide && (
        <Module bg="#aaa4" close={closeModal}>
          <CreateTeacher closeModal={closeModal} />
        </Module>
      )}
    </div>
  );
};

export default Teachers;
