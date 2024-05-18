import React from "react";
import styles from "./EditOrder.module.scss";

function ClientForm(props) {
  return (
    <div className={styles.leftbox}>
      <p>Клиент</p>
      <input
        type="text"
        placeholder="Фамилия"
        onChange={(el) => props.handleInput(el, "surname")}
        value={
          props.orderCon.clients
            .find((el) => el.id === props.orderCon.orderData.customerId)
            ?.fio.split(" ")[0]
        }
      />
      <input
        type="text"
        placeholder="Имя"
        onChange={(el) => props.handleInput(el, "name")}
        value={
          props.orderCon.clients
            .find((el) => el.id === props.orderCon.orderData.customerId)
            ?.fio.split(" ")[1]
        }
      />
      <input
        type="text"
        placeholder="Отчество"
        onChange={(el) => props.handleInput(el, "patronymic")}
        value={
          props.orderCon.clients
            .find((el) => el.id === props.orderCon.orderData.customerId)
            ?.fio.split(" ")[2]
        }
      />
      <input
        type="text"
        placeholder="Телефон"
        onChange={(el) => props.handleInput(el, "tel")}
        value={
          props.orderCon.clients.find(
            (el) => el.id === props.orderCon.orderData.customerId
          )?.phoneNumber
        }
      />
    </div>
  );
}

export default ClientForm;
