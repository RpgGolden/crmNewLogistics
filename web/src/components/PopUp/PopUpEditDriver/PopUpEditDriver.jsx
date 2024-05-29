import React, { useContext, useEffect, useState } from "react";
import styles from "./PopUpEditDriver.module.scss";
import PopUpContainer from "../../../UI/PopUpContainer/PopUpContainer";
import Input from "../../../UI/Input/Input";
import {
  EditDriverInfo,
  editDriverInfo,
  getAllDriver,
  getOneDriverData,
} from "../../../API/API";
import DataContext from "../../../context";
import InputOnlyDate from "../../../UI/InputOnlyDate/InputOnlyDate";
import { tableHeadDriver } from "../../Table/Data";

function PopUpEditDriver() {
  const {context } = useContext(DataContext);
  const [idSelectDriver,setidSelectDriver] = useState(context.selectedTr);
  const [dataNewClient, setdataNewClient] = useState({});

  useEffect(() => {
    getOneDriverData(context.selectedTr).then((response) => {
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
  }, [context.selectedTr]);

  const handleInputChange = (name, value) => {
    setdataNewClient((prevState) => ({ ...prevState, [name]: value }));
  };

  const saveDataDriver = () => {
    console.log("idSelectDriver", idSelectDriver);
    console.log("dataNewClient", dataNewClient);
    editDriverInfo(idSelectDriver, dataNewClient).then((response) => {
      console.log(response);
      if (response) {
        getAllDriver().then((response) => {
          if (response) {
            const dataTable = response.data.map((driver) => ({
              ...driver,
              id: driver.id,
              fio: `${driver.name} ${driver.surname} ${driver.patronymic}`,
            }));
            context.setTableData(dataTable);
            context.settableHeader(tableHeadDriver);
            alert("Данные водителя обновлены!");
            context.setpopUp("");
            context.updateDataTable();
          }
        });
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
          placeholder="Иван"
        />
        <Input
          Textlabel={"Фамилия:"}
          value={dataNewClient.surname}
          handleInputChange={handleInputChange}
          name="surname"
          placeholder="Иванов"
        />
        <Input
          Textlabel={"Отчество:"}
          value={dataNewClient.patronymic}
          handleInputChange={handleInputChange}
          name="patronymic"
          placeholder="Иванович"
        />
        <div className={styles.TwoInput}>
        <Input
            Textlabel={"Телефон:"}
            value={dataNewClient.phoneNumber}
            handleInputChange={handleInputChange}
            name="phoneNumber"
            regex={/^(\+7|8)[0-9]{10}$/} 
            placeholder="+79508999999"
          />

          <Input
            Textlabel={"ИНН:"}
            value={dataNewClient.inn}
            handleInputChange={handleInputChange}
            name="inn"
            regex={/^\d{12}$/}
            placeholder="111111111111"     
          />
        </div>
        <div className={styles.TwoInput}>
          <Input
            Textlabel={"Доп телефон:"}
            value={dataNewClient.additionalPhoneNumber}
            handleInputChange={handleInputChange}
            name="additionalPhoneNumber"
            regex={/^(\+7|8)[0-9]{10}$/} // pass regex for phone number here
            placeholder="+79508999999"
          />
          <Input
            Textlabel={"СНИЛС:"}
            value={dataNewClient.snils}
            handleInputChange={handleInputChange}
            name="snils"
            regex={/^\d{3}-\d{3}-\d{3} \d{2}$/}
            placeholder="222-333-444 22"
          
          />
        </div>
        <h3>Паспортные данные</h3>
        <div className={styles.TwoInput}>
          <Input
            Textlabel={"Серия:"}
            value={dataNewClient.passportSerial}
            handleInputChange={handleInputChange}
            name="passportSerial"
            regex={/^\d{4}$/}    
            placeholder="6017" 
          />
          <Input
            Textlabel={"Номер:"}
            value={dataNewClient.passportNumber}
            handleInputChange={handleInputChange}
            name="passportNumber"
            regex={/^\d{6}$/}   
            placeholder="221122"   
          />
        </div>
        <Input
          Textlabel={"Кем выдан:"}
          value={dataNewClient.passportIssueBy}
          handleInputChange={handleInputChange}
          name="passportIssueBy"
          placeholder="УФМС России или ОУФМС России" 
        />
        <div className={styles.ThreeInput}>
          <Input
            Textlabel={"Дата выдачи:"}
            value={dataNewClient.passportIssueDate}
            handleInputChange={handleInputChange}
            name="passportIssueDate"
            type="date"
          />
          {/* <InputOnlyDate Textlabel={"Дата выдачи:"} value={dataNewClient.passportIssueDate} handleInputChange={handleInputChange} name="passportIssueDate"/> */}
          <Input
            Textlabel={"Код подразделения:"}
            value={dataNewClient.passportCode}
            handleInputChange={handleInputChange}
            name="passportCode"
            placeholder="111-111"
            regex={/^\d{3}-\d{3}$/}
          />
          {/* <InputOnlyDate Textlabel={"Дата рождения:"} value={dataNewClient.birthDate} handleInputChange={handleInputChange} name="birthDate"/> */}
          <Input
            Textlabel={"Дата рождения:"}
            value={dataNewClient.birthDate}
            handleInputChange={handleInputChange}
            name="birthDate"
            type="date"
          />
        </div>
        <h3>Водительское удостоверение</h3>
        <div className={styles.ThreeInput}>
          <Input
            Textlabel={"Серия, номер:"}
            value={dataNewClient.numberLicense}
            handleInputChange={handleInputChange}
            name="numberLicense"
            regex={/\d{2} \d{2} \d{6}/}
            placeholder={"22 33 132647"}
          />
          <Input
            Textlabel={"Категория ВУ:"}
            value={dataNewClient.categoryLicense}
            handleInputChange={handleInputChange}
            name="categoryLicense"
            regex={/^[A-Z]{1,2}$/}
            placeholder={"B"}
          />
          <Input
            Textlabel={"Период действия:"}
            value={dataNewClient.periodLicense}
            handleInputChange={handleInputChange}
            name="periodLicense"
            type="date"
          />
        </div>
        <h3>Прописка</h3>
        <Input
          Textlabel={"Адрес прописки:"}
          value={dataNewClient.addressReg}
          handleInputChange={handleInputChange}
          name="addressReg"
          placeholder={"Россия, Г.Таганрог ул..."}
        />
        <Input
          Textlabel={"Адрес фактического проживания:"}
          value={dataNewClient.actualAdress}
          handleInputChange={handleInputChange}
          name="actualAdress"
          placeholder={"Россия, Г.Таганрог ул..."}

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

export default PopUpEditDriver;
