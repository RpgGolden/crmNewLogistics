import React, { useState } from "react";
import styles from "./Header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../API/API";
function Header() {
  const userDataapi = JSON.parse(localStorage.getItem("userData"));
  const [userData, setuserData] = useState({
    name: userDataapi.name,
    surname: userDataapi.surname,
  });
  const navigate = useNavigate();

  const Exit =()=>{
    logout().then((resp)=>{
      if(resp.status === 200){
        console.log(resp)
        navigate("/");
      }
    })
  }
  return (
    <div className={styles.Header}>
      <h3>{`${userData.surname} ${userData.name}`}</h3>
        <button onClick={Exit}>Выйти</button>
    </div>
  );
}

export default Header;
