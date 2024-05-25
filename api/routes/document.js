import { Router } from 'express';
import { asyncRoute } from '../utils/errors.js';
import { authenticateToken } from '../middlewares/checkToken.js';
import checkRole from '../middlewares/checkRoles.js';
import roles from '../config/roles.js';
import documentController from '../controllers/document.js';

const router = Router();

router
    .route('/createDocument/:orderId')
    .get(
        // authenticateToken,
        // asyncRoute(checkRole([roles.DRIVER, roles.ADMINISTRATOR])),
        asyncRoute(documentController.createDocument)
    );

export default router;
