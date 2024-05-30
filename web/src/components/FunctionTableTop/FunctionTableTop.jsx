import React, { useEffect, useState } from "react";
import styles from "./FunctionTableTop.module.scss";
import List from "../../UI/List/List";
import Input from "../../UI/Input/Input";
import DataContext from "../../context";
import { testData } from "../../DataApi";
import {
  apiGetAllCar,
  apiGetAllOrders,
  apiGetAllOrdersDriver,
  getAllCustomers,
  getAllDriver,
  getProfileDriver,
} from "../../API/API";
import { tableHeadAppoint } from "../TableDriverPage/Data";

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
    if (context.selectedTable === "Клиенты" && ud.role != "DRIVER") {
      tableData = context.dataClients;
    }
    if (context.selectedTable === "Заказы" && ud.role != "DRIVER") {
      tableData = context.dataAppoints;
    }
    if (context.selectedTable === "Водители" && ud.role != "DRIVER") {
      tableData = context.dataDrivers;
    }
    if (context.selectedTable === "Машины" && ud.role != "DRIVER") {
      tableData = context.dataCar;
    }

    if (context.selectedTable === "Заказы" && ud.role === "DRIVER") {
      getProfileDriver().then((response) => {
        apiGetAllOrdersDriver(response.data?.id).then((data) => {
          console.log("заказы", data.data);
          tableData = data.data;
        });
      });
    }
    if (ud.role === "DRIVER" && context.selectedTable === "Машины") {
      getProfileDriver().then((response) => {
        apiGetAllCar(response.data?.id).then((resp) => {
          if (resp) {
            // console.log("Машины", resp.data);
            const type = {
              1: "Тентовый 5т",
              2: "Контейнер",
              3: "Микро автобус",
              4: "Газель 6м",
              5: "Еврофура 82м",
            };
            let cd = [...resp.data];
            cd.map((item) => {
              item.typeCar = type[Number(item.typeCar)];
            });
            tableData = cd;
            // console.log("cd", cd);

            const filteredData = tableData.filter((item) => {
              for (let key in item) {
                if (
                  key !== "id" &&
                  (item[key] + "")
                    .toLowerCase()
                    .includes((searchText + "").toLowerCase())
                ) {
                  return true;
                }
              }
              return false;
            });
            console.log("filteredData", filteredData);
            context.setTableData(filteredData);
          }
        });
      });
    }

    console.log("tableData", tableData);
    const filteredData = tableData.filter((item) => {
      for (let key in item) {
        if (
          key !== "id" &&
          (item[key] + "")
            .toLowerCase()
            .includes((searchText + "").toLowerCase())
        ) {
          return true;
        }
      }
      return false;
    });
    console.log("filteredData", filteredData);
    context.setTableData(filteredData);
  };

  useEffect(() => {
    context.updateDataTable();
  }, []);

  useEffect(() => {
    if (textSearchTableData) {
      filteredData(textSearchTableData);
    } else {
      if (context.selectedTable === "Клиенты" && ud.role != "DRIVER") {
        context.setTableData([...context.dataClients]);
      }
      if (context.selectedTable === "Водители" && ud.role != "DRIVER") {
        context.setTableData([...context.dataDrivers]);
      }
      if (context.selectedTable === "Заказы" && ud.role != "DRIVER") {
        context.setTableData([...context.dataAppoints]);
      }
      if (context.selectedTable === "Машины" && ud.role != "DRIVER") {
        context.setTableData([...context.dataCar]);
      }

      if (ud.role === "DRIVER" && context.selectedTable === "Машины") {
        getProfileDriver().then((response) => {
          apiGetAllCar(response.data.id).then((resp) => {
            if (resp) {
              const type = {
                1: "Тентовый 5т",
                2: "Контейнер",
                3: "Микро автобус",
                4: "Газель 6м",
                5: "Еврофура 82м",
              };

              let cd = [...resp.data];
              cd.map((item) => {
                item.typeCar = type[Number(item.typeCar)];
              });
              context.setTableData(cd);
            }
          });
        });
      }
      if (context.selectedTable === "Заказы" && ud.role === "DRIVER") {
        getProfileDriver().then((response) => {
          apiGetAllOrdersDriver(response.data?.id).then((resp) => {
            const dat = [...resp.data];
            dat.map((item) => {
              item.car = item.car?.markCar;
              item.customer = item.customer.fio;
              if (item.driver !== null) {
                item.driver = `${item.driver.surname} ${item.driver.name} ${item.driver.patronymic}`;
              }
              item.loading = JSON.parse(item.loading).adress;
              item.unloading = JSON.parse(item.unloading).adress;
            });
            context.setTableData(dat);
          });
        });
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
