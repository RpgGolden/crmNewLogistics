import { DataTypes, Model } from 'sequelize';
import EnumType from '../config/type.js';

export default class Document extends Model {
    static initialize(sequelize) {
        Document.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                url: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                orderId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
            },
            {
                sequelize,
                schema: 'public',
                modelName: 'Document',
                tableName: 'documents',
                paranoid: true,
            }
        );
    }
}
