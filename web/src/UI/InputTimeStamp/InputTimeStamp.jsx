import styles from "./InputTimeStamp.module.scss";

function InputTimeStamp({name, margin}){


   return(
        <div className={styles.inputTime}>
        <div className={styles.inputDate} >
            <div style={{ marginRight: `${margin}px` }}> <p>{name}</p> </div>
            <div>  <input type="date"/></div>
        </div>
        <div> <input type="time"/></div>
    </div>
    )
}
export default InputTimeStamp;