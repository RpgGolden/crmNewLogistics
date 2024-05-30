import React from "react";
import styles from "./EditOrder.module.scss";

function DriverForm(props) {
  return (
    <div className={styles.leftbox}>
      <p className={styles.title}>
        <span>Водитель</span>{" "}
        <span
          className={styles.editText}
          onClick={(e) => props.editData(e, "driver")}
        >
          изменить
        </span>
      </p>
      <label>Фамилия</label>
      <input
        type="text"
        style={{ backgroundColor: "#eee" }}
        placeholder="Фамилия"
        onChange={(el) => props.handleInput(el, "surname")}
        readOnly
        value={props.orderCon.orderData.driver?.surname}
      />
      <label>Имя</label>
      <input
        type="text"
        style={{ backgroundColor: "#eee" }}
        placeholder="Имя"
        onChange={(el) => props.handleInput(el, "name")}
        readOnly
        value={props.orderCon.orderData.driver?.name}
      />
      <label>Отчество</label>
      <input
        type="text"
        style={{ backgroundColor: "#eee" }}
        placeholder="Отчество"
        onChange={(el) => props.handleInput(el, "patronymic")}
        readOnly
        value={props.orderCon.orderData.driver?.patronymic}
      />
      <label>Телефон</label>
      <input
        type="text"
        placeholder="Телефон"
        onChange={(el) => props.handleInput(el, "tel")}
        value={props.orderCon.orderData.customer?.phoneNumber}
        style={{
          borderColor: !/^(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(
            props.orderCon.orderData.customer?.phoneNumber
          )
            ? "red"
            : ""
        }}
      />
    </div>
  );
}

export default DriverForm;
