import React from "react";
import styles from "./PopUpNewAplication.module.scss";
import PopUpContainer from "../../../UI/PopUpContainer/PopUpContainer";
import Input from "../../../UI/Input/Input";
import List from "../../../UI/List/List";
import InputTimeStamp from "../../../UI/InputTimeStamp/InputTimeStamp";

function PopUpNewAplication() {
    return (
        <PopUpContainer title={"Создание заказа"} mT={50}>
           <div className={styles.containerInput}>
               <List Textlabel={"Клиент"}/>
               <Input Textlabel={"Контакт"}/>
               <Input Textlabel={"Тип транспорта"}/>
               <Input Textlabel={"Загрузка"}/>
               <Input Textlabel={"Разгрузка"}/>
               <h3>Период выполнения заказа:</h3>
                <InputTimeStamp name="C" margin="20"/>
                <InputTimeStamp name="По" margin="10"/>
                <h3>Груз:</h3>
                <Input Textlabel={"Тип Груза"}/>
                <div className={styles.Cargo}>
                    <Input Textlabel={"Мест:"}/>
                    <Input Textlabel={"Вес:"}/>
                    <Input Textlabel={"Объем:"}/>
                </div>
               <div className={styles.button}>
                    <button className={styles.buttonSave}>Сохранить</button>
               </div>

           </div>
          
        </PopUpContainer>
    );
}

export default PopUpNewAplication;
