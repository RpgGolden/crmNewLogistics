import { DataTypes, Model } from 'sequelize';

export default class Driver extends Model {
    static initialize(sequelize) {
        Driver.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        is: /^[А-Я][а-я]*$/,
                    },
                },
                surname: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        is: /^[А-Я][а-я]*$/,
                    },
                },
                patronymic: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        is: /^[А-Я][а-я]*$/,
                    },
                },
                phoneNumber: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                inn: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                additionalPhoneNumber: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                snils: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                passportSerial: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                passportNumber: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                passportIssueBy: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                passportIssueDate: {
                    type: DataTypes.DATEONLY,
                    allowNull: true,
                },
                passportCode: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                birthDate: {
                    type: DataTypes.DATEONLY,
                    allowNull: true,
                },
                addressReg: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                actualAdress: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                numberLicense: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                categoryLicense: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                periodLicense: {
                    type: DataTypes.DATEONLY,
                    allowNull: true,
                },
                userId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
            },
            {
                sequelize,
                schema: 'public',
                modelName: 'Driver',
                tableName: 'drivers',
                paranoid: true,
            }
        );
    }
}
