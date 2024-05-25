// Input.js
import React, { useState } from "react";
import styles from "./Input.module.scss";
import DataContext from "../../../../context";

function Input({
  Textlabel,
  placeholder,
  handleInputChange,
  name,
  value,
  onChangeInput,
  itemKey,
}) {
  // const [textInput, settextInput] = useState("");

  // const InputText = (e) => {
  //   settextInput(e.target.value);
  //   handleInputChange && handleInputChange(name, e.target.value);
  // };
  const { context } = React.useContext(DataContext);

  const [typeCarShow, settypeCarShow] = useState(false);
  const [typeCarShowNuber, settypeCarShowNuber] = useState(false);

  const [typeCar, settypeCar] = useState(null);
  const [typeCarNumber, settypeCarNuber] = useState(null);

  const selectTypeCar = () => {
    settypeCarShow(!typeCarShow);
  };
  const selectTypeCarNumber = () => {
    settypeCarShowNuber(!typeCarShowNuber);
  };

  const selectLi = (type) => {
    settypeCar(type);
    settypeCarShow(false);
    let cd = { ...context.carData };
    cd[itemKey] = type;
    context.setCarData(cd);
  };

  const selectLiNuber = (type, num) => {
    console.log(type, num);
    settypeCarShowNuber(false);
    settypeCarNuber(type);
    let cd = { ...context.carData };
    cd["typeCar"] = num;
    context.setCarData(cd);
  };

  return (
    <div className={styles.input}>
      {itemKey === "markCar" ? (
        <div>
          <div>
            <div>
              <label>{Textlabel}</label>
            </div>
            <input
              style={{ cursor: "pointer" }}
              value={typeCar}
              onClick={selectTypeCar}
              placeholder={placeholder}
            />
            {typeCarShow && (
              <div className={styles.list}>
                <ul>
                  {context.brands.map((brand, index) => (
                    <li key={index} onClick={() => selectLi(brand)}>
                      {brand}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : itemKey === "typeCar" ? (
        <div>
          <div>
            <div>
              <label>{Textlabel}</label>
            </div>
            <input
              style={{ cursor: "pointer" }}
              value={typeCarNumber}
              onClick={selectTypeCarNumber}
              placeholder={placeholder}
            />
            {typeCarShowNuber && (
              <div style={{ height: "auto" }} className={styles.list}>
                <ul style={{ height: "auto" }}>
                  <li onClick={() => selectLiNuber("Тентовый 5т", 1)}>
                    Тентовый 5т
                  </li>
                  <li onClick={() => selectLiNuber("Контейнер", 2)}>
                    Контейнер
                  </li>
                  <li onClick={() => selectLiNuber("Микро автобус", 3)}>
                    Микро автобус
                  </li>
                  <li onClick={() => selectLiNuber("Газель 6м", 4)}>
                    Газель 6м
                  </li>
                  <li onClick={() => selectLiNuber("Еврофура 82м", 5)}>
                    Еврофура 82м
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div>
            <label>{Textlabel}</label>
          </div>
          <input
            value={value}
            onChange={(e) => onChangeInput(e, itemKey)}
            placeholder={placeholder}
          />
        </div>
      )}
    </div>
  );
}

export default Input;
