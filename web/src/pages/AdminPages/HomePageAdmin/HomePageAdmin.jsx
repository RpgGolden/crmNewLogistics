import React, { useState } from "react";
import styles from "./HomePageAdmin.module.scss";
import Table from "../../../components/Table/Table";
import HeadMenu from "../../../components/HeadMenu/HeadMenu";
import DataContext from "../../../context";
import PopUpNewClient from "../../../components/PopUp/PopUpNewClient/PopUpNewClient";
import PopUpNewAplication from "../../../components/PopUp/PopUpNewAplication/PopUpNewAplication";
import PopUpNewCar from "../../../components/PopUp/PopUpNewCar/PopUpNewCar";
import PopUpNewDriver from "../../../components/PopUp/PopUpNewDriver/PopUpNewDriver";
function HomePageAdmin() {
  const { context } = React.useContext(DataContext);
  return (
    <div className={styles.HomePage}>
      {/* <Header /> */}
      <HeadMenu
        state={"home"}
        setFiltredData={context.setTableData}
        filtredData={context.tableData}
      />

      <div className={styles.Table}>
        <Table />
      </div>
      {context.popUp == "PopUpNewAplication" &&  <PopUpNewAplication/>}
      {context.popUp == "PopUpNewClient" &&  <PopUpNewClient/>}
      {context.popUp == "PopUpNewCar" &&  <PopUpNewCar/>}
      {context.popUp == "PopUpNewDriver" &&  <PopUpNewDriver/>}
    </div>
  );
}

export default HomePageAdmin;
