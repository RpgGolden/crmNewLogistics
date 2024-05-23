import Document from "../models/document.js";
import fs from "fs";
import Order from "../models/order.js";
import path from "path";
import { AppErrorMissing } from "../utils/errors.js";
export default {
    async createDocument({params: {orderId}},req, res) {

        const order = await Order.findOne({where: {id: orderId}});
        
        if (!order) {
            throw new AppErrorMissing('Order not found');
        }

        const documentPath = path.join(__dirname, 'documents', req.file.filename)
         fs.rename(req.file.path, documentPath, (err) => {
            console.error(err);
        })
        const document = await Document.create({path: documentPath, orderId: order.id});
        
        res.json(document);
    }
}