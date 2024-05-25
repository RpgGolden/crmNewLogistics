import React, { useEffect, useState } from "react";
import styles from "./FunctionTableTop.module.scss";
import List from "../../UI/List/List";
import Input from "../../UI/Input/Input";
import DataContext from "../../context";
import { testData } from "../../DataApi";
import { apiGetAllOrders, getAllCustomers, getAllDriver } from "../../API/API";

function FunctionTableTop(props) {
  const defaultValue = "Заказы";
  const { context } = React.useContext(DataContext);
  const [textSearchTableData, settextSearchTableData] = useState("");
  const ud = JSON.parse(localStorage.getItem("userData"));

  const dataList =
    ud.role === "DRIVER"
      ? [
          {
            id: 1,
            name: "Заказы",
          },
          {
            id: 2,
            name: "Машины",
          },
        ]
      : [
          {
            id: 1,
            name: "Заказы",
          },
          {
            id: 2,
            name: "Клиенты",
          },
          {
            id: 3,
            name: "Водители",
          },
          {
            id: 4,
            name: "Машины",
          },
        ];

  const filteredData = (searchText) => {
    let tableData = [];
    if (context.selectedTable === "Клиенты") {
      tableData = context.dataClients;
    }
    if (context.selectedTable === "Заказы") {
      tableData = context.dataAppoints;
    }
    if (context.selectedTable === "Водители") {
      tableData = context.dataDrivers;
    }
    const filteredData = tableData.filter((item) => {
      for (let key in item) {
        if (
          typeof item[key] === "string" &&
          item[key].toLowerCase().includes(searchText.toLowerCase())
        ) {
          return true;
        }
      }
      return false;
    });
    context.setTableData(filteredData);
  };

  useEffect(() => {
    if (textSearchTableData) {
      filteredData(textSearchTableData);
    } else {
      context.setTableData(testData);
    }
  }, [textSearchTableData]);

  useEffect(() => {
    console.log("Срабтал юз эфект");
    context.updateDataTable();
  }, []);

  useEffect(() => {
    if (textSearchTableData) {
      filteredData(textSearchTableData);
    } else {
      if (context.selectedTable === "Клиенты") {
        context.setTableData([...context.dataClients]);
      }
      if (context.selectedTable === "Водители") {
        context.setTableData([...context.dataDrivers]);
      }
      if (context.selectedTable === "Заказы") {
        context.setTableData([...context.dataAppoints]);
      }
      console.log(ud);
      if (ud.role === "DRIVER" && context.selectedTable === "Машины") {
        context.setTableData([...context.dataAppoints]);
      }
    }
  }, [textSearchTableData]);

  return (
    <>
      <div className={styles.FunctionTableTop}>
        <div className={styles.container}>
          <List
            data={props.TableName}
            defaultValue={defaultValue}
            dataList={dataList}
          />
          <div className={styles.searchForTable}>
            <Input
              placeholder={"Поиск..."}
              settextSearchTableData={settextSearchTableData}
            />
            <img src="./img/Search_light.png" />
          </div>
          <div className={styles.filterMenu}></div>
        </div>
      </div>
    </>
  );
}

export default FunctionTableTop;
