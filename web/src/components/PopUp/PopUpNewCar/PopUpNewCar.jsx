import React, { useState } from "react";
import styles from "./PopUpNewCar.module.scss";
import PopUpContainer from "../../../UI/PopUpContainer/PopUpContainer";
import Input from "../../../UI/Input/Input";
import DataContext from "../../../context";

function PopUpNewCar() {
  const { context } = React.useContext(DataContext);

  const onChangeInput = (e, inputKey) => {
    console.log(inputKey);
    const value = e.target.value;
    let cd = { ...context.carData };
    cd[inputKey] = value;
    context.setCarData(cd);
  };

  return (
    <PopUpContainer title={"Новый авто"} mT={200}>
      <div className={styles.newCarInnew}>
        <Input
          Textlabel={"Марка авто:"}
          value={context.carData.markCar}
          itemKey={"markCar"}
          onChangeInput={onChangeInput}
        />

        <Input
          Textlabel={"Номер авто:"}
          itemKey={"numberCar"}
          value={context.carData.numberCar}
          onChangeInput={onChangeInput}
        />
        <Input
          Textlabel={"Тип авто:"}
          value={context.carData.markCtypeCarar}
          itemKey={"markCtypeCarar"}
          onChangeInput={onChangeInput}
        />
        <div className={styles.type1}>
          <Input
            Textlabel={"Длина, м:"}
            itemKey={"lengthCar"}
            value={context.carData.lengthCar}
            onChangeInput={onChangeInput}
          />
          <Input
            Textlabel={"Ширина, м:"}
            value={context.carData.widthCar}
            itemKey={"widthCar"}
            onChangeInput={onChangeInput}
          />
          <Input
            Textlabel={"Высота, м:"}
            value={context.carData.heightCar}
            itemKey={"heightCar"}
            onChangeInput={onChangeInput}
          />
          <Input
            Textlabel={"Объем, м3:"}
            value={context.carData.volumecare}
            itemKey={"volumecare"}
            onChangeInput={onChangeInput}
          />
        </div>
        <div className={styles.type2}>
          <Input
            Textlabel={"Грузоподъемность, т:"}
            value={context.carData.loadCapacity}
            itemKey={"loadCapacity"}
            onChangeInput={onChangeInput}
          />
          <Input
            Textlabel={"Количество палет:"}
            value={context.carData.numberOfPallet}
            itemKey={"numberOfPallet"}
            onChangeInput={onChangeInput}
          />
        </div>
        <div className={styles.button}>
          <button className={styles.buttonSave}>Добавить</button>
        </div>
      </div>
    </PopUpContainer>
  );
}

export default PopUpNewCar;
