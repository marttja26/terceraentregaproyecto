import { Router } from 'express';
import products from '../controllers/products.js';

const routerProducts = new Router();

routerProducts.get('/productos', products.getProductsController);

routerProducts.get('/productos/querys', products.getProductsQueriesController)

export default routerProducts;
