import React from "react";
import styles from "./PopUpNewAplication.module.scss";
import PopUpContainer from "../../../UI/PopUpContainer/PopUpContainer";
import Input from "../../../UI/Input/Input";

function PopUpNewAplication() {
    return (
        <PopUpContainer title={"Создание заказа"}>
           <div>
               <Input Textlabel={"Фио"}/>
           </div>
          
        </PopUpContainer>
    );
}

export default PopUpNewAplication;
