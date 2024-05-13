import { Router } from 'express';
import driverController from '../controllers/driver.js';
import { asyncRoute } from '../utils/errors.js';
import { authenticateToken } from '../middlewares/checkToken.js';
import checkRole from '../middlewares/checkRoles.js';
import roles from '../config/roles.js';

const router = Router();

router
    .route('/getProfile')
    .get(
        authenticateToken,
        asyncRoute(checkRole([roles.DRIVER, roles.ADMINISTRATOR])),
        asyncRoute(driverController.getProfile)
    );
router
    .route('/updateProfile')
    .post(
        authenticateToken,
        asyncRoute(checkRole([roles.DRIVER, roles.ADMINISTRATOR])),
        asyncRoute(driverController.updateProfile)
    );

export default router;
