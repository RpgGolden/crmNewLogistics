import React from "react";
import styles from "./EditOrder.module.scss";

function CarForm(props) {
  return (
    <div className={styles.leftbox} style={{ height: "100%" }}>
      <p>Машина</p>
      <label>Марка</label>
      <div className={styles.leftbox_lll}>
        <input
          type="text"
          placeholder="Марка"
          onChange={(el) => props.handleInput(el, "markCar")}
          value={
            props.orderCon.cars.find(
              (el) => el.id === props.orderCon.orderData.carId
            )?.markCar
          }
        />
        <label>Гос номер</label>
        <input
          type="text"
          placeholder="Гос номер"
          onChange={(el) => props.handleInput(el, "numberCar")}
          value={
            props.orderCon.cars.find(
              (el) => el.id === props.orderCon.orderData.carId
            )?.numberCar
          }
        />
        <label>Тип авто</label>
        <input
          type="text"
          placeholder="Тип авто"
          onChange={(el) => props.handleInput(el, "typeCar")}
          value={
            props.orderCon.cars.find(
              (el) => el.id === props.orderCon.orderData.carId
            )?.typeCar
          }
        />
        <label>Длина, м</label>

        <input
          type="text"
          placeholder="Длина, м"
          onChange={(el) => props.handleInput(el, "lengthCar")}
          value={
            props.orderCon.cars.find(
              (el) => el.id === props.orderCon.orderData.carId
            )?.lengthCar
          }
        />
        <label>Ширина, м</label>
        <input
          type="text"
          placeholder="Ширина, м"
          onChange={(el) => props.handleInput(el, "widthCar")}
          value={
            props.orderCon.cars.find(
              (el) => el.id === props.orderCon.orderData.carId
            )?.widthCar
          }
        />
        <label>Высота, м</label>
        <input
          type="text"
          placeholder="Высота, м"
          onChange={(el) => props.handleInput(el, "heightCar")}
          value={
            props.orderCon.cars.find(
              (el) => el.id === props.orderCon.orderData.carId
            )?.heightCar
          }
        />
        <label>Объем, м3</label>
        <input
          type="text"
          placeholder="Объем, м3"
          onChange={(el) => props.handleInput(el, "volumeCar")}
          value={
            props.orderCon.cars.find(
              (el) => el.id === props.orderCon.orderData.carId
            )?.volumeCar
          }
        />
        <label>Грузоподъемность, т</label>
        <input
          type="text"
          placeholder="Грузоподъемность, т"
          onChange={(el) => props.handleInput(el, "loadCapacity")}
          value={
            props.orderCon.cars.find(
              (el) => el.id === props.orderCon.orderData.carId
            )?.loadCapacity
          }
        />
        <label>Колличесвто палет</label>
        <input
          type="text"
          placeholder="Колличесвто палет"
          onChange={(el) => props.handleInput(el, "numberOfPallet")}
          value={
            props.orderCon.cars.find(
              (el) => el.id === props.orderCon.orderData.carId
            )?.numberOfPallet
          }
        />
      </div>
    </div>
  );
}

export default CarForm;
