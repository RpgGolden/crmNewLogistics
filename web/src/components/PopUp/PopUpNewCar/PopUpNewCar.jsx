import React, { useEffect, useState } from "react";
import styles from "./PopUpNewCar.module.scss";
import PopUpContainer from "../../../UI/PopUpContainer/PopUpContainer";
import axios from "axios";
import Input from "./InputNewCar/Input";
import DataContext from "../../../context";
import { apiAddCar, getProfileDriver } from "../../../API/API";

function PopUpNewCar() {
  const { context } = React.useContext(DataContext);

  const onChangeInput = (e, inputKey) => {
    const value = e.target.value;
    let cd = { ...context.carData };
    if (inputKey === "numberCar") {
      if ([...value].length <= 9) cd[inputKey] = value.toUpperCase();
    } else if (
      inputKey === "heightCar" ||
      inputKey === "lengthCar" ||
      inputKey === "loadCapacity" ||
      inputKey === "numberOfPallet" ||
      inputKey === "volumeCar" ||
      inputKey === "widthCar" ||
      inputKey === "typeCar"
    ) {
      cd[inputKey] = Number(value);
    } else {
      cd[inputKey] = value;
    }
    context.setCarData(cd);
  };

  const clickAddCar = () => {
    getProfileDriver().then((response) => {
      const ud = JSON.parse(localStorage.getItem("userData"));
      console.log(ud);
      apiAddCar(
        ud.role === "ADMINISTRATOR"
          ? { ...context.carData, driverId: null }
          : { ...context.carData, driverId: response.data.id }
      ).then((resp) => {
        console.log("response", resp);
        if (resp?.status === 200) {
          context.setpopUp("");
          context.setCarData({
            numberCar: null,
            markCar: null,
            typeCar: null,
            heightCar: null,
            widthCar: null,
            lengthCar: null,
            volumeCar: null,
            loadCapacity: null,
            numberOfPallet: null,
            driverId: null,
          });
        }
      });
    });
  };

  useEffect(() => {
    // Отправить запрос к бесплатному API
    axios(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/truck?format=json"
    )
      .then((response) => {
        console.log(response.data);
        // Сохранить список марок авто в состоянии
        context.setBrands(response.data.Results.map((brand) => brand.MakeName));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          placeholder={"A000AA000"}
          itemKey={"numberCar"}
          value={context.carData.numberCar}
          onChangeInput={onChangeInput}
        />
        <Input
          placeholder="1"
          Textlabel={"Тип авто:"}
          value={context.carData.markCtypeCarar}
          itemKey={"typeCar"}
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
            itemKey={"volumeCar"}
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
          <button className={styles.buttonSave} onClick={clickAddCar}>
            Добавить
          </button>
        </div>
      </div>
    </PopUpContainer>
  );
}

export default PopUpNewCar;
