import { UpdateSalesOrderRequest } from '../../types/salesOrders/UpdateSalesOrderRequest';
import { OrderStatus } from '../../types/salesOrders/OrderStatus';

export const updateSalesOrderRequest: UpdateSalesOrderRequest = {
	status: OrderStatus.ORDER,
	LocationId: 1,
};
