import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
	cart: { type: Array, required: true },
	totalPrice: { type: Number, required: true },
	buyer: { type: Object, required: true },
	date: { type: Date, default: Date.now },
});

const OrdersModel = mongoose.model('orders', orderSchema);
export { OrdersModel };
