import React, { useEffect, useState } from "react";
import styles from "./Table.module.scss";
import { tableHeadAppoint, tableHeadClient, tableHeadDriver } from "./Data";
import DataContext from "../../context";
import {
  apiCreateFile,
  apiGetAllCarsLogistic,
  apiGetAllOrders,
  apiUpdateStatus,
  getAllCustomers,
  getAllDriver,
  getProfileDriver,
} from "../../API/API";
import { tableHeadCar } from "../TableDriverPage/Data";

function Table() {
  const { context } = React.useContext(DataContext);

  const trClick = (row) => {
    context.setSelectedTr(row.id);
  };

  useEffect(() => {
    if (context.selectedTable === "Клиенты") {
      getAllCustomers().then((response) => {
        if (response) {
          context.setTableData(response.data);
          context.settableHeader(tableHeadClient);
        }
      });
    }
    if (context.selectedTable === "Водители") {
      getAllDriver().then((response) => {
        if (response) {
          const dataTable = response.data.map((driver) => ({
            ...driver,
            id: driver.id,
            fio: `${driver.name} ${driver.surname} ${driver.patronymic}`,
          }));
          context.setTableData(dataTable);
          context.settableHeader(tableHeadDriver);
        }
      });
    }
    if (context.selectedTable === "Машины") {
      apiGetAllCarsLogistic().then((response) => {
        console.log("Все машины", response.data);
        const type = {
          1: "Тентовый 5т",
          2: "Контейнер",
          4: "Микро автобус",
          5: "Газель 6м",
          6: "Еврофура 82м",
        };

        let cd = [...response.data];
        cd.map((item) => {
          item.typeCar = type[Number(item.typeCar)];
        });

        context.setTableData(cd);
        context.settableHeader(tableHeadCar);
      });
    }
    if (context.selectedTable === "Заказы") {
      apiGetAllOrders().then((resp) => {
        console.log("Заказы", resp.data);
        console.log("sssss");
        const dat = [...resp.data];

        dat.map((item) => {
          item.car = item.car.markCar;
          item.customer = item.customer.fio;
          if (item.driver !== null) {
            item.driver = `${item.driver.surname} ${item.driver.name} ${item.driver.patronymic}`;
          }
          item.loading = JSON.parse(item.loading).adress;
          item.unloading = JSON.parse(item.unloading).adress;
        });
        context.setTableData(dat);
        context.settableHeader(tableHeadAppoint);
      });
    }
  }, [context.selectedTable]);

  const status = {
    1: "Создан",
    2: "Подтвержден",
    3: "Отклонен",
    4: "Завершен",
  };
  const [shovStatusPop, setshovStatusPop] = useState("");
  const editStatus = (value) => {
    console.log(value);
    apiUpdateStatus(context.selectedTr, value).then((res) => {
      console.log("ss");
      if (res?.status === 200) {
        let dat = [...context.tableData];
        dat = dat.map((item) => {
          if (item.id === context.selectedTr) {
            return { ...item, status: value };
          } else {
            return item;
          }
        });
        context.setTableData(dat);
      }
    });
  };

  const funSetStatus = (data) => {
    if (shovStatusPop === "") {
      setshovStatusPop(data);
    } else {
      setshovStatusPop("");
    }
  };

  return (
    <>
      {context.tableData.length > 0 ? (
        <div className={styles.Table}>
          <table className={styles.TableInner}>
            <thead>
              <tr>
                {context.tableHeader.map((item) => (
                  <th key={item.key}>{item.value}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {context.tableData.map((row, index) => (
                <tr
                  key={index}
                  onClick={() => trClick(row)}
                  className={
                    context.selectedTr === row.id ? styles.setectedTr : null
                  }
                >
                  {context.tableHeader.map((headerItem) => (
                    <td key={headerItem.key}>
                      {headerItem.key === "id" ? (
                        index + 1
                      ) : headerItem.key === "status" ? (
                        <div
                          onClick={() => funSetStatus(row.id)}
                          className={styles.statusClick}
                        >
                          {status[row[headerItem.key]]}
                          {shovStatusPop === row.id && (
                            <div className={styles.shovStatusPop}>
                              <ul>
                                {Object.values(status).map((value, index) => (
                                  <li
                                    onClick={() => editStatus(index + 1)}
                                    key={index}
                                  >
                                    {value}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ) : (
                        row[headerItem.key]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={styles.notdata}>Нет данных</div>
      )}
    </>
  );
}

export default Table;
