// PopUpNewClient.js
import React, { useState } from "react";
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

  const handleInputChange = (name, value) => {
    setdataNewClient((prevState) => ({ ...prevState, [name]: value }));
  };

  const CreateNewClient = () => {
    AddClient(dataNewClient).then((response) => {
      if (response.status === 200) {
        getAllCustomers().then((response) => {
          if (response) {
            context.setTableData(response.data);
          }
        });
        alert("Новый клиент зарегистрирован!");
        context.setpopUp("");
      }
    });
  };

  return (
    <PopUpContainer width={true} title={"Новый клиент"} mT={200}>
      <div className={styles.popBox}>
        <div className={styles.popLeft}>
          <Input
            Textlabel={"Фио"}
            handleInputChange={handleInputChange}
            name="fio"
          />
          <Input
            Textlabel={"Телефон"}
            handleInputChange={handleInputChange}
            name="phoneNumber"
          />
          <Input
            Textlabel={"Доп.Телефон"}
            handleInputChange={handleInputChange}
            name="additionalPhoneNumber"
          />
          <Input
            Textlabel={"E-mail"}
            handleInputChange={handleInputChange}
            name="login"
          />
          <Input
            Textlabel={"Наименование организации"}
            handleInputChange={handleInputChange}
            name="nameCompany"
            value={dataNewClient.nameCompany}
          />
        </div>
        <div className={styles.popRigth}>
          <Input
            Textlabel={"Адресс клиента"}
            handleInputChange={handleInputChange}
            name="address"
            value={dataNewClient.address}
          />
          <Input
            Textlabel={"ИНН"}
            handleInputChange={handleInputChange}
            name="inn"
            value={dataNewClient.inn}
          />
          <Input
            Textlabel={"К/С"}
            handleInputChange={handleInputChange}
            name="kc"
            value={dataNewClient.kc}
          />
          <Input
            Textlabel={"БИК"}
            handleInputChange={handleInputChange}
            name="bik"
            value={dataNewClient.bik}
          />
          <Input
            Textlabel={"КПП"}
            handleInputChange={handleInputChange}
            name="kpp"
            value={dataNewClient.kpp}
          />
        </div>
      </div>
      <div className={styles.button}>
        <button className={styles.buttonSave} onClick={CreateNewClient}>
          Добавить
        </button>
      </div>
    </PopUpContainer>
  );
}

export default PopUpNewClient;
