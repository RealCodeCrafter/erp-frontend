import React, { useState, useEffect } from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../context/api/userApi";

let initialState = {
  username: "",
  email: "",
  password: "",
};

const Register = () => {
  const [live, setLive] = useState(initialState);
  const [register, { data, isSuccess }] = useRegisterUserMutation();
  const navigate = useNavigate();

  let handleChange = (e) => {
    let { value, name } = e.target;
    setLive((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(live);
    setLive(initialState);
    console.log("ok");
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  },[isSuccess]);

  return (
    <div className="register">
      <form onSubmit={handleSubmit} className="register__form" action="">
        <div>
          <h3 className="register__form__title">Hisob ochish</h3>
          <p className="register__form__text">
            Davom etish uchun hisob yarating
          </p>
        </div>
        <label htmlFor="">
          Foydalanuvchi Shaxs
          <input
            value={live.username}
            name="username"
            onChange={handleChange}
            placeholder="Foydalanuvchi shaxs"
            type="text"
          />
        </label>
        <label htmlFor="">
          Electron pochta
          <input
            value={live.email}
            name="email"
            onChange={handleChange}
            placeholder="esteban_schiller@gmail.com"
            type="text"
          />
        </label>

        <label htmlFor="">
          <div className="register__form__info">
            <p>parol</p>
            <span>parol unitdingizmi?</span>
          </div>
          <input
            value={live.password}
            name="password"
            onChange={handleChange}
            placeholder="parol"
            type="text"
          />
          <div className="register__form__check">
            <input type="checkbox" />
            Men shart va shartlarni qabul qilaman
          </div>
        </label>
        <button>Ro'yxatdan o'tish</button>
        <p>
          Hisobingiz bormi?
          <Link className="register__form__check-link" to={"/"}>
            Tizimga kirish
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
