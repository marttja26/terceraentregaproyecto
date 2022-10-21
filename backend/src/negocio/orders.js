import OrdersDaoMongoDb from '../persistencia/daos/OrdersDaoMongoDB.js';
import { sendEmail } from '../utils/mail.js';
// import { sendSMS, sendWhatsapp } from '../utils/twilio.js';
import logger from '../logger/logger.js';

const orderApi = new OrdersDaoMongoDb()

const submitOrder = async (body) => {
	try {
		// const result = await Orders.collection.insertOne(body);
		const result = await orderApi.saveOne(body)
		await sendEmail('Nuevo pedido de', JSON.stringify(body))
		// await sendWhatsapp('Nuevo pedido de', JSON.stringify(body))
		// await sendSMS('Su pedido ha sido recibido y se encuentra en proceso', body.buyer.phone)
		return {
			status: true,
			message: `La orden con el id ${result.insertedId} ha sido completada.`,
		};
	} catch (error) {
		logger.error({ message: `error al subir una orden ${error}` });
		return { status: false, message: 'Ocurrio un error.' };
	}
}

export default {
    submitOrder
}