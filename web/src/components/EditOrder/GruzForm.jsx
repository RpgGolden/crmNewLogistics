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
        onChange={(el) => props.handleInput(el, "typeCargo")}
        value={props.orderCon.orderData.typeCargo}
      />
      <label>Мест</label>
      <input
        type="number"
        placeholder="Мест"
        onChange={(el) => props.handleInput(el, "places")}
        value={props.orderCon.orderData.places}
      />
      <label>Вес</label>
      <input
        type="number"
        placeholder="Вес"
        onChange={(el) => props.handleInput(el, "weight")}
        value={props.orderCon.orderData.weight}
      />
      <label>Объем</label>
      <input
        type="number"
        placeholder="Объем"
        onChange={(el) => props.handleInput(el, "volume")}
        value={props.orderCon.orderData.volume}
      />
    </div>
  );
}

export default GruzForm;
