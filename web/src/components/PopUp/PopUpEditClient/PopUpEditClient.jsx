// PopUpNewClient.js
import React, { useEffect, useState } from "react";
import styles from "./PopUpEditClient.module.scss";
import PopUpContainer from "../../../UI/PopUpContainer/PopUpContainer";
import Input from "../../../UI/Input/Input";
import { AddClient, UpdateProfileCustomer, getAllCustomers, getCustomeriD } from "../../../API/API";
import DataContext from "../../../context";

function PopUpEditClient() {
    const { context } = React.useContext(DataContext);
    const [dataNewClient, setdataNewClient] = useState({
        fio: "",
        login: "",
        phoneNumber: "",
        additionalPhoneNumber: "",
    });

    useEffect(()=>{
        console.log("idClient", context.selectedTr)
        const idCustomer = context.selectedTr
        getCustomeriD(idCustomer).then((response)=>{
            console.log("responseClient",response)
            // setdataNewClient({
            //     fio:response.data.fio,
            //     login:response.data.login,
            //     phoneNumber:response.data.phoneNumber,
            //     additionalPhoneNumber:response.data.additionalPhoneNumber,
            // }
            // );
        })
    },[])

    const handleInputChange = (name, value) => {
        setdataNewClient(prevState => ({ ...prevState, [name]: value }));
    }

    const EditClient = () => {
        const idCustomer = context.selectedTr
        UpdateProfileCustomer(idCustomer, dataNewClient).then((response)=>{
            console.log("responseUpdateClient",response)
        })
      };

    return (
        <PopUpContainer title={"Редактирование клиента"} mT={200}>
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

export default PopUpEditClient;
