import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	img: { type: String, required: true },
	price: { type: Number, required: true },
	brand: { type: String, required: true },
	description: { type: String, required: true },
    category: {type: String, required: true}
});

const ProductsModel = mongoose.model('products', productSchema);
export {ProductsModel};
