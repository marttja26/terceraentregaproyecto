import { Router } from 'express';
import orders from '../controllers/orders.js';

const routerOrders = new Router();

routerOrders.post('/order', orders.orderController)

export default routerOrders;
