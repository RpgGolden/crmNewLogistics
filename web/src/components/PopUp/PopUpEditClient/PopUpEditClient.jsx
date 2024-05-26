// PopUpNewClient.js
import React, { useEffect, useState } from "react";
import styles from "./PopUpEditClient.module.scss";
import PopUpContainer from "../../../UI/PopUpContainer/PopUpContainer";
import Input from "../../../UI/Input/Input";
import {
  UpdateProfileCustomer,
  getAllCustomers,
  getCustomeriD,
} from "../../../API/API";
import DataContext from "../../../context";

function PopUpEditClient() {
  const { context } = React.useContext(DataContext);
  const [dataNewClient, setdataNewClient] = useState({
    fio: "",
    login: "",
    phoneNumber: "",
    additionalPhoneNumber: "",
  });

  useEffect(() => {
    console.log("idClient", context.selectedTr);
    const idCustomer = context.selectedTr;
    getCustomeriD(idCustomer).then((response) => {
      console.log("responseClient", response);
      setdataNewClient({ ...response.data });
    });
  }, []);

  const handleInputChange = (name, value) => {
    setdataNewClient((prevState) => ({ ...prevState, [name]: value }));
  };

  const EditClient = () => {
    const idCustomer = context.selectedTr;
    UpdateProfileCustomer(idCustomer, dataNewClient).then((response) => {
      if (response.status == 200 && context.selectedTable === "Клиенты") {
        getAllCustomers().then((response) => {
          if (response) {
            context.setTableData(response.data);
            context.setpopUp("");
          }
        });
      }
    });
  };

  return (
    <PopUpContainer width={true} title={"Редактирование клиента"} mT={200}>
      <div className={styles.popBox}>
        <div className={styles.popLeft}>
          <Input
            Textlabel={"Фио"}
            handleInputChange={handleInputChange}
            name="fio"
            value={dataNewClient.fio}
          />
          <Input
            Textlabel={"Телефон"}
            handleInputChange={handleInputChange}
            name="phoneNumber"
            value={dataNewClient.phoneNumber}
          />
          <Input
            Textlabel={"Доп.Телефон"}
            handleInputChange={handleInputChange}
            name="additionalPhoneNumber"
            value={dataNewClient.additionalPhoneNumber}
          />
          <Input
            Textlabel={"E-mail"}
            handleInputChange={handleInputChange}
            name="login"
            value={dataNewClient.login}
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
        <button className={styles.buttonSave} onClick={EditClient}>
          Сохранить
        </button>
      </div>
    </PopUpContainer>
  );
}

export default PopUpEditClient;
