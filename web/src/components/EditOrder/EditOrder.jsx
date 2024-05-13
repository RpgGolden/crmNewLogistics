import React, { useEffect, useRef, useState } from "react";
import styles from "./EditOrder.module.scss";
import HeadMenu from "../HeadMenu/HeadMenu";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";
import {
  YMaps,
  Map,
  GeolocationControl,
  RouteButton,
  SearchControl,
  TrafficControl,
  ZoomControl,
  Placemark,
  Polyline,
  RoutePanel,
  RouteEditor,
} from "react-yandex-maps";
import { Route } from "react-router-dom";

const EditOredr = () => {
  const [cardData, setCardData] = useState([]);
  const [adressA, setAdressA] = useState("");
  const [adressB, setAdressB] = useState("");
  const [pointCoor, setpointCoor] = useState([]);

  const [coordinates, setCoordinates] = useState([]);
  const map = useRef(null);

  useEffect(() => {
    console.log("coordinates", coordinates);
    if (map.current && coordinates) {
      console.log("coor", coordinates);
      map.current.setCenter([...coordinates]);
      if (pointCoor.length > 0) {
        setpointCoor([...pointCoor, [...coordinates]]);
      } else {
        setpointCoor([[...coordinates]]);
      }
    }
  }, [coordinates]);

  const rotPan = useRef(null);
  useEffect(() => {
    console.log("rotPan", rotPan);
    if (rotPan.current) {
      rotPan.current.state.set("from", [47.222531, 39.718705]);
      rotPan.current.state.set("to", [47.20958, 38.935194]);
    }
  }, [rotPan, pointCoor]);

  useEffect(() => {
    console.log("pointCoor", pointCoor);
    if (rotPan.current) {
      console.log("from", rotPan.current.state._data.from);
      console.log("to", rotPan.current.state._data.to);
    }
  }, [pointCoor]);

  const handleInput = (el, key) => {
    const query = el.target.value;
    let date = cardData;
    date[key] = query;
    setCardData({ ...date });
  };

  useEffect(() => {
    const inputs = document.querySelectorAll(".react-dadata__input");
    // Установить placeholder для каждого элемента
    let text = "Загрузка";
    inputs.forEach((input) => {
      input.placeholder = text; // Текст placeholder
      text = "Разгрузка";
    });
  }, []);

  const mapState = {
    center: [47.222078, 39.720358],
    zoom: 12,
  };

  const funSetAddress = (e) => {
    console.log(e);
    if (e.data.geo_lat) {
      const coor = [e.data.geo_lat, e.data.geo_lon];
      setCoordinates([...coor]);
    }
    if (e.value) {
      setAdressA(e.value);
    }
  };
  const funSetAddress2 = (e) => {
    console.log(e);
    if (e.data.geo_lat) {
      const coor = [e.data.geo_lat, e.data.geo_lon];
      setCoordinates([...coor]);
    }
    if (e.value) {
      setAdressB(e.value);
    }
  };

  return (
    <div>
      <HeadMenu state={"register"} />
      <div className={styles.EditPatient}>
        <div>
          <h1>Редактирование заказа</h1>
          <div className={styles.data_container}>
            <div className={styles.leftbox}>
              <p>Клиент</p>
              <input
                type="text"
                placeholder="Фамилия"
                onChange={(el) => handleInput(el, "surname")}
                value={cardData.surname}
              />
              <input
                type="text"
                placeholder="Имя"
                onChange={(el) => handleInput(el, "name")}
                value={cardData.name}
              />
              <input
                type="text"
                placeholder="Отчество"
                onChange={(el) => handleInput(el, "patronymic")}
                value={cardData.patronymic}
              />
              <input
                type="text"
                placeholder="Телефон"
                onChange={(el) => handleInput(el, "tel")}
                value={cardData.passport}
              />
            </div>
            <div className={styles.centerbox}>
              <p>Заказ</p>
              <input
                type="text"
                placeholder="Тип транспорта"
                onChange={(el) => handleInput(el, "CarType")}
                value={cardData.snils}
              />
              <div className={styles.address}>
                <AddressSuggestions
                  key={"adress"}
                  token="fd4b34d07dd2ceb6237300e7e3d50298509830e0"
                  value={adressA}
                  onChange={funSetAddress}
                />
              </div>
              <div className={styles.address}>
                <AddressSuggestions
                  key={"adressB"}
                  token="fd4b34d07dd2ceb6237300e7e3d50298509830e0"
                  value={adressB}
                  onChange={funSetAddress2}
                />
              </div>

              <input
                type="text"
                placeholder="Период выполнения с ... по ..."
                onChange={(el) => handleInput(el, "period")}
                value={cardData.birthDate}
              />
            </div>

            <div className={styles.rightbox}>
              <p>Груз</p>
              <input
                type="text"
                placeholder="Тип груза"
                onChange={(el) => handleInput(el, "gruz")}
                value={cardData.snils}
              />
              <input
                type="text"
                placeholder="Мест"
                onChange={(el) => handleInput(el, "mest")}
                value={cardData.oms}
              />
              <input
                type="text"
                placeholder="Вес"
                onChange={(el) => handleInput(el, "weigth")}
                value={cardData.phoneNumber}
              />
              <input
                type="text"
                placeholder="Объем"
                onChange={(el) => handleInput(el, "obyom")}
                value={cardData.birthDate}
              />
            </div>
          </div>

          <div className={styles.zakazgrup}>
            <div className={styles.summa}>
              <h2>Расчет стоимости</h2>
              <div className={styles.summa_inner}>
                <div>
                  КМ =
                  <input
                    type="text"
                    placeholder="76"
                    onChange={(el) => handleInput(el, "km")}
                    value={cardData.birthDate}
                  />
                </div>
                <div>
                  <h3>Тарифы</h3>
                  <div>
                    <h4>Клиент</h4>
                    <div>
                      1 час =
                      <input
                        type="text"
                        placeholder="1000р"
                        onChange={(el) => handleInput(el, "priceHoursKlient")}
                        value={cardData.birthDate}
                      />
                      1 км =
                      <input
                        type="text"
                        placeholder="25р"
                        onChange={(el) => handleInput(el, "priceKmKlient")}
                        value={cardData.birthDate}
                      />
                    </div>
                  </div>
                  <div>
                    <h4>Исполнитель</h4>
                    <div>
                      1 час =
                      <input
                        type="text"
                        placeholder="1000р"
                        onChange={(el) => handleInput(el, "birthDateIsp")}
                        value={cardData.birthDate}
                      />
                      1 км =
                      <input
                        type="text"
                        placeholder="25р"
                        onChange={(el) => handleInput(el, "birthDateIsp")}
                        value={cardData.birthDate}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4>Сумма заказа</h4>
                <input
                  type="text"
                  placeholder="250 000"
                  onChange={(el) => handleInput(el, "AllSumm")}
                  value={cardData.birthDate}
                />
                <span>Оплачено</span>
                <input type="checkbox" />
              </div>
              <div>
                <h4>Исполнителю</h4>
                <input
                  type="text"
                  placeholder="100 000"
                  onChange={(el) => handleInput(el, "ispSumm")}
                  value={cardData.birthDate}
                />
                <span>Оплачено</span>
                <input type="checkbox" />
              </div>
              <div>
                <h4>Прибыль</h4>
                <div>110 000 р</div>
                <div>30%</div>
              </div>
            </div>
            <div className={styles.map}>
              <YMaps query={{ apikey: "f3c78576-996b-4eaa-84f8-12a8520d276a" }}>
                <Map
                  instanceRef={map}
                  defaultState={mapState}
                  modules={["templateLayoutFactory", "layout.ImageWithContent"]}
                  style={{ width: "100%", height: "100%" }}
                >
                  <GeolocationControl options={{ float: "right" }} />
                  <RouteButton options={{ float: "right" }} />
                  <SearchControl options={{ float: "right" }} />
                  <TrafficControl options={{ float: "right" }} />
                  <ZoomControl options={{ float: "right" }} />
                  {pointCoor.map((item, index) => (
                    <Placemark key={index} geometry={item} />
                  ))}
                  <RoutePanel
                    instanceRef={rotPan}
                    options={{
                      showRouteMarkers: true, // показывать маркеры начала и конца маршрута
                      showTraffic: true, // показывать информацию о пробках
                      viaPoints: [], // дополнительные точки маршрута (если нужно)
                      routeType: "auto", // тип маршрута: auto, masstransit, pedestrian
                      // и другие опции
                    }}
                  />
                </Map>
              </YMaps>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditOredr;
