import { CreateSalesOrderRequest, Status } from '../../types/salesOrders/CreateSalesOrderRequest';

export const createSalesOrderRequest: CreateSalesOrderRequest = {
	status: Status.ORDER,
	AgentId: 1,
	LocationId: 1,
	currency: 'currency',
	SOLineItems: [],
};
