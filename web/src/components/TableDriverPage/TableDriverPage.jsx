import React, { useEffect, useState } from "react";
import styles from "./TableDriverPage.module.scss";
import { tableHeadCar, tableHeadClient } from "./Data";
import DataContext from "../../context";
import { apiGetAllCar, getAllCustomers } from "../../API/API";
import { testData } from "../../DataApi";
function TableDriverPage() {
  const { drivCon, context } = React.useContext(DataContext);
  const [tableHeader, settableHeader] = useState(tableHeadCar);

  const trClick = (row) => {
    context.setSelectedTr(row.id);
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const id = userData.id;
    apiGetAllCar(id).then((data) => {
      console.log("машины", data);
    });
  }, []);

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
    if (context.selectedTable === "Заказы") {
      settableHeader(tableHeadCar);
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

export default TableDriverPage;
