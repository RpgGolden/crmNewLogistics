import Customer from '../models/customer.js';
import CustomerDto from '../dtos/customer-dto.js';
import { AppErrorInvalid, AppErrorMissing } from '../utils/errors.js';

export default {
    async createCustomer(req, res) {
        const data = req.body;
        const { nameCompany, fio, login, phoneNumber, additionalPhoneNumber, address, inn, kc, bik, kpp} = data;
        const customer = await Customer.create({
            nameCompany,
            fio,
            login,
            phoneNumber,
            additionalPhoneNumber,
            address,
            inn,
            kc,
            bik,
            kpp
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
    
    async updateProfileCustomer({ params: { customerId }, body: { nameCompany, fio, login, phoneNumber, additionalPhoneNumber, address, inn, kc, bik, kpp } },res) {
        const customer = await Customer.findOne({ where: { id: customerId } });
        if (!customer) {
            throw new AppErrorMissing('Customer not found');
        }

        await customer.update({
            nameCompany,
            fio,
            login,
            phoneNumber,
            additionalPhoneNumber,
            address,
            inn,
            kc,
            bik,
            kpp
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
