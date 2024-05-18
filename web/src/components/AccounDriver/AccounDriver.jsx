import React from "react";
import styles from "./AccounDriver.module.scss";
import HeadMenu from "./../HeadMenu/HeadMenu";

function AccounDriver() {
  return (
    <div className={styles.AccounDriver}>
      <HeadMenu state={"withBack"} />
      <div className={styles.container}>
        <div>
          <h2>Редактировать аккаунт</h2>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default AccounDriver;
