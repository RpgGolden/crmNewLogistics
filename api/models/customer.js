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
