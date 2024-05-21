import Customer from '../models/customer.js';
import CustomerDto from '../dtos/customer-dto.js';
import { AppErrorInvalid, AppErrorMissing } from '../utils/errors.js';

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
    async deleteCustomer({ params: { customerId } }, res) {
        const customer = await Customer.findOne({ where: { id: customerId } });
        if (!customer) {
            throw new AppErrorInvalid('Customer not found');
        }
        await customer.destroy({ force: true });
        res.json({ success: true });
    },
    
    async updateProfileCustomer({ params: { customerId }, body: { fio, login, phoneNumber, additionalPhoneNumber } },res) {
        const customer = await Customer.findOne({ where: { id: customerId } });
        if (!customer) {
            throw new AppErrorMissing('Customer not found');
        }

        await customer.update({
            fio,
            login,
            phoneNumber,
            additionalPhoneNumber
        });

        const profileDto = new CustomerDto(customer);
        res.json(profileDto);
    },

    async getCustomer({ params: { customerId } }, res) {
        const customer = await Customer.findOne({ where: { id: customerId } });
        if (!customer) {
            throw new AppErrorMissing('Customer not found');
        }
        console.log(customer)
        const customerDto = new CustomerDto(customer);
        res.json(customerDto);
    },
};
