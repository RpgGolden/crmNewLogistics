import React, { useEffect, useState } from "react";
import styles from "./PopUpNewAplication.module.scss";
import PopUpContainer from "../../../UI/PopUpContainer/PopUpContainer";
import Input from "../../../UI/Input/Input";
import List from "../../../UI/List/List";
import InputTimeStamp from "../../../UI/InputTimeStamp/InputTimeStamp";
import {
  apiAddOrder,
  apiAetAllCustomers,
  apiGetAllCarsLogistic,
  getAllDriver,
} from "../../../API/API";
import { Link } from "react-router-dom";
import DataContext from "../../../context";

function PopUpNewAplication() {
  const { orderCon, context } = React.useContext(DataContext);
  const [drivers, setdrivers] = useState([]);
  const [clients, setclientss] = useState([]);
  const [carsName, setCarsName] = useState([]);

  const funSetCar = (carId) => {
    return orderCon.cars.find((el) => el.id === carId);
  };

  const funSetDriver = (Id) => {
    return orderCon.drivers.find((el) => el.id === Id);
  };

  const funSetCustomet = (Id) => {
    return orderCon.clients.find((el) => el.id === Id);
  };

  //! поулучаем всех водителей и клиентов и машины
  useEffect(() => {
    getAllDriver().then((response) => {
      console.log("Все водилы", response.data);
      let mass = [];
      response.data.map((item) => {
        mass.push({
          id: item.id,
          name: `${item.surname} ${item.name} ${item.patronymic}`,
        });
      });
      orderCon.setDrivers(response.data);
      setdrivers(mass);
    });
    apiAetAllCustomers().then((response) => {
      console.log("Все клиенты", response.data);
      let mass = [];
      response.data.map((item) => {
        mass.push({
          id: item.id,
          name: item.fio,
        });
      });
      orderCon.setClients(response.data);
      setclientss(mass);
    });

    apiGetAllCarsLogistic().then((response) => {
      console.log("Все машины", response.data);
      let mass = [];
      response.data.map((item) => {
        mass.push({
          id: item.id,
          name: `${item.markCar} ${item.numberCar}`,
        });
      });
      setCarsName(mass);
      orderCon.setCars(response.data);
    });
  }, []);

  const handleInputChange = (itemKey, value) => {
    console.log(itemKey);
    const md = { ...orderCon.orderData };
    if (
      itemKey === "driverId" ||
      itemKey === "customerId" ||
      itemKey === "carId"
    ) {
      md[itemKey] = value.id;
      if (itemKey === "carId") {
        md["car"] = funSetCar(value.id);
      }
      if (itemKey === "driverId") {
        md["driver"] = funSetDriver(value.id);
      }
      if (itemKey === "customerId") {
        md["customer"] = funSetCustomet(value.id);
      }
    } else if (itemKey === "dateBegin" || itemKey === "dateEnd") {
      if ([...value].length > 8) {
        md[itemKey].data = value;
      } else {
        md[itemKey].time = value;
      }
    } else {
      md[itemKey] = value;
    }
    orderCon.setOrderData(md);
  };

  const addAplication = () => {
    console.log("редактировать", orderCon.orderData);
    context.setSelectedTr("");
    // apiAddOrder()
  };

  return (
    <PopUpContainer title={"Создание заказа"} mT={50}>
      <div className={styles.containerInput}>
        <List
          Textlabel={"Клиент"}
          dataList={clients}
          funSetData={handleInputChange}
          itemKey={"customerId"}
        />
        <List
          Textlabel={"Водитель"}
          dataList={drivers}
          funSetData={handleInputChange}
          itemKey={"driverId"}
        />

        <List
          Textlabel={"Машина"}
          dataList={carsName}
          funSetData={handleInputChange}
          itemKey={"carId"}
        />
        <h3>Период выполнения заказа:</h3>
        <InputTimeStamp
          Textlabel="С"
          name="dateBegin"
          margin="20"
          handleInputChange={handleInputChange}
        />
        <InputTimeStamp
          Textlabel="До"
          name="dateEnd"
          margin="10"
          handleInputChange={handleInputChange}
        />
        <h3>Груз:</h3>
        <Input
          Textlabel={"Тип Груза"}
          handleInputChange={handleInputChange}
          name={"typeCargo"}
        />
        <div className={styles.Cargo}>
          <Input
            Textlabel={"Мест:"}
            handleInputChange={handleInputChange}
            name={"places"}
          />
          <Input
            Textlabel={"Вес, т:"}
            handleInputChange={handleInputChange}
            name={"weight"}
          />
          <Input
            Textlabel={"Объем, м3:"}
            handleInputChange={handleInputChange}
            name={"volume"}
          />
        </div>
        <div className={styles.button}>
          <Link to="./EditOrder">
            <button className={styles.buttonSave} onClick={addAplication}>
              Сохранить
            </button>
          </Link>
        </div>
      </div>
    </PopUpContainer>
  );
}

export default PopUpNewAplication;
