// Input.js
import React, { useState } from "react";
import styles from "./Input.module.scss";
import DataContext from "../../context";

function Input({ Textlabel, placeholder, handleInputChange, name }) {
  const [textInput, settextInput] = useState("");

  const InputText = (e) => {
    settextInput(e.target.value);
    handleInputChange && handleInputChange(name, e.target.value);
  };

  return (
    <div className={styles.input}>
      <div>
        <div>
          <label>{Textlabel}</label>
        </div>
        <input onChange={(e) => InputText(e)} placeholder={placeholder} />
      </div>
    </div>
  );
}

export default Input;
