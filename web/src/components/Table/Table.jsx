import React, { useEffect, useState } from "react";
import styles from "./Table.module.scss";
import { tableHeadAppoint, tableHeadClient, tableHeadDriver } from "./Data";
import DataContext from "../../context";
import { getAllCustomers, getAllDriver, getProfileDriver } from "../../API/API";
import { testData } from "../../DataApi";
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
            id: driver.id,
            fio: `${driver.name} ${driver.surname} ${driver.patronymic}`,
          }));
          context.setTableData(dataTable);
          settableHeader(tableHeadDriver);
        }
      });
    }
    if (context.selectedTable === "Заказы") {
      settableHeader(tableHeadAppoint);
      context.setTableData(testData);
    }
  }, [context.selectedTable]);

  return (
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
                <td key={headerItem.key}>{row[headerItem.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
