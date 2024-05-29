import React, { useEffect, useState } from "react";
import styles from "./PopUpNewCar.module.scss";
import PopUpContainer from "../../../UI/PopUpContainer/PopUpContainer";
import axios from "axios";
import Input from "./InputNewCar/Input";
import DataContext from "../../../context";
import {
  apiAddCar,
  apiGetAllCar,
  getProfileDriver,
  apiGetAllCarsLogistiс,
  apiGetAllCarsLogistic,
  apiUpdateCar,
} from "../../../API/API";

function PopUpNewCar() {
  const { context } = React.useContext(DataContext);

  useEffect(() => {
    console.log(context.selectedTable);
  }, [context.selectedTable]);

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
    const ud = JSON.parse(localStorage.getItem("userData"));
    if (ud.role === "ADMINISTRATOR") {
      apiAddCar({ ...context.carData }).then((resp) => {
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
          apiGetAllCarsLogistic().then((resp) => {
            if (resp) {
              console.log("Машины", resp.data);
              context.setTableData(resp.data);
            }
          });
        }
      });
    } else {
      getProfileDriver().then((response) => {
        const ud = JSON.parse(localStorage.getItem("userData"));
        console.log(ud);
        apiAddCar({ ...context.carData, driverId: response.data.id }).then(
          (resp) => {
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
              getProfileDriver().then((response) => {
                apiGetAllCar(response.data.id).then((resp) => {
                  if (resp) {
                    console.log("Машины", resp.data);
                    context.setTableData(resp.data);
                    
                  }
                });
              });
            }
          }
        );
      });
    }
  };

  const clickeditCar = () => {
    const newObject = { ...context.carData };
    // delete newObject.id;
    apiUpdateCar({ ...newObject }, context.selectedTr).then((resp) => {
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
        apiGetAllCarsLogistic().then((response) => {
          console.log("Все машины", response.data);
          const type = {
            1: "Тентовый 5т",
            2: "Контейнер",
            4: "Микро автобус",
            5: "Газель 6м",
            6: "Еврофура 82м",
          };
  
          let cd = [...response.data];
          cd.map((item) => {
            item.typeCar = type[Number(item.typeCar)];
          });
  
          context.setTableData(cd);
        });
        context.setEditCarData(false);
      }
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
    <PopUpContainer
      title={context.editCarData ? "Редактировать авто" : "Новый авто"}
      mT={200}
    >
      <div className={styles.newCarInnew}>
        <Input
          Textlabel={"Марка авто:"}
          value={context.carData.markCar}
          itemKey={"markCar"}
          onChangeInput={onChangeInput}
          placeholder="Выберите марку авто"
        />

        <Input
          Textlabel={"Номер авто:"}
          placeholder={"A000AA000"}
          itemKey={"numberCar"}
          value={context.carData.numberCar}
          onChangeInput={onChangeInput}
          regex={/^[A-Z]\d{3}[A-Z]{2}\d{3}$/}
        />
        <Input
          placeholder="Выберите тип авто"
          Textlabel={"Тип авто:"}
          value={context.carData.typeCar}
          itemKey={"typeCar"}
          onChangeInput={onChangeInput}
        />

        <div className={styles.type1}>
          <Input
            Textlabel={"Длина, м:"}
            itemKey={"lengthCar"}
            value={context.carData.lengthCar}
            onChangeInput={onChangeInput}
            type="number"
            placeholder="11"
          />
          <Input
            Textlabel={"Ширина, м:"}
            value={context.carData.widthCar}
            itemKey={"widthCar"}
            type="number"
            onChangeInput={onChangeInput}
            placeholder="2.8"
          />
          <Input
            Textlabel={"Высота, м:"}
            value={context.carData.heightCar}
            itemKey={"heightCar"}
            onChangeInput={onChangeInput}
            type="number"
            placeholder="2.5"
          />
          <Input
            Textlabel={"Объем, м3:"}
            value={context.carData.volumeCar}
            itemKey={"volumeCar"}
            onChangeInput={onChangeInput}
            type="number"
            placeholder="30.8"
          />
        </div>
        <div className={styles.type2}>
          <Input
            Textlabel={"Грузоподъемность, т:"}
            value={context.carData.loadCapacity}
            itemKey={"loadCapacity"}
            onChangeInput={onChangeInput}
            type="number"
            placeholder="20"
          />
          <Input
            Textlabel={"Количество палет:"}
            value={context.carData.numberOfPallet}
            itemKey={"numberOfPallet"}
            onChangeInput={onChangeInput}
            type="number"
            placeholder="3"
          />
        </div>
        <div className={styles.button}>
          <button
            className={styles.buttonSave}
            onClick={context.editCarData ? clickeditCar : clickAddCar}
          >
            {context.editCarData ? "Сохранить" : "Добавить"}
          </button>
        </div>
      </div>
    </PopUpContainer>
  );
}

export default PopUpNewCar;
