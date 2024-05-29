import fs from 'fs';
import path from 'path';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import Order from '../models/order.js';
import { AppErrorMissing } from '../utils/errors.js';
import OrderDto from '../dtos/order-dto.js';
import Car from '../models/car.js';
import Driver from '../models/driver.js';
import Customer from '../models/customer.js';
import { map as typeCarsMap } from '../config/type.js';

const formatCustomerFio = fio => {
    const [surname, name, patronymic] = fio.split(' ');
    const initialName = name ? name.charAt(0).toUpperCase() + '.' : '';
    const initialPatronymic = patronymic ? patronymic.charAt(0).toUpperCase() + '.' : '';
    return `${surname} ${initialName} ${initialPatronymic}`;
};

export default {
    async createDocument({ params: { orderId } }, res) {
        try {
            // Find order by ID
            const order = await Order.findOne({ where: { id: orderId }, include: [Customer, Driver, Car] });
            if (!order) {
                throw new AppErrorMissing('Order not found');
            }
            const data = new OrderDto(order);
            // Read the template file
            const templatePath = path.join('documents', 'template.docx');
            const content = fs.readFileSync(templatePath, 'binary');
            // Load the DOCX template
            const zip = new PizZip(content);
            const doc = new Docxtemplater(zip);

            // Prepare data for the document
            const dateContract = new Date();
            const getMonthStr = date =>
                [
                    'января',
                    'февраля',
                    'марта',
                    'апреля',
                    'мая',
                    'июня',
                    'июля',
                    'августа',
                    'сентября',
                    'октября',
                    'ноября',
                    'декабря',
                ][date.getMonth()];

            doc.setData({
                currentDate:
                    dateContract.getDate() + ' ' + getMonthStr(dateContract) + ' ' + dateContract.getFullYear(),
                customerCompany: data.customer.nameCompany,
                loading: JSON.parse(data.loading).adress,
                num: data.numberOrder,
                unloading: JSON.parse(data.unloading).adress,
                dateBegin: data.dateBegin.split(' ')[0],
                dateEnd: data.dateEnd.split(' ')[0],
                dateTimeBegin: data.dateBegin.split(' ')[1].slice(0, 5),
                dateTimeEnd: data.dateEnd.split(' ')[1].slice(0, 5),
                driverName: data.driver.name + ' ' + data.driver.surname + ' ' + data.driver.patronymic,
                driverPhone: data.driver.phoneNumber,
                customerName: data.customer.fio,
                customerPhone: data.customer.phoneNumber,
                typeCargo: data.typeCargo,
                places: data.places,
                weight: data.weight,
                volume: data.volume,
                typeCar: typeCarsMap[data.car.typeCar],
                price: data.price,
                driverFio: data.driver.name + ' ' + data.driver.surname + ' ' + data.driver.patronymic,
                driverPhone1: data.driver.phoneNumber,
                passport:
                    data.driver.passportSerial +
                    ' ' +
                    data.driver.passportNumber +
                    ' ' +
                    data.driver.passportIssueBy +
                    ' ' +
                    data.driver.passportIssueDate,
                car: data.car.numberCar + ' ' + data.car.markCar,
                customerCompanyName: data.customer.nameCompany,
                unloadingCompany: data.customer.address,
                customerPhone1: data.customer.phoneNumber,
                customerPhone2: data.customer.additionalPhoneNumber,
                customerMail: data.customer.login,
                inn: data.customer.inn,
                kpp: data.customer.kpp,
                kc: data.customer.kc,
                bik: data.customer.bik,
                customerFIO: formatCustomerFio(data.customer.fio),
            });

            // Render the document
            doc.render();

            // Generate the document buffer
            const buf = doc.getZip().generate({ type: 'nodebuffer' });

            // Define the output file path
            const fileName = path.join('documents', `${order.id}.docx`);

            // Write the generated document to the file system
            fs.writeFileSync(fileName, buf);
            console.log(`Document generation completed: ${fileName}`);
            const fileNameTrue = `${order.id}.docx`;

            // Set the response headers
            res.set({
                'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'Content-Disposition': `attachment; filename="${fileNameTrue}"`,
            });

            // Send the file to the client for download
            res.send(buf);
            console.log(`File sent: ${fileName}`);
        } catch (error) {
            console.error('Error generating document:', error);
            res.status(500).json({ success: false, message: 'Error generating document', error: error.message });
        }
    },

    async createTravel({ params: { orderId } }, res) {
        try {
            // Find order by ID
            const order = await Order.findOne({ where: { id: orderId }, include: [Customer, Driver, Car] });
            if (!order) {
                throw new AppErrorMissing('Order not found');
            }
            const data = new OrderDto(order);
            // Read the template file
            const templatePath = path.join('travels', 'template2.docx');
            const content = fs.readFileSync(templatePath, 'binary');
            // Load the DOCX template
            const zip = new PizZip(content);
            const doc = new Docxtemplater(zip);

            // Prepare data for the document
            const dateContract = new Date();
            const getMonthStr = date =>
                [
                    'января',
                    'февраля',
                    'марта',
                    'апреля',
                    'мая',
                    'июня',
                    'июля',
                    'августа',
                    'сентября',
                    'октября',
                    'ноября',
                    'декабря',
                ][date.getMonth()];

            doc.setData({
                currentDate:
                    dateContract.getDate() + ' ' + getMonthStr(dateContract) + ' ' + dateContract.getFullYear(),
                loading: JSON.parse(data.loading).adress,
                unloading: JSON.parse(data.unloading).adress,
                dateTimeEnd: data.dateEnd.split(' ')[1].slice(0, 5),
                markCar: data.car.markCar,
                numberCar: data.car.numberCar,
                driverName: data.driver.name + ' ' + data.driver.surname + ' ' + data.driver.patronymic,
                numberLicense: data.driver.numberLicense,
                categoryLicense: data.driver.categoryLicense,
                passportSerial: data.driver.passportSerial,
                passportNumber: data.driver.passportNumber,
                typeCar: typeCarsMap[data.car.typeCar],
                numberCar2: data.car.numberCar,
                driverName2: data.driver.name + ' ' + data.driver.surname + ' ' + data.driver.patronymic,
                addressCustomer: data.customer.nameCompany + ' ' + data.customer.address,
                typeCargo: data.typeCargo,
                km: data.km,
                weight: data.weight,
                totalKm: data.km,
                sWeight: data.weight,
                salary: data.salary,
            });

            // Render the document
            doc.render();

            // Generate the document buffer
            const buf = doc.getZip().generate({ type: 'nodebuffer' });

            // Define the output file path
            const fileName = path.join('travels', `${order.id}.docx`);

            // Write the generated document to the file system
            fs.writeFileSync(fileName, buf);
            console.log(`Document generation completed: ${fileName}`);
            const fileNameTrue = `${order.id}.docx`;

            // Set the response headers
            res.set({
                'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'Content-Disposition': `attachment; filename="${fileNameTrue}"`,
            });

            // Send the file to the client for download
            res.send(buf);
            console.log(`File sent: ${fileName}`);
        } catch (error) {
            console.error('Error generating document:', error);
            res.status(500).json({ success: false, message: 'Error generating document', error: error.message });
        }
    },
};
