import CustomerDto from './customer-dto.js';
import DriverDto from './profile-dto.js';
import CarDto from './car-dto.js';
export default class OrderDto {
    id;
    numberOrder;
    customer;
    driver;
    car;
    loading;
    unloading;
    dateBegin;
    dateEnd;
    typeCargo;
    places;
    weight;
    volume;
    price;
    salary;
    km;
    tarifklHors;
    tarifklKm;
    tarifispHors;
    tarifispKm;
    paidKl;
    paidIsp;
    status;
    constructor(model) {
        this.id = model.id;
        this.numberOrder = model.numberOrder;
        this.customer = model.Customer ? new CustomerDto(model.Customer) : null;
        this.driver = model.Driver ? new DriverDto(model.Driver) : null;
        this.car = model.Car ? new CarDto(model.Car) : null;
        this.loading = model.loading;
        this.unloading = model.unloading;
        this.dateBegin = model.dateBegin;
        this.dateEnd = model.dateEnd;
        this.typeCargo = model.typeCargo;
        this.places = model.places;
        this.weight = model.weight;
        this.volume = model.volume;
        this.price = model.price;
        this.salary = model.salary;
        this.km = model.km;
        this.tarifklHors = model.tarifklHors;
        this.tarifklKm = model.tarifklKm;
        this.tarifispHors = model.tarifispHors;
        this.tarifispKm = model.tarifispKm;
        this.paidKl = model.paidKl;
        this.paidIsp = model.paidIsp;
        this.status = model.status;
    }
}
