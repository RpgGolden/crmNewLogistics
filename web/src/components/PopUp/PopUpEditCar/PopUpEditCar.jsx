import React from "react";

export function PopUpEditCar(){
    return(
        <PopUpContainer title={"Редактирование авто"} mT={200}>
        <div className={styles.newCarInnew}>
        <Input
            Textlabel={"Марка авто:"}
            value={context.carData.markCar}
            itemKey={"markCar"}
            onChangeInput={onChangeInput}
        />

        <Input
            Textlabel={"Номер авто:"}
            placeholder={"A000AA000"}
            itemKey={"numberCar"}
            value={context.carData.numberCar}
            onChangeInput={onChangeInput}
        />
        <Input
            placeholder="1"
            Textlabel={"Тип авто:"}
            value={context.carData.markCtypeCarar}
            itemKey={"typeCar"}
            onChangeInput={onChangeInput}
        />
        <div className={styles.type1}>
            <Input
            Textlabel={"Длина, м:"}
            itemKey={"lengthCar"}
            value={context.carData.lengthCar}
            onChangeInput={onChangeInput}
            />
            <Input
            Textlabel={"Ширина, м:"}
            value={context.carData.widthCar}
            itemKey={"widthCar"}
            onChangeInput={onChangeInput}
            />
            <Input
            Textlabel={"Высота, м:"}
            value={context.carData.heightCar}
            itemKey={"heightCar"}
            onChangeInput={onChangeInput}
            />
            <Input
            Textlabel={"Объем, м3:"}
            value={context.carData.volumecare}
            itemKey={"volumeCar"}
            onChangeInput={onChangeInput}
            />
        </div>
        <div className={styles.type2}>
            <Input
            Textlabel={"Грузоподъемность, т:"}
            value={context.carData.loadCapacity}
            itemKey={"loadCapacity"}
            onChangeInput={onChangeInput}
            />
            <Input
            Textlabel={"Количество палет:"}
            value={context.carData.numberOfPallet}
            itemKey={"numberOfPallet"}
            onChangeInput={onChangeInput}
            />
        </div>
        <div className={styles.button}>
            <button className={styles.buttonSave} onClick={clickAddCar}>
            Добавить
            </button>
        </div>
        </div>
    </PopUpContainer>
    )
}