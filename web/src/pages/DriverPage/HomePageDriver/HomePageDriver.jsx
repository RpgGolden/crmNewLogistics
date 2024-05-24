import React from "react";
import styles from "./HomePageDriver.module.scss";
import HeadMenu from "../../../components/HeadMenu/HeadMenu";
import DataContext from "../../../context";
import FunctionTableTop from "../../../components/FunctionTableTop/FunctionTableTop";
import PopUpNewCar from "../../../components/PopUp/PopUpNewCar/PopUpNewCar";
import TableDriverPage from "../../../components/TableDriverPage/TableDriverPage";
function HomePageDriver() {
  const { context } = React.useContext(DataContext);
  const TableName = [
    {
      id: 1,
      name: "Заказы",
    },
    {
      id: 2,
      name: "Машины",
    },
  ];
  return (
    <div className={styles.HomePage}>
      {/* <Header /> */}
      <HeadMenu
        state={"driverPage"}
        setFiltredData={context.setTableData}
        filtredData={context.tableData}
      />
      <FunctionTableTop TableName={TableName} />
      <TableDriverPage />
      {context.popUp === "PopUpNewCar" && <PopUpNewCar />}
    </div>
  );
}

export default HomePageDriver;
