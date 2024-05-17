import React, { useEffect } from "react";
import styles from "./Table.module.scss";
import { tableHead } from "./Data";
import DataContext from "../../context";
function Table() {
  const { context } = React.useContext(DataContext);
  const tableHeader = tableHead;
  

  const trClick = (row) => {
    context.setSelectedTr(row.id);
  };

  useEffect(()=>{
    console.log(context.selectedTable)
    //добавить обновление таблицы в зависимости от выбранного пунка
  },[context.selectedTable] )

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
