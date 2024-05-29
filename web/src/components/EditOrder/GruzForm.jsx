import React from "react";
import styles from "./EditOrder.module.scss";

function GruzForm(props) {
  return (
    <div className={styles.rightbox}>
      <p>Груз</p>
      <label>Тип груза</label>
      <input
        type="text"
        placeholder="Зерно"
        onChange={(el) => props.handleInput(el, "typeCargo")}
        value={props.orderCon.orderData.typeCargo}
      />
      <label>Мест</label>
      <input
        type="number"
        placeholder="2"
        onChange={(el) => props.handleInput(el, "places")}
        value={props.orderCon.orderData.places}
      />
      <label>Вес</label>
      <input
        type="number"
        placeholder="23.4"
        onChange={(el) => props.handleInput(el, "weight")}
        value={props.orderCon.orderData.weight}
      />
      <label>Объем</label>
      <input
        type="number"
        placeholder="55.5"
        onChange={(el) => props.handleInput(el, "volume")}
        value={props.orderCon.orderData.volume}
      />
    </div>
  );
}

export default GruzForm;
