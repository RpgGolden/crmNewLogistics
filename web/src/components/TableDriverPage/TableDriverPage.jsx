import React, { useEffect, useState } from "react";
import styles from "./TableDriverPage.module.scss";
import { tableHeadCar, tableHeadOrders } from "./Data";
import DataContext from "../../context";
import {
  apiGetAllCar,
  apiGetAllOrdersDriver,
  getProfileDriver,
} from "../../API/API";

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
      drivCon.setCarTableData(data);
    });

    apiGetAllOrdersDriver(id).then((data) => {
      console.log("заказы", data);
      drivCon.setOrdersTableData(data);
    });
  }, []);

  useEffect(() => {
    console.log(context.selectedTable);
    if (context.selectedTable === "Машины") {
      getProfileDriver().then((response) => {
        apiGetAllCar(response.data.id).then((resp) => {
          if (resp) {
            console.log(resp.data);
            context.setTableData(resp.data);
            settableHeader(tableHeadCar);
          }
        });
      });
    }
    if (context.selectedTable === "Заказы") {
      getProfileDriver().then((response) => {
        console.log(response);
        apiGetAllOrdersDriver(response.data.id).then((resp) => {
          if (resp) {
            console.log("заказы", resp.data);
            context.setTableData(resp.data);
            settableHeader(tableHeadOrders);
          }
        });
      });
      // context.setTableData(testData);
    }
  }, [context.selectedTable]);

  return (
    <div className={styles.Table}>
      {context.tableData.length > 0 ? (
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
                    {headerItem.key === "id" ? index + 1 : row[headerItem.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className={styles.notdata}>Нет данных</div>
      )}
    </div>
  );
}

export default TableDriverPage;
