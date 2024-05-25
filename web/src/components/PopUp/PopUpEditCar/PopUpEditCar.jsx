import React, { useState } from "react";
import Input from "../PopUpNewCar/InputNewCar/Input";
import PopUpContainer from "../../../UI/PopUpContainer/PopUpContainer";
import styles from "./PopUpEditCar.module.scss";
import DataContext from "../../../context";

export function PopUpEditCar(){
    const { context } = React.useContext(DataContext);
    const [dataCar, setdataCar] = useState({
        numberCar: null,
        markCar: null,
        typeCar: null,
        heightCar: null,
        widthCar: null,
        lengthCar: null,
        volumeCar: null,
        loadCapacity: null,
        numberOfPallet: null,
        driverId: null,
    })

    const handleInputChange = (name, value) => {
        setdataCar(prevState => ({ ...prevState, [name]: value }));
    }
    return(
        <PopUpContainer title={"Редактирование авто"} mT={200}>
        <div className={styles.newCarInnew}>
        <Input
            Textlabel={"Марка авто:"}
            name={"markCar"}
            handleInputChange={handleInputChange}
        />

        <Input
            Textlabel={"Номер авто:"}
            placeholder={"A000AA000"}
            name={"numberCar"}
            handleInputChange={handleInputChange}        />
        <Input
            placeholder="1"
            Textlabel={"Тип авто:"}
            name={"typeCar"}
            handleInputChange={handleInputChange}
        />
        <div className={styles.type1}>
            <Input
            Textlabel={"Длина, м:"}
            name={"lengthCar"}
            handleInputChange={handleInputChange}
            />
            <Input
            Textlabel={"Ширина, м:"}
            name={"widthCar"}
            handleInputChange={handleInputChange}
            />
            <Input
            Textlabel={"Высота, м:"}
            name={"heightCar"}
            handleInputChange={handleInputChange}
            />
            <Input
            Textlabel={"Объем, м3:"}
            name={"volumeCar"}
            handleInputChange={handleInputChange}
            />
        </div>
        <div className={styles.type2}>
            <Input
            Textlabel={"Грузоподъемность, т:"}
            name={"loadCapacity"}
            handleInputChange={handleInputChange}
            />
            <Input
            Textlabel={"Количество палет:"}
            name={"numberOfPallet"}
            handleInputChange={handleInputChange}
            />
        </div>
        <div className={styles.button}>
            <button className={styles.buttonSave} >
            Добавить
            </button>
        </div>
        </div>
    </PopUpContainer>
    )
}