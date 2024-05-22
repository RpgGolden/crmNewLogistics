import React from "react";
import styles from "./EditOrder.module.scss";

function DriverForm(props) {
  return (
    <div className={styles.leftbox}>
      <p>Водитель</p>
      <label>Фамилия</label>
      <input
        type="text"
        placeholder="Фамилия"
        onChange={(el) => props.handleInput(el, "surname")}
        // value={
        //   props.orderCon.drivers.find(
        //     (el) => el.id === props.orderCon.orderData.driverId
        //   )?.surname
        // }
        value={props.orderCon.orderData.driver?.surname}
      />
      <label>Имя</label>
      <input
        type="text"
        placeholder="Имя"
        onChange={(el) => props.handleInput(el, "name")}
        // value={
        //   props.orderCon.drivers.find(
        //     (el) => el.id === props.orderCon.orderData.driverId
        //   )?.name
        // }
        value={props.orderCon.orderData.driver?.name}
      />
      <label>Отчество</label>
      <input
        type="text"
        placeholder="Отчество"
        onChange={(el) => props.handleInput(el, "patronymic")}
        // value={
        //   props.orderCon.drivers.find(
        //     (el) => el.id === props.orderCon.orderData.driverId
        //   )?.patronymic
        // }
        value={props.orderCon.orderData.driver?.patronymic}
      />
      <label>Телефон</label>
      <input
        type="text"
        placeholder="Телефон"
        onChange={(el) => props.handleInput(el, "tel")}
        // value={
        //   props.orderCon.drivers.find(
        //     (el) => el.id === props.orderCon.orderData.driverId
        //   )?.phoneNumber
        // }
        value={props.orderCon.orderData.driver?.phoneNumber}
      />
    </div>
  );
}

export default DriverForm;
