import React, { useEffect, useRef, useState } from "react";
import styles from "./EditOrder.module.scss";
import HeadMenu from "../HeadMenu/HeadMenu";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import L from "leaflet";

import markerIconPng from "leaflet/dist/images/marker-icon.png";
const markerIcon = new L.Icon({
  iconUrl: markerIconPng,
  iconSize: [25, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const EditOredr = () => {
  const [center, setCenter] = useState([47.222531, 39.718705]);

  const [cardData, setCardData] = useState([]);
  const [adressA, setAdressA] = useState("");
  const [adressB, setAdressB] = useState("");
  const [pointCoor, setpointCoor] = useState([]);

  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    console.log("coordinates", coordinates);
    if (coordinates.length > 0) {
      console.log("coor", coordinates);
      if (pointCoor.length > 0) {
        let mass = [...pointCoor];
        mass.push([...coordinates]);
        setpointCoor(mass);
        setCenter([...coordinates]);
      } else {
        setpointCoor([[...coordinates]]);
        setCenter([...coordinates]);
      }
      setCoordinates([]);
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

  const handleWheelScroll = (event) => {
    const map = mapRef.current.leafletElement;
    const currentZoom = map.getZoom();
    const delta = Math.sign(event.deltaY);
    const newZoom = currentZoom + delta;

    if (newZoom >= 0 && newZoom <= 18) {
      map.flyTo(map.getCenter(), newZoom);
    }
  };

  //! ставим маркеры по координатам
  const renderMarkers = () => {
    return pointCoor.length > 0 ? (
      pointCoor.map((item, index) => (
        <Marker key={index} position={item} icon={markerIcon}>
          <Popup>Маркер на координатах: {item}</Popup>
        </Marker>
      ))
    ) : (
      <Marker position={[51.505, -0.09]} icon={markerIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    );
  };
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (mapRef.current) {
      const leafletMap = mapRef.current.leafletElement;
      setMap(leafletMap);
    }
  }, []);

  const [route, setRoute] = useState(null);
  useEffect(() => {
    const fetchRoute = async () => {
      const startPoint = L.latLng(pointCoor[0][0], pointCoor[0][1]); // Сан-Франциско
      const endPoint = L.latLng(pointCoor[1][0], pointCoor[1][1]); // Сан-Хосе
      console.log("p", startPoint, endPoint);

      const routingControl = L.Routing.control({
        waypoints: [startPoint, endPoint],
        router: L.Routing.osrmv1({
          serviceUrl: "https://router.project-osrm.org/route/v1/",
        }),
      });
      console.log("routingControl", routingControl);

      routingControl.on("routesfound", function (e) {
        setRoute(e.routes[0]);
      });
      if (mapRef.current && routingControl) {
        // Добавляем routingControl на карту
        console.log(mapRef.current);
        routingControl.addTo(mapRef.current);
      }
    };
    if (mapRef && pointCoor.length === 2) {
      fetchRoute();
    }
  }, [map, pointCoor]);

  useEffect(() => {
    console.log("rout", route);
  }, [route]);

  useEffect(() => {
    const attributionControl = document.querySelector(
      ".leaflet-control-attribution.leaflet-control"
    );
    if (attributionControl) {
      attributionControl.style.display = "none";
    }
  }, [mapRef]);

  const [tarif, setTarif] = useState({
    klHors: 1000,
    klKm: 25,
    ispHors: 400,
    ispKm: 25,
  });

  const [summZakaz, setSummZakaz] = useState({
    kl: 0,
    isp: 0,
  });

  const [pribil, setPribil] = useState({
    sum: 0,
    prc: 30,
  });

  useEffect(() => {
    if (route) {
      const km = (route.summary.totalDistance / 1000).toFixed(2);
      const hours = (route.summary.totalTime / 60 / 60).toFixed(2);
      console.log(hours);
      let sz = { ...summZakaz };
      sz.kl = hours * tarif.klHors + km * tarif.klKm;
      sz.isp = hours * tarif.ispHors + km * tarif.ispKm;
      let prib = { ...pribil };
      prib.sum = (sz.kl - sz.isp).toFixed(2);
      prib.prc = (prib.sum / (sz.kl / 100)).toFixed(2);
      setSummZakaz(sz);
      setPribil(prib);
    }
  }, [route, tarif]);

  const funSetTarif = (el, key) => {
    let tr = { ...tarif };
    if (Number(el.target.value)) {
      tr[key] = Number(el.target.value);
    } else {
      tr[key] = 0;
    }
    setTarif(tr);
  };

  const funSetSumZakaz = (el, key) => {
    let tr = { ...summZakaz };
    if (Number(el.target.value)) {
      tr[key] = Number(el.target.value);
    } else {
      tr[key] = 0;
    }
    setSummZakaz(tr);
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
                <div className={styles.put_km}>
                  КМ =
                  <input
                    type="text"
                    placeholder="0"
                    onChange={(el) => handleInput(el, "km")}
                    value={
                      route && (route.summary.totalDistance / 1000).toFixed(2)
                    }
                  />
                </div>
                <div className={styles.tarif}>
                  <h3>Тарифы</h3>
                  <div className={styles.tarif_container}>
                    <div className={styles.tarif_inner}>
                      <div className={styles.tarif_inner_box}>
                        <h4>Клиент</h4>
                        <div className={styles.input_box}>
                          1 час
                          <input
                            type="text"
                            onChange={(el) => funSetTarif(el, "klHors")}
                            value={tarif.klHors}
                          />
                          1 км
                          <input
                            type="text"
                            onChange={(el) => funSetTarif(el, "klKm")}
                            value={tarif.klKm}
                          />
                        </div>
                      </div>
                      <div className={styles.tarif_inner_box}>
                        <h4>Исполнитель</h4>
                        <div className={styles.input_box}>
                          1 час
                          <input
                            type="text"
                            onChange={(el) => funSetTarif(el, "ispHors")}
                            value={tarif.ispHors}
                          />
                          1 км
                          <input
                            type="text"
                            onChange={(el) => funSetTarif(el, "ispKm")}
                            value={tarif.ispKm}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={styles.summ_zakaz_container}>
                      <div className={styles.summ_zakaz}>
                        <h4>Сумма заказа</h4>
                        <div className={styles.summ_zakaz_inner}>
                          <input
                            type="text"
                            onChange={(el) => funSetSumZakaz(el, "kl")}
                            value={summZakaz.kl}
                          />
                          <div className={styles.checkbox}>
                            <span>Оплачено</span>
                            <input type="checkbox" />
                          </div>
                        </div>
                      </div>
                      <div className={styles.ispolnitel_summ}>
                        <h4>Исполнителю</h4>
                        <div className={styles.summ_zakaz_inner}>
                          <input
                            type="text"
                            onChange={(el) => funSetSumZakaz(el, "isp")}
                            value={summZakaz.isp}
                          />
                          <div className={styles.checkbox}>
                            <span>Оплачено</span>
                            <input type="checkbox" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.pribil}>
                <h2>Прибыль</h2>
                <div className={styles.pribil_inner}>
                  <div className={styles.pribil_summ}>{pribil.sum} р</div>
                  <div className={styles.pribil_prch}>{pribil.prc}%</div>
                </div>
              </div>
            </div>
            <div
              className={styles.map}
              style={{ height: "400px", width: "60%" }}
            >
              <MapContainer
                ref={mapRef}
                center={center}
                zoom={10}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={handleWheelScroll}
              >
                <TileLayer
                  attribution=""
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {renderMarkers()}
                {route && (
                  <Polyline
                    pathOptions={{ color: "blue" }}
                    positions={route.coordinates}
                  />
                )}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditOredr;
