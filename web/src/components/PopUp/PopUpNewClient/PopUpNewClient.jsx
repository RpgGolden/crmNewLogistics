// PopUpNewClient.js
import React, { useState } from "react";
import styles from "./PopUpNewClient.module.scss";
import PopUpContainer from "../../../UI/PopUpContainer/PopUpContainer";
import Input from "../../../UI/Input/Input";
import { AddClient } from "../../../API/API";
import DataContext from "../../../context";

function PopUpNewClient() {
    const { context } = React.useContext(DataContext);
    const [dataNewClient, setdataNewClient] = useState({
        fio: "",
        login: "",
        phoneNumber: "",
        additionalPhoneNumber: "",
    });

    const handleInputChange = (name, value) => {
        setdataNewClient(prevState => ({ ...prevState, [name]: value }));
    }

    const CreateNewClient = () => {
        AddClient(dataNewClient).then((response) => {
          if (response.status === 200) {
            alert("Новый клиент зарегистрирован!")
            context.setpopUp("")
          }
        });
      };

    return (
        <PopUpContainer title={"Новый клиент"} mT={200}>
            <div>
               <Input Textlabel={"Фио"} handleInputChange={handleInputChange} name="fio"/>
               <Input Textlabel={"Телефон"} handleInputChange={handleInputChange} name="phoneNumber"/>
               <Input Textlabel={"Доп.Телефон"} handleInputChange={handleInputChange} name="additionalPhoneNumber"/>
               <Input Textlabel={"E-mail"} handleInputChange={handleInputChange} name="login"/>
               <div className={styles.button}>
                    <button className={styles.buttonSave} onClick={CreateNewClient}>Добавить</button>
               </div>
            </div>
        </PopUpContainer>
    );
}

export default PopUpNewClient;
