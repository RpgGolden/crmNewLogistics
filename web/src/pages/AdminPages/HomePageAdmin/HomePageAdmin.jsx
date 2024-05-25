import React, { useEffect } from "react";
import styles from "./HomePageAdmin.module.scss";
import Table from "../../../components/Table/Table";
import HeadMenu from "../../../components/HeadMenu/HeadMenu";
import DataContext from "../../../context";
import PopUpNewClient from "../../../components/PopUp/PopUpNewClient/PopUpNewClient";
import PopUpNewAplication from "../../../components/PopUp/PopUpNewAplication/PopUpNewAplication";
import PopUpNewCar from "../../../components/PopUp/PopUpNewCar/PopUpNewCar";
import PopUpNewDriver from "../../../components/PopUp/PopUpNewDriver/PopUpNewDriver";
import FunctionTableTop from "../../../components/FunctionTableTop/FunctionTableTop";
import PopUpEditDriver from "../../../components/PopUp/PopUpEditDriver/PopUpEditDriver";
import PopUpEditClient from "../../../components/PopUp/PopUpEditClient/PopUpEditClient";
function HomePageAdmin() {
  const { context } = React.useContext(DataContext);
  useEffect(() => {
    console.log(context.popUp);
  }, [context.popUp]);

  const TableName = [
    {
      id: 1,
      name: "Заказы",
    },
    {
      id: 2,
      name: "Клиенты",
    },
    {
      id: 3,
      name: "Водители",
    },
    {
      id: 4,
      name: "Машины",
    },
  ];
  return (
    <div className={styles.HomePage}>
      {/* <Header /> */}
      <HeadMenu
        state={"home"}
        setFiltredData={context.setTableData}
        filtredData={context.tableData}
      />
      <FunctionTableTop TableName={TableName} />
      <div className={styles.Table}>
     
        <Table />
     
      </div>
      {context.popUp === "PopUpNewAplication" && <PopUpNewAplication />}
      {context.popUp === "PopUpNewClient" && <PopUpNewClient />}
      {context.popUp === "PopUpNewCar" && <PopUpNewCar />}
      {context.popUp === "PopUpNewDriver" && <PopUpNewDriver />}
      {context.popUp === "PopUpEditDriver" && <PopUpEditDriver />}
      {context.popUp === "PopUpEditClient" && <PopUpEditClient/>}
    </div>
  );
}

export default HomePageAdmin;
