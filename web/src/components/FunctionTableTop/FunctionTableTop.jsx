import React, { useEffect, useState } from "react";
import styles from "./FunctionTableTop.module.scss";
import List from "../../UI/List/List";
import Input from "../../UI/Input/Input";
import DataContext from "../../context";


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
    const { context } = React.useContext(DataContext);
    const [textSearchTableData, settextSearchTableData] = useState("")
    
    useEffect(()=>{
        console.log(textSearchTableData)
        context.setsearchDataForTable(textSearchTableData)
        
    },[textSearchTableData])

    return (
        <>
            <div className={styles.FunctionTableTop}>
                <div className={styles.container}>
                    <List data={TableData} defaultValue={defaultValue}/>
                    <div className={styles.searchForTable}>
                        <Input placeholder={"Поиск..."} settextSearchTableData={settextSearchTableData}/>
                        <img src="./img/Search_light.png"/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FunctionTableTop;
