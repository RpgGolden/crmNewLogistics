import React, { useEffect, useState } from "react";
import styles from "./Table.module.scss";
import { tableHeadAppoint, tableHeadClient, tableHeadDriver } from "./Data";
import DataContext from "../../context";
import {
  apiCreateFile,
  apiGetAllCarsLogistic,
  apiGetAllOrders,
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
    console.log(context.selectedTable);
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
        context.setTableData(response.data);
        context.settableHeader(tableHeadCar);
      });
    }
    if (context.selectedTable === "Заказы") {
      apiGetAllOrders().then((resp) => {
        console.log("Заказы", resp.data);
        const dat = [...resp.data];
        dat.map((item) => {
          item.car = item.car.markCar;
          item.customer = item.customer.fio;
          item.driver = `${item.driver.surname} ${item.driver.name} ${item.driver.patronymic}`;
          item.loading = JSON.parse(item.loading).adress;
          item.unloading = JSON.parse(item.unloading).adress;
        });
        context.setTableData(dat);
        context.settableHeader(tableHeadAppoint);
      });
    }
  }, [context.selectedTable]);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    console.log("file", event.target.files[0]);
    apiCreateFile(event.target.files[0], context.selectedTr);
  };

  return (
    <>
      {context.tableData.length > 0 ? (
        <div className={styles.Table}>
          <table className={styles.TableInner}>
            <thead>
              <tr>
                {  context.tableHeader.map((item) => (
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
                      ) : headerItem.key === "file" ? (
                        <input type="file" onChange={handleFileChange}></input>
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
