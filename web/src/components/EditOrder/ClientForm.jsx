import React from "react";
import styles from "./EditOrder.module.scss";

function ClientForm(props) {
  return (
    <div className={styles.leftbox}>
      <p>Клиент</p>
      <label>Фамилия</label>
      <input
        style={{ backgroundColor: "#eee" }}
        type="text"
        placeholder="Фамилия"
        onChange={(el) => props.handleInput(el, "surname")}
        value={props.orderCon.orderData.customer?.fio.split(" ")[0]}
        readOnly
      />
      <label>Имя</label>
      <input
        style={{ backgroundColor: "#eee" }}
        type="text"
        placeholder="Имя"
        onChange={(el) => props.handleInput(el, "name")}
        readOnly
        value={props.orderCon.orderData.customer?.fio.split(" ")[1]}
      />
      <label>Отчество</label>
      <input
        style={{ backgroundColor: "#eee" }}
        type="text"
        placeholder="Отчество"
        onChange={(el) => props.handleInput(el, "patronymic")}
        readOnly
        value={props.orderCon.orderData.customer?.fio.split(" ")[2]}
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

export default ClientForm;
