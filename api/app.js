import express from 'express';
import cookieParser from 'cookie-parser';
import corsMiddleware from './middlewares/cors.js';
import dbUtils from './utils/db.js';
import authRoute from './routes/auth.js';
import driverRoute from './routes/driver.js';
import carRoute from './routes/car.js';
import customerRoute from './routes/customer.js';
import orderRoute from './routes/order.js';

// import testUtil from './utils/test-data.js';

import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

(async function initDb() {
    try {
        await dbUtils.initializeDbModels();
        // await testUtil.fillDoctors();
    } catch (e) {
        console.log(e);
        console.log('COULD NOT CONNECT TO THE DB, retrying in 5 seconds');
        setTimeout(initDb, 5000);
    }
})();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(corsMiddleware);

app.use('/auth', authRoute);
app.use('/driver', driverRoute);
app.use('/car', carRoute);
app.use('/customer', customerRoute);
app.use('/order', orderRoute);

app.listen(PORT, () => console.log(`Listen on :${PORT}`));
