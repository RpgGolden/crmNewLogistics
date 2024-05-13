import { DataTypes, Model } from 'sequelize';
import EnumType from '../config/type.js';

export default class Car extends Model {
    static initialize(sequelize) {
        Car.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                numberCar: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                markCar: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                typeCar: {
                    type: DataTypes.SMALLINT,
                    allowNull: false,
                    validate: {
                        isIn: [Object.values(EnumType)],
                    },
                },
                heightCar: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                },
                widthCar: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                },
                lengthCar: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                },
                volumeCar: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                },
                loadCapacity: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                },
                numberOfPallet: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                driverId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
            },
            {
                sequelize,
                schema: 'public',
                modelName: 'Car',
                tableName: 'cars',
                paranoid: true,
            }
        );
    }
}
