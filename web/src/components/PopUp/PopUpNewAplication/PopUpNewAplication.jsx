import React, { useEffect, useState } from "react";
import styles from "./PopUpNewAplication.module.scss";
import PopUpContainer from "../../../UI/PopUpContainer/PopUpContainer";
import Input from "../../../UI/Input/Input";
import List from "../../../UI/List/List";
import InputTimeStamp from "../../../UI/InputTimeStamp/InputTimeStamp";
import { getAllCustomers } from "../../../API/API";

function PopUpNewAplication() {
    const [dataClient, setdataClient ] = useState([])
    useEffect(() => {
        getAllCustomers().then((response) => {
          if (response) {
            console.log(response)
            const clientData = response.data.map((item, index) => ({
                
              id: index + 1,
              name: item.fio
            }));
           
            setdataClient(clientData);
          }
        });
      }, []);
  
    return (
        <PopUpContainer title={"Создание заказа"} mT={50}>
           <div className={styles.containerInput}>
               <List Textlabel={"Клиент"} data={dataClient}/>
               
               <Input Textlabel={"Контакт"} />
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
