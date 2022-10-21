import ContainerMongoDB from "../containers/ContainerMongoDB.js";
import { OrdersModel } from "../models/Orders.js";

class OrdersDaoMongoDb extends ContainerMongoDB {
	constructor() {
		super(OrdersModel);
	}
}

export default OrdersDaoMongoDb;