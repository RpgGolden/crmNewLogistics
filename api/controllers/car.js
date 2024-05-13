import Car from '../models/car.js';
import Driver from '../models/driver.js';
import CarDto from '../dtos/car-dto.js';

export default {
    async createCar(req, res) {
        const data = req.body;
        const driver = await Driver.findOne({ where: { userId: req.user.id } });
        console.log(driver);
        const { numberCar, markCar, typeCar, heightCar, widthCar, lengthCar, volumeCar, loadCapacity, numberOfPallet } =
            data;
        const car = await Car.create({
            numberCar,
            markCar,
            typeCar,
            heightCar,
            widthCar,
            lengthCar,
            volumeCar,
            loadCapacity,
            numberOfPallet,
            driverId: driver.id,
        });

        await car.reload({ include: [Driver] });
        const carDto = new CarDto(car);
        res.json(carDto);
    },

    async getAllCars(req, res) {
        const car = await Car.findAll({ include: { model: Driver } });

        const cars = car.map(car => new CarDto(car));
        res.json(cars);
    },
};
