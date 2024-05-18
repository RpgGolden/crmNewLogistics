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
        // getAllDriver().then((response) => {
        //     if (response) {
        //     console.log(response)
        //     //   context.setTableData(dataTable);
        //     //   settableHeader(tableHeadDriver)
        //     }
        //   });
        setdataNewClient()
    })


    const handleInputChange = (name, value) => {
        setdataNewClient(prevState => ({ ...prevState, [name]: value }));
    }

    // context.selectedTr
    return (
        <PopUpContainer title={"Редактирование водителя"} mT={150}>
            <div className={styles.newCarInDriver}>
               <Input Textlabel={"ФИО:"} value={dataNewClient.fio}/>
               <Input Textlabel={"Номер телефона:"} value={dataNewClient.phone}/>
               <Input Textlabel={"Доп телефон:"} value={dataNewClient.additionalPhoneNumber}/>
               <Input Textlabel={"Почта:"} value={dataNewClient.login}/>
               <div className={styles.button}>
                    <button className={styles.buttonSave}>Сохранить</button>
               </div>
            </div>
        </PopUpContainer>
    );
}

export default PopUpEditDriver;
