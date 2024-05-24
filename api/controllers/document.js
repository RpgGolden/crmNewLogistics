import fs from 'fs';
import path from 'path';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import Order from '../models/order.js';
import { AppErrorMissing } from '../utils/errors.js';

export default {
    async createDocument({ params: { orderId } }, res) {
        try {
            // Find order by ID
            const order = await Order.findOne({ where: { id: orderId } });
            if (!order) {
                throw new AppErrorMissing('Order not found');
            }

            const files = [`${order.id}`];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const content = fs.readFileSync(path.join('documents', 'template.docx'), 'binary');

                const zip = new PizZip(content);

                const doc = new Docxtemplater(zip);
                const dateContract = new Date();

                const getMonthStr = (date = new Date()) =>
                    [
                        'января',
                        'февраля',
                        'марта',
                        'апреля',
                        'мая',
                        'июня',
                        'июля',
                        'августа',
                        'сентября',
                        'октября',
                        'ноября',
                        'декабря',
                    ][dateContract.getMonth()];

                doc.setData({
                    date: dateContract.getDate(),
                    month: getMonthStr,
                    year: dateContract.getFullYear(),
                    fullName: order.customerId,
                });

                doc.render();

                const buf = doc.getZip().generate({ type: 'nodebuffer' });
                const fileName = `./documents/${file}.docx`;

                fs.writeFileSync(fileName, buf);
                console.log(`Генерация документа(${fileName}) завершена.`);

                // Нужно скачать созданный файл
                res.download(fileName, (err) => {
                    if(err) {
                        console.error('Error downloading file:', err);
                        throw new Error('Error downloading file');
                    } else {
                        console.log(`File downloaded: ${fileName}`)
                    }
                })
                
            }
        } catch (error) {
            console.error('Error generating document:', error);
            res.status(500).json({ success: false, message: 'Error generating document', error: error.message });
        }
    },
};
