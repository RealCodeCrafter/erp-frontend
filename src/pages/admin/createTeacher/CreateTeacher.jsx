import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./createTeacher.scss";
import { useGetValue } from "../../../hooks/useGetValue";
import { useCreateTeacherMutation } from "../../../context/api/teacherApi";
import toast from "react-hot-toast";

const initialState = {
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  specialty: "",
  username: "",
  password: "",
};

const CreateTeacher = ({ closeModal }) => {
  const [createTeacher, { data, isSuccess, isError, isLoading }] =
    useCreateTeacherMutation();
  const { formData, setFormData, handleChange } = useGetValue(initialState);

  useEffect(() => {
    if (isSuccess) {
      toast.success("O'qituvchi yaratildi");
      closeModal();
      setFormData(initialState);
    }
    if (isError) {
      toast.error("Xatolik yuz berdi, iltimos qayta urinib ko'ring");
    }
  }, [isSuccess, isError]);

  const handleCreateTeacher = async (e) => {
    e.preventDefault();
    if (!/^\+\d{10,15}$/.test(formData.phone)) {
      toast.error(
        "Telefon raqam noto'g'ri formatda. Iltimos, to'g'ri raqam kiriting."
      );
      return;
    }

    await createTeacher(formData);
  };

  const handlePhoneChange = (phone) => {
    setFormData({ ...formData, phone: `+${phone}` });
  };

  return (
    <div className="createTeacher">
      <h2 className="createTeacher__title">O'qituvchi yaratish</h2>
      <form onSubmit={handleCreateTeacher} action="#">
        <label htmlFor="fname">
          Ism
          <input
            type="text"
            value={formData.firstName}
            name="firstName"
            onChange={handleChange}
            placeholder="Ismingizni kiriting"
            required
            disabled={isLoading}
          />
        </label>
        <label htmlFor="lname">
          Familiya
          <input
            type="text"
            value={formData.lastName}
            name="lastName"
            onChange={handleChange}
            placeholder="Familiyangizni kiriting"
            required
            disabled={isLoading}
          />
        </label>
        <label htmlFor="phone">
          Telefon raqam
          <div>
            <PhoneInput
              country={"uz"}
              value={formData.phone.replace("+", "")}
              onChange={handlePhoneChange}
              placeholder="Telefon raqamini kiriting"
              disabled={isLoading}
              inputStyle={{
                width: "100%",
                fontSize: "14px",
                border: "1px solid #dcdfe3",
                borderRadius: "8px",
              }}
              buttonStyle={{
                background: "#f9fafe",
              }}
            />
          </div>
        </label>
        <label htmlFor="address">
          Manzil
          <input
            type="text"
            value={formData.address}
            name="address"
            onChange={handleChange}
            placeholder="Manzilingizni kiriting"
            required
            disabled={isLoading}
          />
        </label>
        <label htmlFor="username">
          Username
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username kiriting"
            value={formData.username}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </label>
        <label htmlFor="password">
          Parol
          <input
            type="text"
            id="password"
            name="password"
            placeholder="Parol kiriting"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </label>
        <label htmlFor="specialty">
          Mutaxassislik
          <input
            type="text"
            value={formData.specialty}
            name="specialty"
            onChange={handleChange}
            placeholder="Mutaxassislikni kiriting"
            required
            disabled={isLoading}
          />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Yaratilmoqda..." : "Yaratish"}
        </button>
      </form>
    </div>
  );
};

export default CreateTeacher;