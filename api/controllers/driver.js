import Driver from '../models/driver.js';
import { AppErrorMissing } from '../utils/errors.js';
import ProfileDto from '../dtos/profile-dto.js';
import User from '../models/user.js';
import roles from '../config/roles.js';

export default {
    async getProfile(req, res) {
        const driver = await Driver.findOne({ where: { userId: req.user.id } });
        console.log(req.user.id)
        if (!driver) {
            throw new AppErrorMissing('Driver not found');
        }
        const profile = new ProfileDto(driver);
        res.json(profile);
    },

    async updateProfile(req, res) {
        const driver = await Driver.findOne({ where: { userId: req.user.id } });
        if (!driver) {
            throw new AppErrorMissing('Driver not found');
        }
        const data = req.body;
        const {
            name,
            surname,
            patronymic,
            phoneNumber,
            inn,
            additionalPhoneNumber,
            snils,
            passportSerial,
            passportNumber,
            passportIssueBy,
            passportIssueDate,
            passportCode,
            birthDate,
            addressReg,
            actualAdress,
            numberLicense,
            categoryLicense,
            periodLicense,
        } = data;

        await driver.update({
            name,
            surname,
            patronymic,
            phoneNumber,
            inn,
            additionalPhoneNumber,
            snils,
            passportSerial,
            passportNumber,
            passportIssueBy,
            passportIssueDate,
            passportCode,
            birthDate,
            addressReg,
            actualAdress,
            numberLicense,
            categoryLicense,
            periodLicense,
        });

        const profileDto = new ProfileDto(driver);
        res.json(profileDto);
    },
    async getAllDrivers(req, res) {
        // Получить всех драйверов роль которых driver
        const drivers = await Driver.findAll({
            include: {
                model: User,
                where: { role: roles.DRIVER },
            },
        });
        const driverDtos = drivers.map(driver => new ProfileDto(driver));
        res.json(driverDtos);
    },
    async getDriver({ params: { driverId } }, res) {
        const driver = await Driver.findOne({ where: { id: driverId } });
        if (!driver) {
            throw new AppErrorMissing('Driver not found');
        }
        const profileDto = new ProfileDto(driver);
        res.json(profileDto);
    },
    async updateProfileByAdmin(
        {
            params: { driverId },
            body: {
                name,
                surname,
                patronymic,
                phoneNumber,
                inn,
                additionalPhoneNumber,
                snils,
                passportSerial,
                passportNumber,
                passportIssueBy,
                passportIssueDate,
                passportCode,
                birthDate,
                addressReg,
                actualAdress,
                numberLicense,
                categoryLicense,
                periodLicense,
            },
        },
        res
    ) {
        const driver = await Driver.findOne({ where: { id: driverId } });
        if (!driver) {
            throw new AppErrorMissing('Driver not found');
        }

        await driver.update({
            name,
            surname,
            patronymic,
            phoneNumber,
            inn,
            additionalPhoneNumber,
            snils,
            passportSerial,
            passportNumber,
            passportIssueBy,
            passportIssueDate,
            passportCode,
            birthDate,
            addressReg,
            actualAdress,
            numberLicense,
            categoryLicense,
            periodLicense,
        });

        const profileDto = new ProfileDto(driver);
        res.json(profileDto);
    },

    async deleteDriver({ params: { driverId } }, res) {
        const driver = await Driver.findOne({ where: { id: driverId } });
        if (!driver) {
            throw new AppErrorMissing('Driver not found');
        }

        await driver.destroy({ force: true });
        res.json({ success: true });
    },
};
