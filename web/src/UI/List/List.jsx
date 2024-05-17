import React, { useState } from "react";
import styles from "./List.module.scss";

function List({ data, Textlabel }) {
    const testData = [
        {
            id: 1,
            name: "Иванов Иван Кузьмич"
        },
        {
            id: 2,
            name: "Петров Василий Иванович"
        }
    ];
    
    const [activeList, setactiveList] = useState(false);
    const [nameClient, setnameClient] = useState("");
    const addClient = (name) =>{
        setnameClient(name);
        setactiveList(!activeList)
    }
    return (
        <div className={styles.List}>
            <div>
                <div>
                    <label>{Textlabel}</label>
                </div>
                <input readOnly onClick={() => setactiveList(!activeList)} value={nameClient}/>
                <span onClick={() => setactiveList(!activeList)} className={styles.arrowBot}>
                    <img style={{ transform: activeList ? "rotate(0deg)" : "rotate(-90deg)" }} src="./img/arrow_bottom.svg" />
                </span>
                {activeList &&
                 <div className={styles.ListData}>
                    {testData.map((item) => ( 
                        <p className={styles.NameForList} onClick={()=>addClient(item.name)} key={item.id}>{item.name}</p> 
                    ))}
                </div>
                }
               
            </div>
        </div>
    );
}

export default List;
