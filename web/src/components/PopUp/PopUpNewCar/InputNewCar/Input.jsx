// Input.js
import React, { useState } from "react";
import styles from "./Input.module.scss";
import DataContext from "../../context";

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
  const [typeCar, settypeCar] = useState(null);

  const selectTypeCar = () => {
    settypeCarShow(!typeCarShow);
  };

  const selectLi = (type) => {
    settypeCar(type);
    settypeCarShow(false);
    let cd = { ...context.carData };
    cd[itemKey] = type;
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
                  {context.brands.map((brand) => (
                    <li key={brand} onClick={() => selectLi(brand)}>
                      {brand}
                    </li>
                  ))}
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
