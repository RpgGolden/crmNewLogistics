import React, { useContext, useEffect, useState } from "react";
import styles from "./HeadMenu.module.scss";
import { Link } from "react-router-dom";
import DataContext from "../../context";
import {
  CustomersDelete,
  apiDelCar,
  apiDeleteOrder,
  apiGetAllCarsLogistic,
  apiGetFile,
  apiGetFile2,
  driverDelete,
  getAllCustomers,
  getAllDriver,
} from "./../../API/API";
function HeadMenu({ state, setFiltredData, filtredData }) {
  const { context } = useContext(DataContext);

  const flag =
    context.selectedTr !== "null" &&
    sessionStorage.getItem("idClientSelect") !== "null"
      ? true
      : false;

  const DeleteDriver = () => {
    if(context.selectedTr != null){
    flag &&
      driverDelete(context.selectedTr).then((response) => {
        if (response.status === 200) {
          getAllDriver().then((response) => {
            if (response) {
              const dataTable = response.data.map((driver) => ({
                ...driver,
                id: driver.id,
                fio: `${driver.name} ${driver.surname} ${driver.patronymic}`,
              }));
              context.setTableData(dataTable);
              context.setSelectedTable("Водители");
              alert("Водитель успешно удален!");
              context.updateDataTable();
            }
          });
        }
      });
    }else{
      alert("Сначала выберите водителя!")
    }
  };

  const DeleteCus = () => {
    if(context.selectedTr != null){
    flag &&
      CustomersDelete(context.selectedTr).then((response) => {
        if (response.status === 200 && context.selectedTable === "Клиенты") {
          getAllCustomers().then((response) => {
            if (response) {
              context.setTableData(response.data);
              alert("Пользователь успешно удален!");
              context.setSelectedTable("Клиенты");
              context.updateDataTable();
            }
          });
        }
      });
    }else{
      alert("Сначала выберите клиента!")
    }
  };

  //! удалить машину
  const DeleteCar = () => {
    if(context.selectedTr != null){
    apiDelCar(context.selectedTr).then((rs) => {
      alert("Машина удалена!")
      context.updateDataTable();
    });
    let d = [...context.tableData];
    const f = d.filter((item) => item.id !== context.selectedTr);
    context.setTableData(f);
  }else{
    alert("Сначала выберите машину!")
  }
  };

  //! при нажатии редактировать аккаунт
  const editAkaunt = () => {
    context.setpopUp("AccounDriver");
  };

  const delOrder = () => {
    if(context.selectedTr != null){
    apiDeleteOrder(context.selectedTr).then(() => {
      // context.updateDataTable();
      context.setTableData(
        context.tableData.filter((item) => item.id !== context.selectedTr)
      );
      context.updateDataTable();
      alert("Заказ удален!")

    });
  }else{
    alert("Сначала выберите заказ!")
  }
  };

  const funMapGo = () => {
    if(context.selectedTr != null){
    if (context.selectedTr && context.selectedTable === "Заказы") {
      let par = null;
      par = context.tableData.find((el) => el.id === context.selectedTr);
      console.log(par.geoLoading, par.geoUnLoading);
      const url = `https://yandex.ru/maps/?rtext=${par.geoLoading.join(
        ","
      )}~${par.geoUnLoading.join(",")}`;
      window.open(url, "_blank");
    }}else{
      alert("Сначала выберите заказ!")
    }
  };

  //! получить файл
  const getFile = () => {
    if(context.selectedTr != null){
    console.log(context.selectedTr);
    apiGetFile(context.selectedTr).then((response) => {
      console.log(response);
    });
  }else{
      alert("Сначала выберите заказ!")
    }
  };
  //! получить файл
  const getFile2 = () => {
    if(context.selectedTr != null){
    console.log(context.selectedTr);
    apiGetFile2(context.selectedTr).then((response) => {
      console.log(response);
    });
  }else{
    alert("Сначала выберите заказ!")
  }
  };

  //! редактирование авто
  const editCar = () => {
    if(context.selectedTr != null){
      const car = context.tableData.find((el) => el.id === context.selectedTr);
      context.setCarData({ ...car });
      context.setEditCarData(true);
      context.setpopUp("PopUpNewCar");
    }else{
      alert("Сначала выберите машину!")
    }
   
  };

  return (
    <>
      {state === "home" && context.selectedTable === "Заказы" ? (
        <div className={styles.HeadMenu}>
          <button onClick={() => context.setpopUp("PopUpNewAplication")}>
            <img src="./img/add.svg" alt="View" />
            Создать заказ
          </button>
          {context.selectedTr != null ? (
            <Link to="./EditOrder">
              <button>
                <img src="./img/Edit.png" alt="View" />
                Редактировать
              </button>
            </Link>
          ) : (
            <button onClick={() => alert('Сначала выберите заказ!')}>
              <img src="./img/Edit.png" alt="View" />
              Редактировать
            </button>
          )}
          <button onClick={delOrder}>
            <img src="./img/Trash.png" alt="View" />
            Удалить заказ
          </button>
          <button onClick={getFile}>
            <img src="./img/File_dock.png" alt="View" />
            Получить расчетный лист
          </button>
          <button onClick={getFile2}>
            <img src="./img/File_dock.png" alt="View" />
            Получить путевой лист
          </button>
        </div>
      ) : context.selectedTable === "Клиенты" && state === "home" ? (
        <div className={styles.HeadMenu}>
          <button onClick={() => context.setpopUp("PopUpNewClient")}>
            <img src="./img/add.svg" alt="View" />
            Добавить клиента
          </button>
          {context.selectedTr != null ? (
            <button onClick={() => context.setpopUp("PopUpEditClient")}>
              <img src="./img/Edit.png" alt="View" />
              Редактировать
            </button>
          ) : (
            <button onClick={() => alert('Сначала выберите клиента!')}>
              <img src="./img/Edit.png" alt="View" />
              Редактировать
            </button>
          )}
          <button onClick={DeleteCus}>
            <img src="./img/Trash.png" alt="View" />
            Удалить клиента
          </button>
        </div>
      ) : context.selectedTable === "Водители" && state === "home" ? (
        <div className={styles.HeadMenu}>
          {context.selectedTr != null ? (
            <button onClick={() => context.setpopUp("PopUpEditDriver")}>
              <img src="./img/Edit.png" alt="View" />
              Редактировать
            </button>
          ) : (
            <button onClick={() => alert('Сначала выберите водителя!')}>
              <img src="./img/Edit.png" alt="View" />
              Редактировать
            </button>
          )}
          <button onClick={DeleteDriver}>
            <img src="./img/Trash.png" alt="View" />
            Удалить водителя
          </button>
        </div>
      ) : context.selectedTable === "Машины" && state === "home" ? (
        <div className={styles.HeadMenu}>
          <button onClick={() => context.setpopUp("PopUpNewCar")}>
            <img src="./img/add.svg" alt="View" />
            Добавить машину
          </button>
          <button onClick={editCar}>
            <img src="./img/Edit.png" alt="View" />
            Редактировать машину
          </button>
          <button onClick={DeleteCar}>
            <img src="./img/Trash.png" alt="View" />
            Удалить машину
          </button>
        </div>
      ) : (state === "driverPage" &&  context.selectedTable === "Заказы") ?(
        <div className={styles.HeadMenu}>
          <button onClick={funMapGo}>
            <img src="./img/View.png" alt="View" />В путь
          </button>
          <button onClick={editAkaunt}>
            <img src="./img/Edit.png" alt="View" />
            Редактировать аккаунт
          </button>
          <button onClick={getFile}>
            <img src="./img/File_dock.png" alt="View" />
            Получить расчетный лист
          </button>
          <button onClick={getFile2}>
            <img src="./img/File_dock.png" alt="View" />
            Получить путевой лист
          </button>
        </div>
      ):(state === "driverPage" &&  context.selectedTable === "Машины") &&(
        <div className={styles.HeadMenu}>
          <button onClick={() => context.setpopUp("PopUpNewCar")}>
            <img src="./img/add.svg" alt="View" />
            Добавить машину
          </button>
          <button onClick={editCar}>
            <img src="./img/Edit.png" alt="View" />
            Редактировать машину
          </button>
        </div>
      )}
    </>
  );
}

export default HeadMenu;
