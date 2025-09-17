import React, { useState, useEffect } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import user from "../../assets/image/user.png";
import "./profile.scss";
import {
  useGetAdminsQuery,
  useUpdateAdminMutation,
  useUpdateProfileMutation,
} from "../../context/api/adminApi";
import toast from "react-hot-toast";

const Profile = () => {
  const { data } = useGetAdminsQuery();
  const [updateProfile] = useUpdateProfileMutation();

  // API dan kelgan admin
  const profile = data || {};

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    phone: "",
    address: "",
  });

  // Data kelganda formni yangilash
  useEffect(() => {
    if (profile) {
      setForm({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        username: profile.username || "",
        password: "", // parolni hech qachon ochiq ko‘rsatmaymiz
        phone: profile.phone || "",
        address: profile.address || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      // Password bo‘sh bo‘lsa yubormaymiz
      const payload = { ...form };
      if (!form.password) {
        delete payload.password;
      }

      await updateProfile(payload);
      toast.success("Profile tahrirlandi");

      setEditMode(false);
    } catch (err) {
      toast.message("Profileni tahrirlashda xatolik", err);
    }
  };

  return (
    <div className="profile">
      <div className="profile__container">
        <div className="profile__header">
          <h2>Shaxsiy ma'lumotlar</h2>
          {!editMode ? (
            <button className="edit-btn" onClick={() => setEditMode(true)}>
              <FaEdit /> Tahrirlash
            </button>
          ) : (
            <div className="edit-actions">
              <button className="save-btn" onClick={handleSave}>
                <FaSave /> Saqlash
              </button>
              <button className="cancel-btn" onClick={() => setEditMode(false)}>
                <FaTimes /> Bekor qilish
              </button>
            </div>
          )}
        </div>

        <div className="profile__content">
          <div className="profile__image-section">
            <img src={user} alt={`${profile.firstName} ${profile.lastName}`} />
            <p className="profile__image-info">
              500x500 o'lcham, JPEG, JPG, PNG format, maksimum 2MB
            </p>
          </div>

          <div className="profile__info-section">
            <div className="profile__info-item">
              <h4>Ism</h4>
              {editMode ? (
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                />
              ) : (
                <p>{profile.firstName}</p>
              )}
            </div>

            <div className="profile__info-item">
              <h4>Familiya</h4>
              {editMode ? (
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                />
              ) : (
                <p>{profile.lastName}</p>
              )}
            </div>

            <div className="profile__info-item">
              <h4>Telefon raqam</h4>
              {editMode ? (
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              ) : (
                <p>{profile.phone}</p>
              )}
            </div>

            <div className="profile__info-item">
              <h4>Manzil</h4>
              {editMode ? (
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                />
              ) : (
                <p>{profile.address}</p>
              )}
            </div>

            <div className="profile__info-item">
              <h4>Username</h4>
              {editMode ? (
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                />
              ) : (
                <p>{profile.username}</p>
              )}
            </div>

            <div className="profile__info-item">
              <h4>Parol</h4>
              {editMode ? (
                <input
                  type="password"
                  name="password"
                  placeholder="Yangi parol kiriting"
                  value={form.password}
                  onChange={handleChange}
                />
              ) : (
                <p>********</p> // parolni hech qachon ochiq ko‘rsatmaymiz
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
