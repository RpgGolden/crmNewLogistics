import React from "react";
import styles from "./PopUpNewDriver.module.scss";
import PopUpContainer from "../../../UI/PopUpContainer/PopUpContainer";
import Input from "../../../UI/Input/Input";

function PopUpNewDriver() {
    return (
        <PopUpContainer title={"Новый водитель"} mT={50}>
            <div className={styles.newCarInDriver}>
               <Input Textlabel={"ФИО:"}/>
                <div className={styles.TwoInput}>
                        <Input Textlabel={"Телефон:"}/>
                        <Input Textlabel={"ИНН:"}/>
                    </div>
                    <div className={styles.TwoInput}>
                        <Input Textlabel={"Доп телефон:"}/>
                        <Input Textlabel={"СНИЛС:"}/>
                    </div>
                <h3>Паспортные данные</h3>
                    <div className={styles.TwoInput}>
                        <Input Textlabel={"Серия:"}/>
                        <Input Textlabel={"Номер:"}/>
                    </div>
                <Input Textlabel={"Кем выдан:"}/>
                    <div className={styles.ThreeInput}>
                        <Input Textlabel={"Дача выдачи:"}/>
                        <Input Textlabel={"Код подр-ия:"}/>
                        <Input Textlabel={"Дата рождения:"}/>
                    </div>
                <h3>Водительское удостоверение</h3>
                    <div className={styles.ThreeInput}>
                        <Input Textlabel={"Серия, номер:"}/>
                        <Input Textlabel={"Категория ВУ:"}/>
                        <Input Textlabel={"Период действия:"}/>
                    </div>
                <h3>Прописка</h3>
                <Input Textlabel={"Адрес прописки:"}/>
                <Input Textlabel={"Адрес фактического проживания:"}/>
               <div className={styles.button}>
                    <button className={styles.buttonSave}>Сохранить</button>
               </div>
            </div>
        </PopUpContainer>
    );
}

export default PopUpNewDriver;
