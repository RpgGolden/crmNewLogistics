// Input.js
import React, { useEffect, useState } from "react";
import styles from "./Input.module.scss";
import DataContext from "../../context";
import axios from "axios";

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

  const [brands, setBrands] = useState([]);
  const [typeCarShow, settypeCarShow] = useState(false);
  const [typeCar, settypeCar] = useState(null);

  useEffect(() => {
    // Отправить запрос к бесплатному API
    axios(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/truck?format=json"
    )
      .then((response) => {
        console.log(response.data);
        // Сохранить список марок авто в состоянии
        setBrands(response.data.Results.map((brand) => brand.MakeName));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
                  {brands.map((brand) => (
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
