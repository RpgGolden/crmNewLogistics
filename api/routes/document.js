import { Router } from 'express';
import { asyncRoute } from '../utils/errors.js';
import { authenticateToken } from '../middlewares/checkToken.js';
import checkRole from '../middlewares/checkRoles.js';
import roles from '../config/roles.js';
import documentController from '../controllers/document.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = Router();

router
    .route('/createDocument/:orderId')
    .post(
        authenticateToken,
        asyncRoute(checkRole([roles.DRIVER, roles.ADMINISTRATOR])),
        asyncRoute(documentController.createDocument)
    );

export default router;
