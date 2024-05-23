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

// Создаем хранилище для загруженных файлов
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'documents'); // Указываем папку, в которую будут сохраняться файлы
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extension); // Генерируем уникальное имя файла
    },
});

// Создаем экземпляр multer с указанным хранилищем
const upload = multer({ storage });

router.route('/createDocument/:orderId').post(
    authenticateToken,
    asyncRoute(checkRole([roles.DRIVER, roles.ADMINISTRATOR])),
    upload.single('file'), // Добавляем middleware для обработки загрузки файла
    asyncRoute(documentController.createDocument)
);

export default router;
