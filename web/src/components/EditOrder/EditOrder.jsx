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
import DataContext from "../../context";
import ClientForm from "./ClientForm";
import DriverForm from "./DriverForm";
import CarForm from "./CarForm";
import GruzForm from "./GruzForm";
import { apiAddOrder, getOneDriverData } from "../../API/API";
const markerIcon = new L.Icon({
  iconUrl: markerIconPng,
  iconSize: [25, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const EditOredr = () => {
  const { orderCon } = React.useContext(DataContext);

  const [center, setCenter] = useState([47.222531, 39.718705]);
  const [cardData, setCardData] = useState([]);
  const [adressA, setAdressA] = useState("");
  const [adressB, setAdressB] = useState("");
  const [pointCoor, setpointCoor] = useState([]);
  const [coordinates, setCoordinates] = useState([]);

  //! сохраняем заказ
  const saveClick = () => {
    // getOneDriverData(orderCon.orderData.driverId).then((response) => {
    //   console.log(response);
    //   const md = orderCon.orderData;
    //   md.loading = `{adress: ${md.loading.address}, geo: [${md.loading.geo[0]},${md.loading.geo[1]}]}`;
    //   md.unloading = `{adress: ${md.unloading.address}, geo: [${md.unloading.geo[0]},${md.unloading.geo[1]}]}`;
    //   md.dateBegin = `${md.dateBegin.data} ${md.dateBegin.time}`;
    //   md.dateEnd = `${md.dateEnd.data} ${md.dateEnd.time}`;

    //   apiAddOrder(md).then((resp) => {
    //     console.log(resp.data.id);
    //   });
    // });
    const md = orderCon.orderData;
    md.loading = `{adress: ${md.loading.address}, geo: [${md.loading.geo[0]},${md.loading.geo[1]}]}`;
    md.unloading = `{adress: ${md.unloading.address}, geo: [${md.unloading.geo[0]},${md.unloading.geo[1]}]}`;
    md.dateBegin = `${md.dateBegin.data} ${md.dateBegin.time}`;
    md.dateEnd = `${md.dateEnd.data} ${md.dateEnd.time}`;
    apiAddOrder(md).then((resp) => {
      console.log(resp.data.id);
    });
  };

  useEffect(() => {
    if (coordinates.length > 0) {
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
    if (rotPan.current) {
      rotPan.current.state.set("from", [47.222531, 39.718705]);
      rotPan.current.state.set("to", [47.20958, 38.935194]);
    }
  }, [rotPan, pointCoor]);

  // useEffect(() => {
  //   console.log("pointCoor", pointCoor);
  //   if (rotPan.current) {
  //     console.log("from", rotPan.current.state._data.from);
  //     console.log("to", rotPan.current.state._data.to);
  //   }
  // }, [pointCoor]);

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
    if (e.data.geo_lat) {
      const coor = [e.data.geo_lat, e.data.geo_lon];
      setCoordinates([...coor]);
    }
    if (e.value) {
      setAdressA(e.value);
      const md = { ...orderCon.orderData };
      md.loading.adress = e.value;
      md.loading.geo = [e.data.geo_lat, e.data.geo_lon];
      orderCon.setOrderData(md);
    }
  };
  const funSetAddress2 = (e) => {
    if (e.data.geo_lat) {
      const coor = [e.data.geo_lat, e.data.geo_lon];
      setCoordinates([...coor]);
    }
    if (e.value) {
      setAdressB(e.value);
      const md = { ...orderCon.orderData };
      md.unloading.adress = e.value;
      md.unloading.geo = [e.data.geo_lat, e.data.geo_lon];
      orderCon.setOrderData(md);
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

      const routingControl = L.Routing.control({
        waypoints: [startPoint, endPoint],
        router: L.Routing.osrmv1({
          serviceUrl: "https://router.project-osrm.org/route/v1/",
        }),
      });

      routingControl.on("routesfound", function (e) {
        setRoute(e.routes[0]);
      });
      if (mapRef.current && routingControl) {
        // Добавляем routingControl на карту
        routingControl.addTo(mapRef.current);
      }
    };
    if (mapRef && pointCoor.length === 2) {
      fetchRoute();
    }
  }, [map, pointCoor]);

  // useEffect(() => {
  //   console.log("rout", route);
  // }, [route]);

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
      let sz = { ...summZakaz };
      sz.kl = hours * tarif.klHors + km * tarif.klKm;
      sz.isp = hours * tarif.ispHors + km * tarif.ispKm;
      let prib = { ...pribil };
      prib.sum = (sz.kl - sz.isp).toFixed(2);
      prib.prc = (prib.sum / (sz.kl / 100)).toFixed(2);
      setSummZakaz(sz);
      setPribil(prib);
      const md = { ...orderCon.orderData };
      md.price = prib.sum;
      orderCon.setOrderData(md);
      console.log(md);
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
            <div className={styles.driverCar}>
              <ClientForm handleInput={handleInput} orderCon={orderCon} />
              <div className={styles.centerbox}>
                <p>Заказ</p>
                <label>Тип транспорта</label>
                <input
                  type="text"
                  placeholder="Тип транспорта"
                  onChange={(el) => handleInput(el, "сarType")}
                  value={
                    orderCon.cars.find(
                      (el) => el.id === orderCon.orderData.carId
                    )?.typeCar
                  }
                />
                <label>Загрузка</label>
                <div className={styles.address}>
                  <AddressSuggestions
                    key={"adress"}
                    token="fd4b34d07dd2ceb6237300e7e3d50298509830e0"
                    value={adressA}
                    onChange={funSetAddress}
                  />
                </div>
                <label>Разгрузка</label>
                <div className={styles.address}>
                  <AddressSuggestions
                    key={"adressB"}
                    token="fd4b34d07dd2ceb6237300e7e3d50298509830e0"
                    value={adressB}
                    onChange={funSetAddress2}
                  />
                </div>
                <label>Период выполнения</label>
                <input
                  type="text"
                  placeholder="Период выполнения с ... по ..."
                  onChange={(el) => handleInput(el, "dateBegin")}
                  value={`с ${orderCon.orderData.dateBegin.data} ${orderCon.orderData.dateBegin.time} по ${orderCon.orderData.dateEnd.data} ${orderCon.orderData.dateEnd.time} `}
                />
              </div>
            </div>
            <div className={styles.driverCar}>
              <GruzForm handleInput={handleInput} orderCon={orderCon} />
              <DriverForm handleInput={handleInput} orderCon={orderCon} />
            </div>

            <div className={styles.driverCar}>
              <CarForm handleInput={handleInput} orderCon={orderCon} />
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
          <div className={styles.save}>
            <button onClick={saveClick}>Сохранить</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditOredr;
