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
  const [dataAppoint, setdataAppoint] = useState([])
  const [dataClient, setdataClient] = useState([])
  const [dataDriver, setdataDriver] = useState([])
  const dataList = [
    {
        id:1,
        name:"Заказы"
    },
    {
        id:2,
        name:"Клиенты"
    },
    {
        id:3,
        name:"Водители"
    }

  ]
  const filteredData = (searchText) => {
    let tableData = [];
    if (context.selectedTable === "Клиенты"){tableData=dataClient}
    if (context.selectedTable === "Заказы"){tableData=dataAppoint}
    if (context.selectedTable === "Водители"){tableData=dataDriver}
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

  useEffect(()=>{
    getAllCustomers().then((response) => {
      if (response) {
        // context.setTableData(response.data);
        setdataClient(response.data)
      }
    });
    getAllDriver().then((response) => {
      if (response) {
        const dataTable = response.data.map((driver) => ({
          id: driver.id,
          fio: `${driver.name} ${driver.surname} ${driver.patronymic}`,
        }));
        // context.setTableData(dataTable);
        setdataDriver(dataTable)
      }
    });
    apiGetAllOrders().then((response) => {
      if (response) {
        // context.setTableData(response.data);
        setdataAppoint(response.data)
      }
    });
  },[])

  useEffect(() => {
    if (textSearchTableData) {
      filteredData(textSearchTableData);
    } else {
      if (context.selectedTable === "Клиенты") {
        context.setTableData(dataClient);
        // getAllCustomers().then((response) => {
        //   if (response) {
        //     context.setTableData(response.data);
        //     setdataClient(response.data)
        //   }
        // });

      }
      if (context.selectedTable === "Водители") {
        context.setTableData(dataDriver)
        // getAllDriver().then((response) => {
        //   if (response) {
        //     const dataTable = response.data.map((driver) => ({
        //       id: driver.id,
        //       fio: `${driver.name} ${driver.surname} ${driver.patronymic}`,
        //     }));
        //     context.setTableData(dataTable);
        //     setdataDriver(dataTable)
        //   }
        // });
      }
      if (context.selectedTable === "Заказы") {
        context.setTableData(dataAppoint)
        // apiGetAllOrders().then((response) => {
        //   if (response) {
        //     context.setTableData(response.data);
        //     setdataAppoint(response.data)
        //   }
        // });
      
      }
    }
  }, [textSearchTableData]);

  return (
    <>
      <div className={styles.FunctionTableTop}>
        <div className={styles.container}>
          <List data={props.TableName} defaultValue={defaultValue} dataList={dataList}/>
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
