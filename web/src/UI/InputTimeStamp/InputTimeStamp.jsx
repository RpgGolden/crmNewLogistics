import styles from "./InputTimeStamp.module.scss";

function InputTimeStamp({ name, margin, handleInputChange }) {
  const inpChange = (e) => {
    handleInputChange(name, e.target.value);
  };
  return (
    <div className={styles.inputTime}>
      <div className={styles.inputDate}>
        <div style={{ marginRight: `${margin}px` }}>
          <p>{name}</p>
        </div>
        <div>
          <input onChange={inpChange} type="date" />
        </div>
      </div>
      <div>
        <input onChange={inpChange} type="time" />
      </div>
    </div>
  );
}
export default InputTimeStamp;
