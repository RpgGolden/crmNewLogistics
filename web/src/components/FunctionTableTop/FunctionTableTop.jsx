import React from "react";
import styles from "./FunctionTableTop.module.scss";
import List from "../../UI/List/List";


function FunctionTableTop() {
    const TableData= [
        {
            id: 1,
            name: "Заказы"
        },
        {
            id: 2,
            name: "Клиенты"
        },
        {
            id: 2,
            name: "Водители"
        }
    ]
    const defaultValue = "Заказы" 
    
    return (
        <>
            <div className={styles.FunctionTableTop}>
                <div className={styles.container}>
                    <List data={TableData} defaultValue={defaultValue}/>
                </div>
            </div>
        </>
    );
}

export default FunctionTableTop;
