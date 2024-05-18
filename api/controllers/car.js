import Car from '../models/car.js';
import Driver from '../models/driver.js';
import CarDto from '../dtos/car-dto.js';
import { AppErrorInvalid } from '../utils/errors.js';

export default {
    async createCar(req, res) {
        const data = req.body;
        const {
            numberCar,
            markCar,
            typeCar,
            heightCar,
            widthCar,
            lengthCar,
            volumeCar,
            loadCapacity,
            numberOfPallet,
            driverId,
        } = data;
        const driver = await Driver.findOne({ where: { id: driverId } });
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
            driverId: driver.id || null,
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

    async getCarByIdDriver({ params: { driverId } }, res) {
        const car = await Car.findAll({ where: { driverId }, include: { model: Driver } });

        const carDtos = car.map(car => new CarDto(car));

        res.json(carDtos);
    },

    async addCarToDriver({ body: { carId, driverId } }, res) {
        const driver = await Driver.findOne({ where: { id: driverId } });
        if (!driver) {
            throw new AppErrorInvalid('Driver not found');
        }
        const car = await Car.findOne({ where: { id: carId } });

        await car.update({
            driverId,
        });

        await car.reload({ include: [Driver] });
        const carDto = new CarDto(car);
        res.json(carDto);
    },
};
