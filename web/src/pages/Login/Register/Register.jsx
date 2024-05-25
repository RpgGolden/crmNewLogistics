import React, { useState } from "react";
import styles from "./Register.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { RegisterApi } from "../../../API/API";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    patronymic: "",
    login: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegistration = () => {
    if (
      formData.name &&
      formData.surname &&
      formData.login &&
      formData.password &&
      formData.confirmPassword &&
      formData.password === formData.confirmPassword
    ) {
      const { confirmPassword, ...dataWithoutConfirmPassword } = formData;
      console.log(formData);
      RegisterApi(dataWithoutConfirmPassword).then((registeredUserData) => {
        if (registeredUserData) {
          navigate("/AdminPage");
        }
      });
    } else {
      alert("Пожалуйста, заполните все поля и убедитесь, что пароли совпадают");
    }
  };

  return (
    <div className={styles.AuthorRegistrar}>
      <div className={styles.box}>
        <div className={styles.container}>
          <h2>Регистрация аккаунта</h2>
          <input
            type="text"
            placeholder="Фамилия"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          ></input>
          <input
            type="text"
            placeholder="Имя"
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
          ></input>
          <input
            type="text"
            placeholder="Отчество"
            name="patronymic"
            value={formData.patronymic}
            onChange={handleInputChange}
          ></input>
          <input
            type="text"
            placeholder="email"
            name="login"
            value={formData.login}
            onChange={handleInputChange}
          ></input>
          <input
            type="password"
            placeholder="Пароль"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          ></input>
          <input
            type="password"
            placeholder="Подтвердите пароль"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          ></input>
          <button
            className={styles.buttonRegister}
            onClick={handleRegistration}
          >
            Зарегистрироваться
          </button>
          <Link to="/">
            <button className={styles.buttonIn}>Войти</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
