import fs from 'fs';
import path from 'path';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import Order from '../models/order.js';
import { AppErrorMissing } from '../utils/errors.js';
import OrderDto from '../dtos/order-dto.js';

export default {
    async createDocument({ params: { orderId } }, res) {
        try {
            // Find order by ID
            const order = await Order.findOne({ where: { id: orderId } });
            if (!order) {
                throw new AppErrorMissing('Order not found');
            }
            const orderDto = new OrderDto(order);
            // Read the template file
            const templatePath = path.join('documents', 'template.docx');
            const content = fs.readFileSync(templatePath, 'binary');

            // Load the DOCX template
            const zip = new PizZip(content);
            const doc = new Docxtemplater(zip);

            // Prepare data for the document
            const dateContract = new Date();
            const getMonthStr = date =>
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
                ][date.getMonth()];

            doc.setData({
                date: dateContract.getDate(),
                month: getMonthStr(dateContract),
                year: dateContract.getFullYear(),
                fullName: order.customerId,
            });

            // Render the document
            doc.render();

            // Generate the document buffer
            const buf = doc.getZip().generate({ type: 'nodebuffer' });

            // Define the output file path
            const fileName = path.join('documents', `${order.id}.docx`);

            // Write the generated document to the file system
            fs.writeFileSync(fileName, buf);
            console.log(`Document generation completed: ${fileName}`);
            const fileNameTrue = `${order.id}.docx`;

            // Set the response headers
            res.set({
                'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'Content-Disposition': `attachment; filename="${fileNameTrue}"`,
            });

            // Send the file to the client for download
            res.send(buf);
            console.log(`File sent: ${fileName}`);
        } catch (error) {
            console.error('Error generating document:', error);
            res.status(500).json({ success: false, message: 'Error generating document', error: error.message });
        }
    },
};
