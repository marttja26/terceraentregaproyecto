import { Router } from 'express';
import { ProductsModel as Products } from '../models/Products.js';
import logger from '../logger/logger.js';

const routerProductos = new Router();

routerProductos.get('/productos', async (req, res) => {
	const { method, url, query } = req;
	logger.info(` Peticion a ${method} ${url} recibida`);
	const { order, ...remQuerys } = query;
	let filterParams = {};
	Object.keys(remQuerys).forEach((key) => {
		let optionArray = remQuerys[key].split(',');
		let filter = { [key]: { $in: optionArray } };
		filterParams = { ...filterParams, ...filter };
	});
	switch (query.order) {
		case 'OrderByPriceASC':
			res.json(await Products.find({ ...filterParams }).sort({ price: 1 }));
			break;
		case 'OrderByPriceDESC':
			res.json(await Products.find({ ...filterParams }).sort({ price: -1 }));
			break;
		default:
			res.json(await Products.find({ ...filterParams }));
			break;
	}
});

routerProductos.get('/productos/querys', async (req, res) => {
	const { method, url } = req;
	logger.info(` Peticion a ${method} ${url} recibida`);

	const dbQuerys = await Products.aggregate([
		{
			$project: {
				_id: 0,
				brand: 1,
				category: 1,
			},
		},
	]);

	const existingQuerys = { brand: [], category: [] };

	dbQuerys.forEach((element) => {
		if (!existingQuerys.brand.includes(element.brand)) {
			existingQuerys.brand.push(element.brand);
		}
		if (!existingQuerys.category.includes(element.category)) {
			existingQuerys.category.push(element.category);
		}
	});
	res.json(existingQuerys);
});

export default routerProductos;
