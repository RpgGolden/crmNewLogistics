import React from "react";
import styles from "./EditOrder.module.scss";

function EditForm(props) {
  return (
    <div
      className={styles.EditForm}
      style={{ top: props.position.x, left: props.position.y }}
    >
      <ul className={styles.list}>
        {props.dataList.type === "car"
          ? props.dataList.data.map((item) => (
              <li onClick={() => props.liClick(item)}>
                {item.markCar + " " + item.numberCar}
              </li>
            ))
          : props.dataList.data.map((item) => (
              <li onClick={() => props.liClick(item)}>{item.fio}</li>
            ))}
      </ul>
    </div>
  );
}

export default EditForm;
