import { Router } from 'express';
import orderController from '../controllers/order.js';
import { asyncRoute } from '../utils/errors.js';
import { authenticateToken } from '../middlewares/checkToken.js';
import checkRole from '../middlewares/checkRoles.js';
import roles from '../config/roles.js';

const router = Router();

router
    .route('/getAllOrders')
    .get(
        authenticateToken,
        asyncRoute(checkRole([roles.DRIVER, roles.ADMINISTRATOR])),
        asyncRoute(orderController.getAllOrders)
    );
router
    .route('/createOrder')
    .post(
        authenticateToken,
        asyncRoute(checkRole([roles.DRIVER, roles.ADMINISTRATOR])),
        asyncRoute(orderController.createOrder)
    );

router
    .route('/updateOrder/:orderId')
    .post(
        authenticateToken,
        asyncRoute(checkRole([roles.DRIVER, roles.ADMINISTRATOR])),
        asyncRoute(orderController.updateOrder)
    );
router
    .route('/changeStatus/:orderId')
    .post(authenticateToken, asyncRoute(checkRole([roles.ADMINISTRATOR])), asyncRoute(orderController.changeStatus));
router
    .route('/getOrderByDriverId/:driverId')
    .get(
        authenticateToken,
        asyncRoute(checkRole([roles.DRIVER, roles.ADMINISTRATOR])),
        asyncRoute(orderController.getOrderByDriverId)
    );
router
    .route('/deleteOrder/:orderId')
    .delete(authenticateToken, asyncRoute(checkRole([roles.ADMINISTRATOR])), asyncRoute(orderController.deleteOrder));
export default router;
