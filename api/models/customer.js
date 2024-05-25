import { DataTypes, Model } from 'sequelize';

export default class Customer extends Model {
    static initialize(sequelize) {
        Customer.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                nameCompany: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                fio: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                login: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        isEmail: { msg: 'Must be an email address.' },
                    },
                },
                phoneNumber: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                additionalPhoneNumber: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                address: {
                    type: DataTypes.JSON,
                    allowNull: true,
                },
                inn: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                kc: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                bik: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                kpp: {
                    type: DataTypes.STRING,
                    allowNull: true,
                }
            },
            {
                sequelize,
                schema: 'public',
                modelName: 'Customer',
                tableName: 'customers',
                paranoid: true,
            }
        );
    }
}
