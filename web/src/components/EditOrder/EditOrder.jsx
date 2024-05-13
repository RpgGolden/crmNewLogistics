import React, { useEffect, useRef, useState } from "react";
import styles from "./EditOrder.module.scss";
import HeadMenu from "../HeadMenu/HeadMenu";
import axios from "axios";
import {
  YMaps,
  Map,
  GeolocationControl,
  RouteButton,
  SearchControl,
  TrafficControl,
  ZoomControl,
} from "react-yandex-maps";

const EditOredr = () => {
  const [cardData, setCardData] = useState([]);
  const [adress, setAdress] = useState("");

  const handleInput = (el, key) => {
    const query = el.target.value;
    let date = cardData;
    date[key] = query;
    setCardData({ ...date });
  };

  useEffect(() => {
    const longitude = 38.830598; // Замените этими координатами на свои
    const latitude = 47.270719; // Замените этими координатами на свои
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        console.log(response);
        setAdress(
          `${response.data.address.state}, ${response.data.address.suburb}, ${response.data.address.road}, ${response.data.address.house_number}`
        );
      } catch (error) {
        console.log("Error fetching address:", error);
      }
    };
    fetchData();
  }, []);

  const mapState = {
    center: [47.222078, 39.720358],
    zoom: 12,
  };

  const map = useRef(null);

  //изменнение центра карты при клике
  const handleClick = (e, id) => {
    const placemarkCoords = e.get("coords");
    if (map.current) {
      map.current.setCenter(placemarkCoords);
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
                onChange={(el) => handleInput(el, "passport")}
                value={cardData.passport}
              />
            </div>
            <div className={styles.centerbox}>
              <p>Заказ</p>
              <input
                type="text"
                placeholder="Тип транспорта"
                onChange={(el) => handleInput(el, "snils")}
                value={cardData.snils}
              />
              <input
                type="text"
                placeholder="Загрузка"
                onChange={(el) => handleInput(el, "oms")}
                value={cardData.oms}
              />
              <input
                type="text"
                placeholder={adress}
                onChange={(el) => handleInput(el, "phoneNumber")}
                value={cardData.phoneNumber}
              />
              <input
                type="text"
                placeholder="Период выполнения с ... по ..."
                onChange={(el) => handleInput(el, "birthDate")}
                value={cardData.birthDate}
              />
            </div>

            <div className={styles.rightbox}>
              <p>Груз</p>
              <input
                type="text"
                placeholder="Тип груза"
                onChange={(el) => handleInput(el, "snils")}
                value={cardData.snils}
              />
              <input
                type="text"
                placeholder="Мест"
                onChange={(el) => handleInput(el, "oms")}
                value={cardData.oms}
              />
              <input
                type="text"
                placeholder="Вес"
                onChange={(el) => handleInput(el, "phoneNumber")}
                value={cardData.phoneNumber}
              />
              <input
                type="text"
                placeholder="Объем"
                onChange={(el) => handleInput(el, "birthDate")}
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
                    onChange={(el) => handleInput(el, "birthDate")}
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
                        onChange={(el) => handleInput(el, "birthDate")}
                        value={cardData.birthDate}
                      />
                      1 км =
                      <input
                        type="text"
                        placeholder="25р"
                        onChange={(el) => handleInput(el, "birthDate")}
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
                        onChange={(el) => handleInput(el, "birthDate")}
                        value={cardData.birthDate}
                      />
                      1 км =
                      <input
                        type="text"
                        placeholder="25р"
                        onChange={(el) => handleInput(el, "birthDate")}
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
                  onChange={(el) => handleInput(el, "birthDate")}
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
                  onChange={(el) => handleInput(el, "birthDate")}
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
