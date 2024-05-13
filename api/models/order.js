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
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                unloading: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                dateBegin: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                dateEnd: {
                    type: DataTypes.DATE,
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
