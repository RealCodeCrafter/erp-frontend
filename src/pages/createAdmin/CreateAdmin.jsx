import React, { useEffect, useState } from "react";
import {
  User,
  Phone,
  MapPin,
  UserCheck,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  Save,
  X,
  Check,
} from "lucide-react";
import "./CreateAdmin.scss";
import {
  useCreateAdminMutation,
  useGetAdminsListQuery,
} from "../../context/api/adminApi";
import AdminTable from "../../components/table/AdminTable";
import SecHeader from "../../components/secHeader/SecHeader";
import Module from "../../components/Module/Module";
import toast from "react-hot-toast";

const AdminCreate = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "+998 ",
    address: "",
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const { data } = useGetAdminsListQuery();
  const [createAdmin, { isLoading, isSuccess }] = useCreateAdminMutation();

  const formatPhoneNumber = (value) => {
    if (!value.startsWith("+998")) {
      return "+998 ";
    }

    const numbers = value.slice(4).replace(/\D/g, "");

    const limitedNumbers = numbers.slice(0, 9);

    let result = "+998";

    if (limitedNumbers.length > 0) {
      result += " ";
      for (let i = 0; i < limitedNumbers.length; i++) {
        if (i === 2 || i === 5 || i === 7) {
          result += " ";
        }
        result += limitedNumbers[i];
      }
    } else {
      result += " "; // Bo'sh joy qoldirish
    }

    return result;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let processedValue = value;

    if (name === "phone") {
      processedValue = formatPhoneNumber(value);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: processedValue,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "Ism kiritish majburiy";
    if (!formData.lastName.trim())
      newErrors.lastName = "Familiya kiritish majburiy";

    const phoneNumbers = formData.phone.slice(4).replace(/\D/g, ""); // +998 dan keyingi raqamlar
    if (phoneNumbers.length !== 9) {
      newErrors.phone = "Telefon raqam to'liq emas (9 ta raqam kerak)";
    }

    if (!formData.address.trim())
      newErrors.address = "Manzil kiritish majburiy";
    if (!formData.username.trim())
      newErrors.username = "Username kiritish majburiy";
    else if (formData.username.length < 4)
      newErrors.username =
        "Username kamida 4 ta belgidan iborat bo'lishi kerak";
    if (!formData.password.trim())
      newErrors.password = "Parol kiritish majburiy";
    else if (formData.password.length < 4)
      newErrors.password = "Parol kamida 4 ta belgidan iborat bo'lishi kerak";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    try {
      const cleanedFormData = {
        ...formData,
        phone: formData.phone.replace(/\s+/g, ""), // barcha bo'sh joylarni olib tashlaydi
      };

      const res = await createAdmin(cleanedFormData);
    } catch (err) {
      toast.error(
        "Admin qo'shishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
        err
      );
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Admin muvaffaqiyatli qo'shildi!");
      setOpenModal(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleClear = () => {
    setFormData({
      firstName: "",
      lastName: "",
      phone: "+998 ",
      address: "",
      username: "",
      password: "",
    });
    setErrors({});
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <SecHeader title={"Adminlar"}>
        <button
          style={{
            border: "1px solid transparent",
            padding: "8px 16px",
            borderRadius: "8px",
            fontSize: "16px",
            background: "#2980b9",
            color: "white",
          }}
          onClick={() => setOpenModal(true)}
        >
          Admin yaratish
        </button>
      </SecHeader>
      <div style={{ padding: "0 20px 20px" }}>
        <AdminTable data={data || []} />
      </div>
      {openModal && (
        <Module bg="#aaa4" close={closeModal}>
          <div className="admin-container">
            <div className="">
              <div className="main-card">
                <div className="card-content">
                  <form className="form-grid" onSubmit={handleSubmit}>
                    <div className="input-group">
                      <label className="input-label">Ism</label>
                      <div className="input-container">
                        <div className="input-icon">
                          <User size={18} />
                        </div>
                        <input
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Ismingizni kiriting"
                          className={`input-field ${errors.firstName ? "input-error" : ""
                            }`}
                        />
                      </div>
                      {errors.firstName && (
                        <p className="error-text">{errors.firstName}</p>
                      )}
                    </div>

                    <div className="input-group">
                      <label className="input-label">Familiya</label>
                      <div className="input-container">
                        <div className="input-icon">
                          <User size={18} />
                        </div>
                        <input
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Familiyangizni kiriting"
                          className={`input-field ${errors.lastName ? "input-error" : ""
                            }`}
                        />
                      </div>
                      {errors.lastName && (
                        <p className="error-text">{errors.lastName}</p>
                      )}
                    </div>

                    <div className="input-group">
                      <label className="input-label">Telefon Raqam</label>
                      <div className="input-container">
                        <div className="input-icon">
                          <Phone size={18} />
                        </div>
                        <input
                          name="phone"
                          type="text"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+998 99 999 99 99"
                          className={`input-field ${errors.phone ? "input-error" : ""
                            }`}
                        />
                      </div>

                    </div>

                    <div className="input-group">
                      <label className="input-label">Manzil</label>
                      <div className="input-container">
                        <div className="input-icon">
                          <MapPin size={18} />
                        </div>
                        <input
                          name="address"
                          type="text"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Manzilingizni kiriting"
                          className={`input-field ${errors.address ? "input-error" : ""
                            }`}
                        />
                      </div>
                      {errors.address && (
                        <p className="error-text">{errors.address}</p>
                      )}
                    </div>

                    <div className="input-group">
                      <label className="input-label">Username</label>
                      <div className="input-container">
                        <div className="input-icon">
                          <UserCheck size={18} />
                        </div>
                        <input
                          name="username"
                          type="text"
                          value={formData.username}
                          onChange={handleInputChange}
                          placeholder="Username kiriting"
                          className={`input-field ${errors.username ? "input-error" : ""
                            }`}
                        />
                      </div>

                    </div>

                    <div className="input-group">
                      <label className="input-label">Parol</label>
                      <div className="input-container">
                        <div className="input-icon">
                          <Lock size={18} />
                        </div>
                        <input
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Parol kiriting"
                          className={`input-field ${errors.password ? "input-error" : ""
                            }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="password-toggle"
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="actions">
                      <button
                        type="button"
                        onClick={handleClear}
                        className="btn btn-secondary"
                      >
                        <X size={18} />
                        Tozalash
                      </button>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="btn btn-primary"
                      >
                        {isLoading ? (
                          <>
                            <div className="spinner"></div>
                            Saqlanmoqda...
                          </>
                        ) : (
                          <>
                            <Save size={18} />
                            Adminni Qo'shish
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Module>
      )}
    </>
  );
};

export default AdminCreate;
