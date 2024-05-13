import React from "react";
import styles from "./PopUpNewClient.module.scss";
import PopUpContainer from "../../../UI/PopUpContainer/PopUpContainer";
import Input from "../../../UI/Input/Input";

function PopUpNewClient() {
    return (
        <PopUpContainer title={"Новый клиент"}>
            <div>
               <Input Textlabel={"Фио"}/>
               <Input Textlabel={"Телефон"}/>
               <Input Textlabel={"Доп.Телефон"}/>
               <Input Textlabel={"E-mail"}/>
               <div className={styles.button}>
                    <button className={styles.buttonSave}>Сохранить</button>
               </div>
            </div>
        </PopUpContainer>
    );
}

export default PopUpNewClient;
