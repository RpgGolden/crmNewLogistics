import { models } from './index.js';
const { User, TokenSchema, Driver, Car, Customer, Order } = models;

export default function () {
    User.hasOne(TokenSchema, { foreignKey: 'userId' });
    TokenSchema.belongsTo(User, { foreignKey: 'userId' });

    User.hasOne(Driver, { foreignKey: 'userId'});
    Driver.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true });

    Driver.hasMany(Car);
    Car.belongsTo(Driver);

    Customer.hasOne(Order);
    Order.belongsTo(Customer);

    Car.hasOne(Order);
    Order.belongsTo(Car);

    Driver.hasOne(Order);
    Order.belongsTo(Driver);
}
