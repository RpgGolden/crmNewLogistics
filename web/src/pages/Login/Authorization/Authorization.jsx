import React, { useState } from "react";
import styles from "./Authorization.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "../../../API/API";
function Authorization() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    Login(formData).then((LoginUserData) => {
      if (LoginUserData) {
        console.log(LoginUserData);
        navigate("/AdminPage");
      }
    });
  };

  return (
    <div className={styles.AuthorRegistrar}>
      <div className={styles.box}>
        <div className={styles.container}>
          <h2>Вход в аккаунт</h2>
          <input
            type="text"
            placeholder="Логин"
            name="login"
            value={formData.login}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Пароль"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
            <button className={styles.button} onClick={handleLogin}>Войти</button>
          <Link to="/Register">
            <button className={styles.buttonReg} >Зарегестрироваться</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Authorization;
