import { Router } from 'express';
import { OrdersModel as Orders } from '../models/Orders.js';
import { sendEmail } from '../utils/mail.js';
// import { sendSMS, sendWhatsapp } from '../utils/twilio.js';
import logger from '../logger/logger.js';

const routerOrders = new Router();

routerOrders.post('/order', async (req, res) => {
	const { body, method, url } = req;
	logger.info(` Peticion a ${method} ${url} recibida`);
	try {
		const result = await Orders.collection.insertOne(body);
		await sendEmail('Nuevo pedido de', JSON.stringify(body))
		// await sendWhatsapp('Nuevo pedido de', JSON.stringify(body))
		// await sendSMS('Su pedido ha sido recibido y se encuentra en proceso', body.buyer.phone)
		res.json({
			status: true,
			message: `La orden con el id ${result.insertedId} ha sido completada.`,
		});
	} catch (error) {
		logger.error({ message: `error al subir una orden ${error}` });
		res.json({ status: false, message: 'Ocurrio un error.' });
	}
});

export default routerOrders;
