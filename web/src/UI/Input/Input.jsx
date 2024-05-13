import React from "react";
import styles from "./Input.module.scss";

function Input({Textlabel}) {
    return (
        <div className={styles.input}>
            <div>
                <label>{Textlabel}</label>
            </div>
            <input/>
        </div>
    );
}

export default Input;
