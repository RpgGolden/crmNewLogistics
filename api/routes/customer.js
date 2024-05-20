import { Router } from 'express';
import customerController from '../controllers/customer.js';
import { asyncRoute } from '../utils/errors.js';
import { authenticateToken } from '../middlewares/checkToken.js';
import checkRole from '../middlewares/checkRoles.js';
import roles from '../config/roles.js';

const router = Router();

router
    .route('/createCustomer')
    .post(
        authenticateToken,
        asyncRoute(checkRole([roles.DRIVER, roles.ADMINISTRATOR])),
        asyncRoute(customerController.createCustomer)
    );
router
    .route('/getAllCustomers')
    .get(
        authenticateToken,
        asyncRoute(checkRole([roles.DRIVER, roles.ADMINISTRATOR])),
        asyncRoute(customerController.getAllCustomers)
    );
router
    .route('/deleteCustomer/:customerId')
    .delete(
        authenticateToken,
        asyncRoute(checkRole([roles.ADMINISTRATOR])),
        asyncRoute(customerController.deleteCustomer)
    );
router
    .route('/updateCustomer/:customerId')
    .post(
        authenticateToken,
        asyncRoute(checkRole([roles.DRIVER, roles.ADMINISTRATOR])),
        asyncRoute(customerController.updateCustomer)
    );
router
    .route('/getCustomer/:customerId')
    .get(
        authenticateToken,
        asyncRoute(checkRole([roles.DRIVER, roles.ADMINISTRATOR])),
        asyncRoute(customerController.getCustomer)
    );
export default router;
