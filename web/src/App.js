import Authorization from "./pages/Login/Authorization/Authorization";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Register from "./pages/Login/Register/Register";
import HomePage from "./pages/AdminPages/HomePage/AdminPage";
import DataContext from "./context";
import { testData } from "./DataApi";
import "./styles/style.css";
import EditOredr from "./components/EditOrder/EditOrder";
import HomePageAdmin from "./pages/AdminPages/HomePageAdmin/HomePageAdmin";
import AdminPage from "./pages/AdminPages/HomePage/AdminPage";
import DriverPage from "./pages/DriverPage/HomePage/DriverPage";
import HomePageDriver from "./pages/DriverPage/HomePageDriver/HomePageDriver";
import AccounDriver from "./components/AccounDriver/AccounDriver";
import {
  apiGetAllCar,
  apiGetAllCarsLogistic,
  apiGetAllOrders,
  getAllCustomers,
  getAllDriver,
  getProfileDriver,
} from "./API/API";
import { tableHeadAppoint } from "./components/Table/Data";

function App() {
  const [tableData, setTableData] = useState([]); // данные таблицы
  const [selectedTr, setSelectedTr] = useState(null); // выбранная строка
  const [selectedTable, setSelectedTable] = useState("Заказы"); // выбранная таблица
  const [searchDataForTable, setsearchDataForTable] = useState(" "); // поиск по таблице
  const [brands, setBrands] = useState([]);
  const [popUp, setpopUp] = useState("");
  const [tableHeader, settableHeader] = useState(tableHeadAppoint);

  const ud = JSON.parse(localStorage.getItem("userData"));
  const [carData, setCarData] = useState({
    numberCar: null,
    markCar: null,
    typeCar: null,
    heightCar: null,
    widthCar: null,
    lengthCar: null,
    volumeCar: null,
    loadCapacity: null,
    numberOfPallet: null,
  });
  const [dataAppoints, setdataAppoint] = useState([]);
  const [dataClients, setdataClient] = useState([]);
  const [dataDrivers, setdataDriver] = useState([]);
  const [dataCar, setdataCar] = useState([]);
  const [dataCarDriver, setdataCarDriver] = useState([]);

  const updateDataTable = () => {
    console.log("Update");
    getAllCustomers().then((response) => {
      if (response) {
        setdataClient(response.data);
      }
    });
    getAllDriver().then((response) => {
      if (response) {
        const dataTable = response.data.map((driver) => ({
          ...driver,
          id: driver.id,
          fio: `${driver.name} ${driver.surname} ${driver.patronymic}`,
        }));
        setdataDriver(dataTable);
      }
    });
    apiGetAllOrders().then((resp) => {
      if (resp) {
        const dat = [...resp.data];
        dat.map((item) => {
          item.car = item.car.markCar;
          item.customer = item.customer.fio;
          item.driver = `${item.driver.surname} ${item.driver.name} ${item.driver.patronymic}`;
          item.loading = JSON.parse(item.loading).adress;
          item.unloading = JSON.parse(item.unloading).adress;
        });
        setdataAppoint(dat);
        settableHeader(tableHeadAppoint);
      }
    });
    apiGetAllCarsLogistic().then((response) => {
      setdataCar(response.data);
    });
    if (ud.role === "DRIVER") {
      getProfileDriver().then((response) => {
        apiGetAllCar(response.data.id).then((resp) => {
          if (resp) {
            setdataCarDriver(resp.data);
          }
        });
      });
    }
  };

  useEffect(() => {
    console.log(selectedTr);
  }, [selectedTr]);

  const context = {
    tableData,
    setTableData,
    selectedTr,
    setSelectedTr,
    setpopUp,
    popUp,
    selectedTable,
    setSelectedTable,
    setsearchDataForTable,
    searchDataForTable,
    setCarData,
    carData,
    brands,
    setBrands,
    updateDataTable,
    dataAppoints,
    dataClients,
    dataDrivers,
    dataCar,
    dataCarDriver,
    tableHeader,
    settableHeader,
  };

  const [carTableData, setCarTableData] = useState([]); // таблиычные данные всех машин у diver
  const [ordersTableData, setOrdersTableData] = useState([]); // таблиычные данные всех машин у diver
  const drivCon = {
    carTableData,
    setCarTableData,
    ordersTableData,
    setOrdersTableData,
  };

  //! данные создания заказа
  const orderObj = {
    customerId: null,
    customer: null,
    driverId: null,
    driver: null,
    carId: null,
    car: null,
    loading: { adress: null, geo: null },
    unloading: { adress: null, geo: null },
    dateBegin: { data: null, time: null },
    dateEnd: { data: null, time: null },
    typeCargo: null,
    places: null,
    weight: null,
    volume: null,
    price: null,
  };

  const [orderData, setOrderData] = useState(orderObj);
  const [drivers, setDrivers] = useState([]);
  const [clients, setClients] = useState([]);
  const [cars, setCars] = useState([]);

  const orderCon = {
    orderObj,
    orderData,
    setOrderData,
    drivers,
    setDrivers,
    clients,
    setClients,
    cars,
    setCars,
  };

  return (
    <DataContext.Provider
      value={{
        context,
        drivCon,
        orderCon,
      }}
    >
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<Authorization />}></Route>
            <Route path="/Register" element={<Register />}></Route>
            <Route path="/AdminPage/*" element={<AdminPage />}>
              <Route path="*" element={<HomePageAdmin />}></Route>
              <Route path="EditOrder" element={<EditOredr />}></Route>
            </Route>
            <Route path="/DriverPage/*" element={<DriverPage />}>
              <Route path="*" element={<HomePageDriver />}></Route>
              <Route path="AccounDriver" element={<AccounDriver />}></Route>
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </DataContext.Provider>
  );
}

export default App;
