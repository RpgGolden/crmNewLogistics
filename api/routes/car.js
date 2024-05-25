import { Router } from 'express';
import carController from '../controllers/car.js';
import { asyncRoute } from '../utils/errors.js';
import { authenticateToken } from '../middlewares/checkToken.js';
import checkRole from '../middlewares/checkRoles.js';
import roles from '../config/roles.js';

const router = Router();

router
    .route('/getAllCars')
    .get(
        authenticateToken,
        asyncRoute(checkRole([roles.DRIVER, roles.ADMINISTRATOR])),
        asyncRoute(carController.getAllCars)
    );
router
    .route('/createCar')
    .post(
        authenticateToken,
        asyncRoute(checkRole([roles.DRIVER, roles.ADMINISTRATOR])),
        asyncRoute(carController.createCar)
    );
router
    .route('/getCars/:driverId')
    .get(
        authenticateToken,
        asyncRoute(checkRole([roles.DRIVER, roles.ADMINISTRATOR])),
        asyncRoute(carController.getCarByIdDriver)
    );
router
    .route('/addCarToDriver')
    .post(
        authenticateToken,
        asyncRoute(checkRole([roles.ADMINISTRATOR, roles.DRIVER])),
        asyncRoute(carController.addCarToDriver)
    );
router
    .route('/deleteCar/:carId')
    .delete(
        authenticateToken,
        asyncRoute(checkRole([roles.ADMINISTRATOR, roles.DRIVER])),
        asyncRoute(carController.deleteCar)
    );
router
    .route('/updateCar/:carId')
    .post(
        authenticateToken,
        asyncRoute(checkRole([roles.ADMINISTRATOR, roles.DRIVER])),
        asyncRoute(carController.updateCar)
    );

export default router;
