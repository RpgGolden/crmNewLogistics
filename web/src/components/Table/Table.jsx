import React, { useEffect, useState } from "react";
import styles from "./Table.module.scss";
import { tableHeadAppoint, tableHeadClient, tableHeadDriver } from "./Data";
import DataContext from "../../context";
import {
  apiGetAllOrders,
  getAllCustomers,
  getAllDriver,
  getProfileDriver,
} from "../../API/API";

function Table() {
  const { context } = React.useContext(DataContext);
  const [tableHeader, settableHeader] = useState(tableHeadAppoint);

  const trClick = (row) => {
    context.setSelectedTr(row.id);
  };

  useEffect(() => {
    console.log(context.selectedTable);
    if (context.selectedTable === "Клиенты") {
      getAllCustomers().then((response) => {
        if (response) {
          console.log(response.data);
          context.setTableData(response.data);
          settableHeader(tableHeadClient);
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
          settableHeader(tableHeadDriver);
        }
      });
    }
    if (context.selectedTable === "Заказы") {
      apiGetAllOrders().then((resp) => {
        console.log("Заказы", resp.data);
        const dat = [...resp.data];
        dat.map((item) => {
          item.car = item.car.markCar;
          item.customer = item.customer.fio;
          item.driver = item.driver.name;
          item.loading = JSON.parse(item.loading).adress;
          item.unloading = JSON.parse(item.unloading).adress;
        });
        context.setTableData(dat);
      });
      settableHeader(tableHeadAppoint);
    }
  }, [context.selectedTable]);

  return (
    <>
      {context.tableData.length > 0 ? (
        <div className={styles.Table}>
          <table className={styles.TableInner}>
            <thead>
              <tr>
                {tableHeader.map((item) => (
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
                  {tableHeader.map((headerItem) => (
                    <td key={headerItem.key}>
                      {headerItem.key === "id"
                        ? index + 1
                        : row[headerItem.key]}
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
