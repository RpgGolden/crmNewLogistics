import React, { useContext, useEffect, useState } from "react";
import styles from "./HeadMenu.module.scss";
import { Link } from "react-router-dom";
import DataContext from "../../context";
import {
  CustomersDelete,
  apiDeleteOrder,
  driverDelete,
  getAllCustomers,
} from "./../../API/API";
function HeadMenu({ state, setFiltredData, filtredData }) {
  const { context } = useContext(DataContext);

  const flag =
    context.selectedTr !== "null" &&
    sessionStorage.getItem("idClientSelect") !== "null"
      ? true
      : false;

  const DeleteDriver = () => {
    console.log(context.selectedTr);
    flag &&
      driverDelete(context.selectedTr).then((response) => {
        if (response.status === 200) {
          alert("Водитель успешно удален!");
          // context.setpopUp("")
          // context.setSelectedTable("Клиенты")
        }
      });
  };

  const DeleteCus = () => {
    flag &&
      CustomersDelete(context.selectedTr).then((response) => {
        if (response.status === 200 && context.selectedTable === "Клиенты") {
          getAllCustomers().then((response) => {
            if (response) {
              context.setTableData(response.data);
              context.updateDataTable();
              alert("Пользователь успешно удален!");
              context.setSelectedTable("Клиенты");
            }
          });
        }
      });
  };

  //! при нажатии редактировать аккаунт
  const editAkaunt = () => {
    context.setpopUp("AccounDriver");
  };

  const delOrder = () => {
    apiDeleteOrder(context.selectedTr).then(() => {
      // context.updateDataTable();
      context.setTableData(
        context.tableData.filter((item) => item.id !== context.selectedTr)
      );
    });
  };

  return (
    <>
      {state === "home" && context.selectedTable === "Заказы" ? (
        <div className={styles.HeadMenu}>
          <button onClick={() => context.setpopUp("PopUpNewAplication")}>
            <img src="./img/add.svg" alt="View" />
            Создать заказ
          </button>
          <Link to={flag && "./EditOrder"}>
            <button>
              <img src="./img/Edit.png" alt="View" />
              Редактировать
            </button>
          </Link>
          <button onClick={delOrder}>
            <img src="./img/File_dock.png" alt="View" />
            Удалить заказ
          </button>
        </div>
      ) : context.selectedTable === "Клиенты" && state === "home" ? (
        <div className={styles.HeadMenu}>
          <button onClick={() => context.setpopUp("PopUpNewAplication")}>
            <img src="./img/add.svg" alt="View" />
            Создать заказ
          </button>
          <button onClick={() => context.setpopUp("PopUpNewClient")}>
            <img src="./img/add.svg" alt="View" />
            Добавить клиента
          </button>
          <button onClick={() => context.setpopUp("PopUpEditClient")}>
            <img src="./img/Edit.png" alt="View" />
            Редактировать
          </button>
          <button onClick={DeleteCus}>
            <img src="./img/File_dock.png" alt="View" />
            Удалить клиента
          </button>
        </div>
      ) : context.selectedTable === "Водители" && state === "home" ? (
        <div className={styles.HeadMenu}>
          <button onClick={() => context.setpopUp("PopUpNewAplication")}>
            <img src="./img/add.svg" alt="View" />
            Создать заказ
          </button>
          <button onClick={() => context.setpopUp("PopUpEditDriver")}>
            <img src="./img/Edit.png" alt="View" />
            Редактировать
          </button>
          <button onClick={DeleteDriver}>
            <img src="./img/File_dock.png" alt="View" />
            Удалить водителя
          </button>
        </div>
      ): context.selectedTable === "Машины" && state === "home" ? (
        <div className={styles.HeadMenu}>
          <button onClick={() => context.setpopUp("PopUpNewCar")}>
            <img src="./img/add.svg" alt="View" />
            Добавить машину
          </button>
          <button >
            <img src="./img/Edit.png" alt="View" />
            Редактировать
          </button>
          <button >
            <img src="./img/File_dock.png" alt="View" />
            Удалить Машину
          </button>
        </div>
      ) : state === "register" ? (
        <div className={styles.HeadMenu}>
          <Link to="./..">
            <button>
              <img src="./../img/Home.png" alt="View" />
              На главную
            </button>
          </Link>
        </div>
      ) : state === "driverPage" ? (
        <div className={styles.HeadMenu}>
          <Link to="ViewMyAppointment">
            <button>
              <img src="./img/View.png" alt="View" />В путь
            </button>
          </Link>
          <button onClick={() => context.setpopUp("PopUpNewCar")}>
            <img src="./img/add.svg" alt="View" />
            Добавить машину
          </button>
          <button onClick={editAkaunt}>
            <img src="./img/Edit.png" alt="View" />
            Редактировать аккаунт
          </button>
        </div>
      ) : state === "withBack" ? (
        <div className={styles.HeadMenu}>
          <Link to="./..">
            <button>
              <img src="./../img/Home.png" alt="View" />
              На Главную
            </button>
          </Link>
        </div>
      ) : (
        state === "card" && (
          <div className={styles.HeadMenu}>
            <Link to="./..">
              <button>
                <img src="./../img/Home.png" alt="View" />
                На главную
              </button>
            </Link>
            <Link to="./../MakeAppointmentRegistrar">
              <button>
                <img src="./../img/File_dock.png" alt="View" />
                Записать на прием
              </button>
            </Link>
            <Link to="./../EditPatient">
              <button>
                <img src="./../img/Edit.png" alt="View" />
                Редактировать
              </button>
            </Link>
          </div>
        )
      )}
    </>
  );
}

export default HeadMenu;
