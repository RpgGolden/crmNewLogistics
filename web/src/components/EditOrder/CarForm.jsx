import React from "react";
import styles from "./EditOrder.module.scss";

function CarForm(props) {
  const typeCar = {
    1: "Тентовый 5т",
    2: "Контейнер",
    3: "Микро автобус",
    4: "Газель 6м",
    5: "Еврофура 82м",
  };
  return (
    <div className={styles.leftbox} style={{ height: "100%" }}>
      <p className={styles.title}>
        <span>Машина</span>{" "}
        <span
          className={styles.editText}
          onClick={(e) => props.editData(e, "car")}
        >
          изменить
        </span>
      </p>

      <label>Марка</label>
      <div className={styles.leftbox_lll}>
        <input
          style={{ backgroundColor: "#eee" }}
          type="text"
          placeholder="Марка"
          onChange={(el) => props.handleInput(el, "markCar")}
          readOnly
          value={props.orderCon.orderData.car?.markCar}
        />
        <label>Гос номер</label>
        <input
          style={{ backgroundColor: "#eee" }}
          type="text"
          placeholder="Гос номер"
          onChange={(el) => props.handleInput(el, "numberCar")}
          readOnly
          value={props.orderCon.orderData.car?.numberCar}
        />
        <label>Тип авто</label>
        <input
          style={{ backgroundColor: "#eee" }}
          type="text"
          placeholder="Тип авто"
          onChange={(el) => props.handleInput(el, "typeCar")}
          readOnly
          value={typeCar[props.orderCon.orderData.car?.typeCar]}
        />
        <label>Длина, м</label>

        <input
          style={{ backgroundColor: "#eee" }}
          type="text"
          placeholder="Длина, м"
          onChange={(el) => props.handleInput(el, "lengthCar")}
          readOnly
          value={props.orderCon.orderData.car?.lengthCar}
        />
        <label>Ширина, м</label>
        <input
          style={{ backgroundColor: "#eee" }}
          type="text"
          placeholder="Ширина, м"
          onChange={(el) => props.handleInput(el, "widthCar")}
          readOnly
          value={props.orderCon.orderData.car?.widthCar}
        />
        <label>Высота, м</label>
        <input
          style={{ backgroundColor: "#eee" }}
          type="text"
          placeholder="Высота, м"
          onChange={(el) => props.handleInput(el, "heightCar")}
          readOnly
          value={props.orderCon.orderData.car?.heightCar}
        />
        <label>Объем, м3</label>
        <input
          style={{ backgroundColor: "#eee" }}
          type="text"
          placeholder="Объем, м3"
          onChange={(el) => props.handleInput(el, "volumeCar")}
          readOnly
          value={props.orderCon.orderData.car?.volumeCar}
        />
        <label>Грузоподъемность, т</label>
        <input
          style={{ backgroundColor: "#eee" }}
          type="text"
          placeholder="Грузоподъемность, т"
          onChange={(el) => props.handleInput(el, "loadCapacity")}
          readOnly
          value={props.orderCon.orderData.car?.loadCapacity}
        />
        <label>Колличесвто палет</label>
        <input
          style={{ backgroundColor: "#eee" }}
          type="text"
          placeholder="Колличесвто палет"
          onChange={(el) => props.handleInput(el, "numberOfPallet")}
          readOnly
          value={props.orderCon.orderData.car?.numberOfPallet}
        />
      </div>
    </div>
  );
}

export default CarForm;
