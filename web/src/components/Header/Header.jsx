import React, { useState } from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
function Header() {
  const userDataapi = JSON.parse(localStorage.getItem("userData"));
  const [userData, setuserData] = useState({
    name: userDataapi.name,
    surname: userDataapi.surname,
  });

  return (
    <div className={styles.Header}>
      <h3>{`${userData.surname} ${userData.name}`}</h3>
      <Link to="/">
        <button>Выйти</button>
      </Link>
    </div>
  );
}

export default Header;
