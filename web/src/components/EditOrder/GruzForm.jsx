import React from "react";
import styles from "./EditOrder.module.scss";

function GruzForm(props) {
  return (
    <div className={styles.rightbox}>
      <p>Груз</p>
      <label>Тип груза</label>
      <input
        type="text"
        placeholder="Тип груза"
        onChange={(el) => props.handleInput(el, "gruz")}
        value={props.orderCon.orderData.typeCargo}
      />
      <label>Мест</label>
      <input
        type="text"
        placeholder="Мест"
        onChange={(el) => props.handleInput(el, "mest")}
        value={props.orderCon.orderData.places}
      />
      <label>Вес</label>
      <input
        type="text"
        placeholder="Вес"
        onChange={(el) => props.handleInput(el, "weigth")}
        value={props.orderCon.orderData.weight}
      />
      <label>Объем</label>
      <input
        type="text"
        placeholder="Объем"
        onChange={(el) => props.handleInput(el, "obyom")}
        value={props.orderCon.orderData.volume}
      />
    </div>
  );
}

export default GruzForm;
