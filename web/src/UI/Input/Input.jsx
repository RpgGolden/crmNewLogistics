import React from "react";
import styles from "./Input.module.scss";

function Input({Textlabel}) {
    return (
        <div className={styles.input}>
            <div>
                <div>
                    <label>{Textlabel}</label>
                </div>
                <input/>
            </div>
        </div>
    );
}

export default Input;
