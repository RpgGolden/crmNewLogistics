import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
function Header() {
  const [userData, setuserData] = useState({
    name: "",
    surname: "",
  });
 
  useEffect(() => {
    const userDatas = JSON.parse(localStorage.getItem("userData"));
    if (userDatas) {
      setuserData({ surname: userDatas.name, name: userDatas.surname });
    }
  }, []);
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
