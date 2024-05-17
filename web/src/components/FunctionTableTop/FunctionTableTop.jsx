import React, { useEffect, useState } from "react";
import styles from "./FunctionTableTop.module.scss";
import List from "../../UI/List/List";
import Input from "../../UI/Input/Input";
import DataContext from "../../context";
import { testData } from "../../DataApi";

function FunctionTableTop() {
    const TableName= [
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
    const { context } = React.useContext(DataContext);
    const [textSearchTableData, settextSearchTableData] = useState("")

    const filteredData = (searchText) => {
        const filteredData = testData.filter(item => {
            for (let key in item) {
                if (typeof item[key] === 'string' && item[key].toLowerCase().includes(searchText.toLowerCase())) {
                    return true;
                }
            }
            return false;
        });
        context.setTableData(filteredData); // Move this line here
    }

    useEffect(() => {
        if (textSearchTableData) {
            filteredData(textSearchTableData);
        } else {
            context.setTableData(testData); // Set original data if search text is empty
        }
    }, [textSearchTableData]);

    return (
        <>
            <div className={styles.FunctionTableTop}>
                <div className={styles.container}>
                    <List  data={TableName} defaultValue={defaultValue}/>
                    <div className={styles.searchForTable}>
                        <Input placeholder={"Поиск..."} settextSearchTableData={settextSearchTableData}/>
                        <img src="./img/Search_light.png"/>
                    </div>
                    <div class={styles.filterMenu}>

                    </div>
                </div>
            </div>
        </>
    );
}

export default FunctionTableTop;
