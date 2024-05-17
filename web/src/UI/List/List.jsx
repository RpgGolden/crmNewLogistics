import React, { useEffect, useState } from "react";
import styles from "./List.module.scss";
import DataContext from "../../context";

function List({ data, Textlabel, defaultValue }) {
    const { context } = React.useContext(DataContext);

    
    const [activeList, setactiveList] = useState(false);
    const [nameClient, setnameClient] = useState("");
    const addClient = (el) =>{
        setnameClient(el);
        setactiveList(!activeList)
        if(el === "Заказы" || el === "Водители" || el === "Клиенты"){
            context.setSelectedTable(el)
        }
    }

    useEffect(()=>{
        setnameClient(defaultValue)
    },[])
    return (
        <div className={styles.List}>
            <div >
                {Textlabel &&
                   <div>
                        <label>{Textlabel}</label>
                    </div>
                }
                <div className={styles.ListCont}>
                    <input readOnly onClick={() => setactiveList(!activeList)} value={nameClient}/>
                    <span onClick={() => setactiveList(!activeList)} className={styles.arrowBot}>
                        <img style={{ transform: activeList ? "rotate(0deg)" : "rotate(-90deg)" }} src="./img/arrow_bottom.svg" />
                    </span>
                </div>
                {activeList &&
                 <div className={styles.ListData}>
                    {data.map((item) => ( 
                        <p className={styles.NameForList} onClick={()=>addClient(item.name)} key={item.id}>{item.name}</p> 
                    ))}
                </div>
                }
               
            </div>
        </div>
    );
}

export default List;
