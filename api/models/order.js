import { DataTypes, Model } from 'sequelize';
import EnumStatus from '../config/status.js';

export default class Order extends Model {
    static initialize(sequelize) {
        Order.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                numberOrder: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                customerId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                driverId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                carId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                loading: {
                    type: DataTypes.JSON,
                    allowNull: false,
                },
                unloading: {
                    type: DataTypes.JSON,
                    allowNull: false,
                },
                dateBegin: {
                    type: DataTypes.JSON,
                    allowNull: false,
                },
                dateEnd: {
                    type: DataTypes.JSON,
                    allowNull: false,
                },
                typeCargo: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                places: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                weight: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                },
                volume: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                },
                price: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                },
                salary: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                },
                km: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                },
                tarifklHors: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                    defaultValue: 1000,
                },
                tarifklKm: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                    defaultValue: 25,
                },
                tarifispHors: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                    defaultValue: 400,
                },
                tarifispKm: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                    defaultValue: 25,
                },
                paidKl: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
                paidIsp: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
                status: {
                    type: DataTypes.SMALLINT,
                    allowNull: false,
                    validate: {
                        isIn: [Object.values(EnumStatus)],
                    },
                    defaultValue: EnumStatus.Создан,
                },
            },
            {
                sequelize,
                schema: 'public',
                modelName: 'Order',
                tableName: 'orders',
                paranoid: true,
            }
        );
    }
}
