// PopUpNewClient.js
import React, { useEffect, useState } from "react";
import styles from "./PopUpNewClient.module.scss";
import PopUpContainer from "../../../UI/PopUpContainer/PopUpContainer";
import Input from "../../../UI/Input/Input";
import { AddClient, getAllCustomers } from "../../../API/API";
import DataContext from "../../../context";

function PopUpNewClient() {
    const { context } = React.useContext(DataContext);
    const [dataNewClient, setdataNewClient] = useState({
        fio: "",
        login: "",
        phoneNumber: "",
        additionalPhoneNumber: "",
    });

    useEffect(()=>{
        
    })

    const handleInputChange = (name, value) => {
        setdataNewClient(prevState => ({ ...prevState, [name]: value }));
    }

    const EditClient = () => {
      
      };

    return (
        <PopUpContainer title={"Новый клиент"} mT={200}>
            <div>
               <Input Textlabel={"Фио"} handleInputChange={handleInputChange} name="fio" value={dataNewClient.fio}/>
               <Input Textlabel={"Телефон"} handleInputChange={handleInputChange} name="phoneNumber" value={dataNewClient.phoneNumber}/>
               <Input Textlabel={"Доп.Телефон"} handleInputChange={handleInputChange} name="additionalPhoneNumber" value={dataNewClient.additionalPhoneNumber}/>
               <Input Textlabel={"E-mail"} handleInputChange={handleInputChange} name="login" value={dataNewClient.login}/>
               <div className={styles.button}>
                    <button className={styles.buttonSave} onClick={EditClient}>Добавить</button>
               </div>
            </div>
        </PopUpContainer>
    );
}

export default PopUpNewClient;
