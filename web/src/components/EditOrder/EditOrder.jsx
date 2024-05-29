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
import {
  apiAddOrder,
  apiGetAllCarsLogistic,
  apiGetAllOrders,
  apiUpdateOrder,
  getAllDriver,
} from "../../API/API";
import { useNavigate } from "react-router-dom";
import EditForm from "./EditForm";
const markerIcon = new L.Icon({
  iconUrl: markerIconPng,
  iconSize: [25, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const EditOredr = () => {
  const { orderCon, context } = React.useContext(DataContext);

  const [center, setCenter] = useState([47.222531, 39.718705]);
  const [cardData, setCardData] = useState([]);
  const [adressA, setAdressA] = useState("");
  const [adressB, setAdressB] = useState("");
  const [pointCoor, setpointCoor] = useState([]); //! местки

  const [isChackIsp, setisChackIsp] = useState(false);
  const [isChackKl, setisChackKl] = useState(false);

  //! сохраняем заказ
  const navigate = useNavigate();

  const [tarif, setTarif] = useState({
    klHors: 1000,
    klKm: 25,
    ispHors: 400,
    ispKm: 25,
  });

  // useEffect(() => {
  //   setTarif({
  //     klHors: orderCon.orderData?.tarifklHors,
  //     klKm: orderCon.orderData?.tarifklKm,
  //     ispHors: orderCon.orderData?.tarifispHors,
  //     ispKm: orderCon.orderData?.tarifispKm,
  //   });
  // }, [
  //   orderCon.orderData?.tarifklHors,
  //   orderCon.orderData?.tarifklKm,
  //   orderCon.orderData?.tarifispKm,
  // ]);
  // useEffect(() => {
  //   setisChackIsp(orderCon.orderData?.paidIsp);
  //   setisChackKl(orderCon.orderData?.paidKl);
  // }, [orderCon.orderData?.paidIsp, orderCon.orderData?.paidKl]);

  useEffect(() => {
    console.log(context.selectedTr);
    apiGetAllOrders().then((resp) => {
      console.log("Заказы", resp.data);
      const dat = [...resp.data].find((el) => el.id === context.selectedTr);

      if (dat) {
        dat.loading = JSON.parse(dat.loading);
        dat.unloading = JSON.parse(dat.unloading);
        console.log(dat);
        setAdressA(dat.loading.adress);
        setAdressB(dat.unloading.adress);
        setpointCoor([dat.loading?.geo, dat.unloading?.geo]);
        orderCon.setOrderData({ ...dat });

        // setTarif({
        //   klHors: orderCon.orderData?.tarifklHors,
        //   klKm: orderCon.orderData?.tarifklKm,
        //   ispHors: orderCon.orderData?.tarifispHors,
        //   ispKm: orderCon.orderData?.tarifispKm,
        // });
        // setisChackIsp(orderCon.orderData?.paidIsp);
        // setisChackKl(orderCon.orderData?.paidKl);
      }
    });
  }, []);

  //! сохранить заказ
  const saveClick = () => {
    const md = { ...orderCon.orderData };

    const datareq = {};
    if (md.loading.geo) {
      datareq.loading = JSON.stringify({
        adress: adressA,
        geo: [md.loading.geo[0], md.loading.geo[1]],
      });
    } else {
      alert("Заполните поле Загрузки");
      return;
    }
    if (md.unloading.geo) {
      datareq.unloading = JSON.stringify({
        adress: adressB,
        geo: [md.unloading.geo[0], md.unloading.geo[1]],
      });
    } else {
      alert("Заполните поле Разгрузки");
      return;
    }
    if (context.selectedTr) {
      if (md.dateBegin && md.dateEnd) {
        datareq.dateBegin = md.dateBegin;
        datareq.dateEnd = md.dateEnd;
      } else {
        alert("Заполните период выполнения");
        return;
      }
    } else {
      if (md.dateBegin.data && md.dateBegin.time) {
        datareq.dateBegin = `${md.dateBegin.data} ${md.dateBegin.time}`;
      } else {
        alert("Заполните период выполнения");
        return;
      }
      if (md.dateEnd.data && md.dateEnd.time) {
        datareq.dateEnd = `${md.dateEnd.data} ${md.dateEnd.time}`;
      } else {
        alert("Заполните период выполнения");
        return;
      }
    }

    datareq.places = Number(md.places);
    datareq.weight = Number(md.weight);
    datareq.volume = Number(md.volume);
    datareq.price = Number(md.price);
    datareq.salary = Number(summZakaz.isp);
    datareq.km = Number((route.summary.totalDistance / 1000).toFixed(2));

    datareq.customerId = md.customer.id;
    datareq.driverId = md.driver.id;
    datareq.carId = md.car.id;
    datareq.typeCargo = md.typeCargo;
    datareq.numberOrder = orderCon.orderData.length
      ? orderCon.orderData.length
      : 1;

    datareq.tarifklHors = md.tarifklHors;
    datareq.tarifklKm = md.tarifklKm;
    datareq.tarifispHors = md.tarifispHors;
    datareq.tarifispKm = md.tarifispKm;

    datareq.paidIsp = md.paidIsp;
    datareq.paidKl = md.paidKl;

    console.log(datareq);

    if (context.selectedTr) {
      apiUpdateOrder(datareq, md.id).then((resp) => {
        console.log(resp);
        if (resp?.status === 200) {
          orderCon.setOrderData({ ...orderCon.orderObj });
          navigate("..");
        }
      });
    } else {
      apiAddOrder(datareq).then((resp) => {
        console.log(resp);
        if (resp?.status === 200) {
          orderCon.setOrderData({ ...orderCon.orderObj });
          navigate("..");
        }
      });
    }
    context.setpopUp("");
  };

  //! функция опредления положения меток на карте
  const rendPlaysmark = (coordinates, key) => {
    let mass = [...pointCoor];
    mass[key] = [...coordinates];
    setpointCoor(mass);
    setCenter([...coordinates]);
  };

  const rotPan = useRef(null);
  useEffect(() => {
    if (rotPan.current) {
      rotPan.current.state.set("from", [47.222531, 39.718705]);
      rotPan.current.state.set("to", [47.20958, 38.935194]);
    }
  }, [rotPan, pointCoor]);

  const handleInput = (el, key) => {
    const query = el.target.value;
    let date = { ...orderCon.orderData };
    console.log("e", query, key);
    date[key] = query;

    if (
      route &&
      (key === "tarifklHors" ||
        key === "tarifklKm" ||
        key === "tarifispHors" ||
        key === "tarifispKm" ||
        key === "price" ||
        key === "km")
    ) {
      funPrice({ ...date });
    } else {
      orderCon.setOrderData({ ...date });
    }
  };

  const funsetisChack = (key, value) => {
    let date = { ...orderCon.orderData };
    date[key] = value;
    orderCon.setOrderData({ ...date });
  };

  useEffect(() => {
    const inputs = document.querySelectorAll(".react-dadata__input");
    inputs[0].placeholder = adressA ? adressA : "Загрузка";
    inputs[1].placeholder = adressB ? adressB : "Разгрузка";
    // Установить placeholder для каждого элемента
  }, [adressA, adressB]);

  const funSetAddress = (e) => {
    if (e.data.geo_lat) {
      const coor = [e.data.geo_lat, e.data.geo_lon];
      rendPlaysmark([...coor], 0);
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
      rendPlaysmark([...coor], 1);
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
  const [routingControl, setRoutingControl] = useState(null);
  useEffect(() => {
    const fetchRoute = async () => {
      if (pointCoor[0] && pointCoor[1]) {
        const startPoint = L.latLng(pointCoor[0][0], pointCoor[0][1]);
        const endPoint = L.latLng(pointCoor[1][0], pointCoor[1][1]);

        if (routingControl) {
          // Удаляем предыдущий путь
          routingControl.remove();
          setRoutingControl(null);
        }

        const newRoutingControl = L.Routing.control({
          waypoints: [startPoint, endPoint],
          router: L.Routing.osrmv1({
            serviceUrl: "https://router.project-osrm.org/route/v1/",
          }),
        });

        newRoutingControl.on("routesfound", function (e) {
          setRoute(e.routes[0]);
        });

        console.log("mapRef.current", mapRef.current);
        if (mapRef.current !== null && mapRef.current !== undefined) {
          // Добавляем новый routingControl на карту
          newRoutingControl.addTo(mapRef.current);
          setRoutingControl(newRoutingControl);
        }
      }
    };

    if (mapRef && pointCoor.length === 2) {
      fetchRoute();
    }
  }, [map, pointCoor]);

  useEffect(() => {
    const attributionControl = document.querySelector(
      ".leaflet-control-attribution.leaflet-control"
    );
    if (attributionControl) {
      attributionControl.style.display = "none";
    }
  }, [mapRef]);

  const [summZakaz, setSummZakaz] = useState({
    kl: 0,
    isp: 0,
  });

  const [pribil, setPribil] = useState({
    sum: 0,
    prc: 30,
  });

  //! функция обновления прайса
  const funPrice = (data) => {
    const km = (route.summary.totalDistance / 1000).toFixed(2);
    const hours = (route.summary.totalTime / 60 / 60).toFixed(2);
    let sz = { ...summZakaz };
    // sz.kl = hours * tarif.klHors + km * tarif.klKm;
    sz.kl = hours * data?.tarifklHors + km * data?.tarifklKm;
    // sz.isp = hours * tarif.ispHors + km * tarif.ispKm;
    sz.isp = hours * data?.tarifispHors + km * data?.tarifispKm;
    console.log("Sz", sz, data?.tarifklHors);
    let prib = { ...pribil };
    prib.sum = (sz.kl - sz.isp).toFixed(2);
    prib.prc = (prib.sum / (sz.kl / 100)).toFixed(2);
    setSummZakaz(sz);
    setPribil(prib);
    const md = { ...data };
    md.price = sz.kl;
    orderCon.setOrderData(md);
    console.log(md);
  };
  useEffect(() => {
    if (route) {
      funPrice({ ...orderCon.orderData });
    }
  }, [route]);

  // const funSetTarif = (el, key) => {
  //   let tr = { ...tarif };
  //   if (Number(el.target.value)) {
  //     tr[key] = Number(el.target.value);
  //   } else {
  //     tr[key] = 0;
  //   }
  //   setTarif(tr);
  // };

  const funSetSumZakaz = (el, key) => {
    let tr = { ...summZakaz };
    if (Number(el.target.value)) {
      tr[key] = Number(el.target.value);
    } else {
      tr[key] = 0;
    }
    setSummZakaz(tr);
  };

  // useEffect(() => {
  //   console.log("c", center);
  // }, [center]);

  const typeCar = {
    1: "Тентовый 5т",
    2: "Контейнер",
    3: "Микро автобус",
    4: "Газель 6м",
    5: "Еврофура 82м",
  };

  const [editForm, setEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({ type: null, data: [] });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const editData = (el, type) => {
    console.log(el);
    setPosition({ x: el.pageY, y: el.pageX - 150 });
    setEditForm(!editForm);
    if (type === "car") {
      apiGetAllCarsLogistic().then((resp) => {
        if (resp) {
          console.log("Машины", resp.data);
          setEditFormData({ type: type, data: resp.data });
        }
      });
    }
    if (type === "driver") {
      getAllDriver().then((response) => {
        if (response) {
          const dataTable = response.data.map((driver) => ({
            ...driver,
            id: driver.id,
            fio: `${driver.name} ${driver.surname} ${driver.patronymic}`,
          }));
          console.log(dataTable);

          setEditFormData({ type: type, data: dataTable });
        }
      });
    }
  };
  const liClick = (item) => {
    console.log(item);
    const md = { ...orderCon.orderData };
    md[editFormData.type] = editFormData.data.find((el) => el.id === item.id);
    orderCon.setOrderData(md);
    setEditFormData({ type: null, data: [] });
    setEditForm(false);
  };
  return (
    <div>
      <HeadMenu state={"register"} />

      <div className={styles.EditPatient}>
        {editForm && (
          <EditForm
            liClick={liClick}
            position={position}
            dataList={editFormData}
          />
        )}
        <div>
          <h1>Редактирование заказа</h1>
          <div className={styles.data_container}>
            <div className={styles.driverCar}>
              <ClientForm
                editData={editData}
                handleInput={handleInput}
                orderCon={orderCon}
              />
              <div className={styles.centerbox}>
                <p>Заказ</p>
                <label>Тип транспорта</label>
                <input
                  type="text"
                  style={{ backgroundColor: "#eee" }}
                  readOnly
                  placeholder="Тип транспорта"
                  onChange={(el) => handleInput(el, "сarType")}
                  value={typeCar[orderCon.orderData?.car?.typeCar]}
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
                  value={
                    orderCon.orderData?.dateBegin &&
                    (typeof orderCon.orderData.dateBegin === "object"
                      ? `с ${orderCon.orderData.dateBegin.data} по ${orderCon.orderData.dateEnd.data}`
                      : `с ${orderCon.orderData.dateBegin} по ${orderCon.orderData.dateEnd}`)
                  }
                />
              </div>
            </div>
            <div className={styles.driverCar}>
              <GruzForm handleInput={handleInput} orderCon={orderCon} />
              <DriverForm
                editData={editData}
                handleInput={handleInput}
                orderCon={orderCon}
              />
            </div>

            <div className={styles.driverCar}>
              <CarForm
                editData={editData}
                handleInput={handleInput}
                orderCon={orderCon}
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
                            onChange={(el) => {
                              // funSetTarif(el, "klHors");
                              handleInput(el, "tarifklHors");
                            }}
                            value={orderCon.orderData.tarifklHors}
                            // value={tarif.klHors}
                          />
                          1 км
                          <input
                            type="text"
                            onChange={(el) => {
                              // funSetTarif(el, "tarifklKm");
                              handleInput(el, "tarifklKm");
                            }}
                            value={orderCon.orderData.tarifklKm}
                            // value={tarif.klKm}
                          />
                        </div>
                      </div>
                      <div className={styles.tarif_inner_box}>
                        <h4>Исполнитель</h4>
                        <div className={styles.input_box}>
                          1 час
                          <input
                            type="text"
                            onChange={(el) => {
                              // funSetTarif(el, "ispHors");
                              handleInput(el, "tarifispHors");
                            }}
                            value={orderCon.orderData.tarifispHors}
                            // value={tarif.ispHors}
                          />
                          1 км
                          <input
                            type="text"
                            onChange={(el) => {
                              // funSetTarif(el, "ispKm");
                              handleInput(el, "tarifispKm");
                            }}
                            value={orderCon.orderData.tarifispKm}
                            // value={tarif.ispKm}
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
                            <input
                              onChange={() =>
                                funsetisChack(
                                  "paidKl",
                                  !orderCon.orderData?.paidKl
                                )
                              }
                              type="checkbox"
                              checked={orderCon.orderData?.paidKl}
                            />
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
                            <input
                              type="checkbox"
                              checked={orderCon.orderData?.paidIsp}
                              onChange={() =>
                                funsetisChack(
                                  "paidIsp",
                                  !orderCon.orderData?.paidIsp
                                )
                              }
                            />
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
