import React, { useEffect, useState } from "react";
import styles from "./PopUpEditDriver.module.scss";
import PopUpContainer from "../../../UI/PopUpContainer/PopUpContainer";
import Input from "../../../UI/Input/Input";
import { getAllDriver } from "../../../API/API";
import DataContext from "../../../context";

function PopUpEditDriver() {
    const { context } = React.useContext(DataContext);
    const [dataNewClient, setdataNewClient] = useState({
        fio: "",
        login: "",
        phoneNumber: "",
        additionalPhoneNumber: "",
    });
    useEffect(()=>{
        getAllDriver().then((response) => {
            if (response) {
              const dataTable = response.data.map(driver => ({
                id: driver.id,
                fio: `${driver.name} ${driver.surname} ${driver.patronymic}`,
              }));
            //   context.setTableData(dataTable);
            //   settableHeader(tableHeadDriver)
            }
          });
    })


    const handleInputChange = (name, value) => {
        setdataNewClient(prevState => ({ ...prevState, [name]: value }));
    }

    // context.selectedTr
    return (
        <PopUpContainer title={"Редактирование водителя"} mT={150}>
            <div className={styles.newCarInDriver}>
               <Input Textlabel={"ФИО:"}/>
               <Input Textlabel={"Номер телефона:"}/>
               <Input Textlabel={"Доп телефон:"}/>
               <Input Textlabel={"Почта:"}/>
               <div className={styles.button}>
                    <button className={styles.buttonSave}>Сохранить</button>
               </div>
            </div>
        </PopUpContainer>
    );
}

export default PopUpEditDriver;
