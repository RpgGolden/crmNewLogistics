import Authorization from "./pages/Login/Authorization/Authorization";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
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

function App() {
  const [tableData, setTableData] = useState(testData); // данные таблицы
  const [selectedTr, setSelectedTr] = useState(null); // выбранная строка
  const [selectedTable, setSelectedTable] = useState("Заказы"); // выбранная таблица
  const [searchDataForTable, setsearchDataForTable] = useState(" "); // поиск по таблице

  const [popUp, setpopUp] = useState("");
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
  };

  const [carTableData, setCarTableData] = useState([]); // таблиычные данные всех машин у diver
  const [ordersTableData, setOrdersTableData] = useState([]); // таблиычные данные всех машин у diver
  const drivCon = {
    carTableData,
    setCarTableData,
    ordersTableData,
    setOrdersTableData,
  };
  return (
    <DataContext.Provider
      value={{
        context,
        drivCon,
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
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </DataContext.Provider>
  );
}

export default App;
