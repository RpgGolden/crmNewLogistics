import Customer from '../models/customer.js';
import CustomerDto from '../dtos/customer-dto.js';

export default {
    async createCustomer(req, res) {
        const data = req.body;
        const { fio, login, phoneNumber, additionalPhoneNumber } = data;
        const customer = await Customer.create({
            fio,
            login,
            phoneNumber,
            additionalPhoneNumber,
        });
        const customerDto = new CustomerDto(customer);
        res.json(customerDto);
    },

    async getAllCustomers(req, res) {
        const customers = await Customer.findAll();

        const customerDtos = customers.map(customer => new CustomerDto(customer));

        res.json(customerDtos);
    },
};
