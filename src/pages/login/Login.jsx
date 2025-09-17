import React, { useEffect, useState } from "react";
import { useSignInMutation } from "../../context/api/userApi";
import { useDispatch } from "react-redux";
import { setToken } from "../../context/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./login.scss";
import { Button, CircularProgress } from "@mui/material";

let initialState = {
  username: "",
  password: "",
};

const Login = () => {
  const [value, setValue] = useState(initialState);
  const [signIn, { data, isSuccess, isLoading, isError }] = useSignInMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(isSuccess);

  let handleChange = (e) => {
    let { value, name } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem("accessToken", data?.accessToken);
      localStorage.setItem("user", JSON.stringify(data?.user));
      dispatch(setToken(data?.accessToken));
      toast.success("Ro'yhatdan o'tdingiz");
      navigate(
        data.user.role === "superAdmin"
          ? "/dashboard/statistics"
          : data.user.role === "admin"
          ? "/dashboard/students"
          : "/dashboard/groupTeacher"
      );
    }
    if (isError) {
      toast.error("Qaytadan urunib ko'ring");
    }
  }, [isSuccess, isError, data, dispatch, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn(value);
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit} action="">
        <div>
          <h3 className="login__form__title">Royxatdan o'tish</h3>
          <p className="login__form__text">
            Davom etish uchun username va parolingizni kiriting
          </p>
        </div>
        <label htmlFor="">
          Foydalanuvchi shaxs
          <input
            value={value.username}
            name="username"
            onChange={handleChange}
            placeholder="username"
            type="text"
          />
        </label>
        <label htmlFor="">
          <div className="login__form__info">
            <p>Parol</p>
            <span>Parolni unutdingizmi?</span>
          </div>
          <input
            value={value.password}
            name="password"
            onChange={handleChange}
            placeholder="password"
            type="text"
          />
        </label>
        {/* <div className="login__form__check">
          <input type="checkbox" />
          <span>Parolni eslab qolish</span>
        </div> */}

        {/* <Button onLoad={isLoading} type="submit">Tizimga kirish</Button> */}
        <Button
          variant="contained"
          // onClick={handleClick}
          type="submit"
          disabled={isLoading} // loading paytida disable bo‘lishi uchun
          startIcon={
            isLoading ? <CircularProgress size={20} color="inherit" /> : null
          }
          sx={{ height: "40px" }}
        >
          {isLoading ? "Kirilmoqda..." : "Tizimga kirish"}
        </Button>

        <p>
          Hisobingiz yo'qmi?
          <Link className="login__form__link" to={"/register"}>
            Hisob yaratish
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
