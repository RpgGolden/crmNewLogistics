import ProfileDto from './profile-dto.js';

export default class CarDto {
    id;
    numberCar;
    markCar;
    typeCar;
    heightCar;
    widthCar;
    lengthCar;
    volumeCar;
    loadCapacity;
    numberOfPallet;

    constructor(model) {
        this.id = model.id;
        this.numberCar = model.numberCar;
        this.markCar = model.markCar;
        this.typeCar = model.typeCar;
        this.heightCar = model.heightCar;
        this.widthCar = model.widthCar;
        this.lengthCar = model.lengthCar;
        this.volumeCar = model.volumeCar;
        this.loadCapacity = model.loadCapacity;
        this.numberOfPallet = model.numberOfPallet;
        this.driver = model.Driver ? new ProfileDto(model.Driver) : null;
    }
}
