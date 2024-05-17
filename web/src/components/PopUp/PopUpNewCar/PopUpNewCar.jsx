import React, { useState } from "react";
import styles from "./PopUpNewCar.module.scss";
import PopUpContainer from "../../../UI/PopUpContainer/PopUpContainer";
import Input from "../../../UI/Input/Input";

function PopUpNewCar() {
  const [carData, setCarData] = useState({
    numberCar: "",
    markCar: "",
    typeCar: 0,
    heightCar: 0,
    widthCar: 0,
    lengthCar: 0,
    volumecare: 0,
    loadCapacity: 0,
    numberOfPallet: 0,
  });
  return (
    <PopUpContainer title={"Новый авто"} mT={200}>
      <div className={styles.newCarInnew}>
        <Input Textlabel={"Марка авто:"} />
        <Input Textlabel={"Номер авто:"} />
        <Input Textlabel={"Тип авто:"} />
        <div className={styles.type1}>
          <Input Textlabel={"Длина, м:"} />
          <Input Textlabel={"Ширина, м:"} />
          <Input Textlabel={"Высота, м:"} />
          <Input Textlabel={"Объем, м3:"} />
        </div>
        <div className={styles.type2}>
          <Input Textlabel={"Грузоподъемность, т:"} />
          <Input Textlabel={"Количество палет:"} />
        </div>
        <div className={styles.button}>
          <button className={styles.buttonSave}>Добавить</button>
        </div>
      </div>
    </PopUpContainer>
  );
}

export default PopUpNewCar;
