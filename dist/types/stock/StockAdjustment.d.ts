export type StockAdjustment = {
	_id: number;
	transactionDate: string;
	postedDate: string;
	quantity: string;
	qtyPicked: string;
	price: string;
	description: string;
	costBasis: string;
	costLayers: {
		_id: number;
		date: string;
		price: string;
		qtyPicked: string;
	};
	qtyAvailable: string;
	avgCost: string;
	type: string;
	TransferId: number;
	locked: true;
	currency: string;
	currencyRate: string;
	ItemId: number;
	WarehouseId: number;
	AdjustmentLedgerAccountId: number;
	JournalId: number;
	POLineItemId: number;
	SOLineItemId: number;
	ProductionLineId: number;
	AdjustmentLedgerAccount: {
		_id: number;
		name: string;
		number: string;
	};
	Item: {
		_id: number;
		name: string;
		number: string;
		sku: string;
	};
	Warehouse: {
		_id: number;
		name: string;
	};
	POLineItem: {
		PurchaseOrderId: number;
		PurchaseOrder: {
			number: string;
		};
	};
	SOLineItem: {
		SalesOrderId: number;
		SalesOrder: {
			number: string;
		};
	};
	Journal: {
		number: number;
	};
	ProductionLine: {
		ProductionId: number;
	};
};
