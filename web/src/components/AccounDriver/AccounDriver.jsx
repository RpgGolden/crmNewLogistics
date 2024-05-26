import React, { useEffect, useState } from "react";
import styles from "./AccounDriver.module.scss";
import Input from "../../UI/Input/Input";
import DataContext from "../../context";
import {
  editDriverDriv,
  editDriverInfo,
  getOneDriverData,
  getProfileDriver,
} from "../../API/API";
import PopUpContainer from "../../UI/PopUpContainer/PopUpContainer";

function AccounDriver() {
  const { context } = React.useContext(DataContext);
  const [dataNewClient, setdataNewClient] = useState({
    name: "",
    surname: "",
    patronymic: "",
    login: "",
    phoneNumber: "",
    additionalPhoneNumber: "",
    inn: "",
    snils: "",
    passportSerial: "",
    passportNumber: "",
    passportIssueBy: "",
    passportIssueDate: "",
    passportCode: "",
    birthDate: "",
    addressReg: "",
    actualAdress: "",
    numberLicense: "",
    categoryLicense: "",
    periodLicense: "",
  });

  useEffect(() => {
    getProfileDriver().then((response) => {
      if (response) {
        console.log(response);
        setdataNewClient({
          name: response.data.name,
          surname: response.data.surname,
          patronymic: response.data.patronymic,
          phoneNumber: response.data.phoneNumber,
          additionalPhoneNumber: response.data.additionalPhoneNumber,
          inn: response.data.inn,
          snils: response.data.snils,
          passportSerial: response.data.passportSerial,
          passportNumber: response.data.passportNumber,
          passportIssueBy: response.data.passportIssueBy,
          passportIssueDate: response.data.passportIssueDate,
          passportCode: response.data.passportCode,
          birthDate: response.data.birthDate,
          addressReg: response.data.addressReg,
          actualAdress: response.data.actualAdress,
          numberLicense: response.data.numberLicense,
          categoryLicense: response.data.categoryLicense,
          periodLicense: response.data.periodLicense,
        });
      }
    });
  }, []);

  const handleInputChange = (name, value) => {
    setdataNewClient((prevState) => ({ ...prevState, [name]: value }));
  };

  const saveDataDriver = () => {
    console.log("dataNewClient", dataNewClient);
    editDriverDriv(dataNewClient).then((response) => {
      if (response) {
        alert("Данные водителя обновлены!");
        context.setpopUp("");
      }
    });
  };
  return (
    <PopUpContainer title={"Редактирование водителя"} mT={50}>
      <div className={styles.newCarInDriver}>
        <Input
          Textlabel={"Имя:"}
          value={dataNewClient.name}
          handleInputChange={handleInputChange}
          name="name"
        />
        <Input
          Textlabel={"Фамилия:"}
          value={dataNewClient.surname}
          handleInputChange={handleInputChange}
          name="surname"
        />
        <Input
          Textlabel={"Отчество:"}
          value={dataNewClient.patronymic}
          handleInputChange={handleInputChange}
          name="patronymic"
        />
        <div className={styles.TwoInput}>
          <Input
            Textlabel={"Телефон:"}
            value={dataNewClient.phoneNumber}
            handleInputChange={handleInputChange}
            name="phoneNumber"
          />
          <Input
            Textlabel={"ИНН:"}
            value={dataNewClient.inn}
            handleInputChange={handleInputChange}
            name="inn"
          />
        </div>
        <div className={styles.TwoInput}>
          <Input
            Textlabel={"Доп телефон:"}
            value={dataNewClient.additionalPhoneNumber}
            handleInputChange={handleInputChange}
            name="additionalPhoneNumber"
          />
          <Input
            Textlabel={"СНИЛС:"}
            value={dataNewClient.snils}
            handleInputChange={handleInputChange}
            name="snils"
          />
        </div>
        <h3>Паспортные данные</h3>
        <div className={styles.TwoInput}>
          <Input
            Textlabel={"Серия:"}
            value={dataNewClient.passportSerial}
            handleInputChange={handleInputChange}
            name="passportSerial"
          />
          <Input
            Textlabel={"Номер:"}
            value={dataNewClient.passportNumber}
            handleInputChange={handleInputChange}
            name="passportNumber"
          />
        </div>
        <Input
          Textlabel={"Кем выдан:"}
          value={dataNewClient.passportIssueBy}
          handleInputChange={handleInputChange}
          name="passportIssueBy"
        />
        <div className={styles.ThreeInput}>
          <Input
            Textlabel={"Дата выдачи:"}
            value={dataNewClient.passportIssueDate}
            handleInputChange={handleInputChange}
            name="passportIssueDate"
          />
          {/* <InputOnlyDate Textlabel={"Дата выдачи:"} value={dataNewClient.passportIssueDate} handleInputChange={handleInputChange} name="passportIssueDate"/> */}
          <Input
            Textlabel={"Код подразделения:"}
            value={dataNewClient.passportCode}
            handleInputChange={handleInputChange}
            name="passportCode"
          />
          {/* <InputOnlyDate Textlabel={"Дата рождения:"} value={dataNewClient.birthDate} handleInputChange={handleInputChange} name="birthDate"/> */}
          <Input
            Textlabel={"Дата рождения:"}
            value={dataNewClient.birthDate}
            handleInputChange={handleInputChange}
            name="birthDate"
          />
        </div>
        <h3>Водительское удостоверение</h3>
        <div className={styles.ThreeInput}>
          <Input
            Textlabel={"Серия, номер:"}
            value={dataNewClient.numberLicense}
            handleInputChange={handleInputChange}
            name="numberLicense"
          />
          <Input
            Textlabel={"Категория ВУ:"}
            value={dataNewClient.categoryLicense}
            handleInputChange={handleInputChange}
            name="categoryLicense"
          />
          <Input
            Textlabel={"Период действия:"}
            value={dataNewClient.periodLicense}
            handleInputChange={handleInputChange}
            name="periodLicense"
          />
        </div>
        <h3>Прописка</h3>
        <Input
          Textlabel={"Адрес прописки:"}
          value={dataNewClient.addressReg}
          handleInputChange={handleInputChange}
          name="addressReg"
        />
        <Input
          Textlabel={"Адрес фактического проживания:"}
          value={dataNewClient.actualAdress}
          handleInputChange={handleInputChange}
          name="actualAdress"
        />
        <div className={styles.button}>
          <button className={styles.buttonSave} onClick={saveDataDriver}>
            Сохранить
          </button>
        </div>
      </div>
    </PopUpContainer>
  );
}

export default AccounDriver;
