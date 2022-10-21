import logger from '../logger/logger.js';
import products from '../negocio/products.js'


const getProductsController = async (req, res) => {
	const { method, url, query } = req;
	logger.info(` Peticion a ${method} ${url} recibida`);
	res.json(await products.getProducts(query))
	
}

const getProductsQueriesController = async (req, res) => {
	const { method, url } = req;
	logger.info(` Peticion a ${method} ${url} recibida`);
	res.json(await products.getProductsQueries())

}

export default {
    getProductsController,
    getProductsQueriesController
}