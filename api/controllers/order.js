import Customer from '../models/customer.js';
import Driver from '../models/driver.js';
import Car from '../models/car.js';
import { AppErrorMissing } from '../utils/errors.js';
import OrderDto from '../dtos/order-dto.js';
import Order from '../models/order.js';
import fs from 'fs';

export default {
    async createOrder(req, res) {
        const data = req.body;
        const {
            customerId,
            driverId,
            carId,
            loading,
            unloading,
            dateBegin,
            dateEnd,
            typeCargo,
            places,
            weight,
            volume,
            price,
            salary,
            km
        } = data;

        const customer = await Customer.findOne({ where: { id: customerId } });
        if (!customer) {
            throw new AppErrorMissing('Customer not found');
        }
        const driver = await Driver.findOne({ where: { id: driverId } });
        if (!driver) {
            throw new AppErrorMissing('Driver not found');
        }
        const car = await Car.findOne({ where: { id: carId } });
        if (!car) {
            throw new AppErrorMissing('Car not found');
        }

        const order = await Order.create({
            customerId: customer.id,
            driverId: driver.id,
            carId: car.id,
            loading,
            unloading,
            dateBegin,
            dateEnd,
            typeCargo,
            places,
            weight,
            volume,
            price,
            salary,
            km
        });

        await order.reload({ include: [Customer, Driver, Car] });

        const orderDto = new OrderDto(order);

        res.json(orderDto);
    },

    async getAllOrders(req, res) {
        const orders = await Order.findAll({ include: [Customer, Driver, Car] });

        const orderDtos = orders.map(order => new OrderDto(order));

        res.json(orderDtos);
    },

    async updateOrder(
        {
            params: { orderId },
            body: {
                customerId,
                driverId,
                carId,
                loading,
                unloading,
                dateBegin,
                dateEnd,
                typeCargo,
                places,
                weight,
                volume,
                price,
                salary,
                km
            },
        },
        res
    ) {
        const customer = await Customer.findOne({ where: { id: customerId } });
        if (!customer) {
            throw new AppErrorMissing('Customer not found');
        }
        const driver = await Driver.findOne({ where: { id: driverId } });
        if (!driver) {
            throw new AppErrorMissing('Driver not found');
        }
        const car = await Car.findOne({ where: { id: carId } });
        if (!car) {
            throw new AppErrorMissing('Car not found');
        }

        const order = await Order.findOne({ where: { id: orderId } });
        if (!order) {
            throw new AppErrorMissing('Order not found');
        }

        await order.update({
            customerId: customer.id,
            driverId: driver.id,
            carId: car.id,
            loading,
            unloading,
            dateBegin,
            dateEnd,
            typeCargo,
            places,
            weight,
            volume,
            price,
            salary,
            km
        });

        await order.reload({ include: [Customer, Driver, Car] });

        const orderDto = new OrderDto(order);

        res.json(orderDto);
    },

    async changeStatus({ params: { orderId }, body: { status } }, res) {
        const order = await Order.findOne({ where: { id: orderId } });
        if (!order) {
            throw new AppErrorMissing('Order not found');
        }

        await order.update({ status });
        await order.reload({ include: [Customer, Driver, Car] });
        const orderDto = new OrderDto(order);
        res.json(orderDto);
    },

    async getOrderByDriverId({ params: { driverId } }, res) {
        const order = await Order.findAll({ where: { driverId: driverId }, include: [Customer, Driver, Car] });
        if (!order) {
            throw new AppErrorMissing('Order not found');
        }

        const orderDtos = order.map(order => new OrderDto(order));

        res.json(orderDtos);
    },
    async deleteOrder({ params: { orderId } }, res) {
        const order = await Order.findOne({ where: { id: orderId } });
        if (!order) {
            throw new AppErrorMissing('Order not found');
        }

        await order.destroy({ force: true });
        res.json({ success: true });
    },
};
