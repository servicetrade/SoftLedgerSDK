export declare enum SettingsDisplayType {
	DESCRIPTION = 'description',
	SKU = 'sku',
	NAME = 'name',
	ITEM = 'item',
}
export declare enum CostingType {
	AVG = 'avg',
	FIFO = 'fifo',
}
export declare type Settings = {
	ccInvoice: boolean;
	emailOnInvoiceIssued: boolean;
	emailOnSalesQuoteIssued: boolean;
	emailOnPurchaseOrderIssued: boolean;
	companyEIN: string;
	dateFormat: string;
	useLocationOnDocuments: boolean;
	displayItem: SettingsDisplayType.DESCRIPTION | SettingsDisplayType.SKU | SettingsDisplayType.NAME;
	postCRJournal: boolean;
	confirmDelete: boolean;
	postVCJournal: boolean;
	showProducts: boolean;
	currencyAsCodeUI: boolean;
	currencyAsCodePDF: boolean;
	intercompanyEliminations: boolean;
	hideLocationFromFinancials: boolean;
	intercompanyEliminations2: boolean;
	defaultLineItemType: SettingsDisplayType.DESCRIPTION | SettingsDisplayType.ITEM;
	showCostCenters: boolean;
	showJobs: boolean;
	autoApproveARPayments: boolean;
	autoApproveAPPayments: boolean;
	emailOnARCreditIssued: boolean;
	hideTaxInvoice: boolean;
	hideTaxBill: boolean;
	hideTaxPO: boolean;
	hideTaxSO: boolean;
	pdfDateFormat: string;
	wipSalesOrders: boolean;
	defaultUpdateItemPriceReceive: boolean;
	splitPartialReceives: boolean;
	draftBillPayments: boolean;
	pdfFormats: Record<any, any>;
	timezone: string;
	custom1_enabled: boolean;
	custom1_name: string;
	custom1_invoice: boolean;
	custom1_bill: boolean;
	custom1_po: boolean;
	custom1_so: boolean;
	custom2_enabled: boolean;
	custom2_name: string;
	custom2_invoice: boolean;
	custom2_bill: boolean;
	custom2_po: boolean;
	custom2_so: boolean;
	custom3_enabled: boolean;
	custom3_name: string;
	custom3_invoice: boolean;
	custom3_bill: boolean;
	custom3_po: boolean;
	custom3_so: boolean;
	invoiceAmountPrecision: string;
	billAmountPrecision: string;
	poAmountPrecision: string;
	soAmountPrecision: string;
	cryptoPricePrecision: string;
	InvoiceEmailTemplateId: number;
	POEmailTemplateId: number;
	SOEmailTemplateId: number;
	ARCreditEmailTemplateId: number;
	defaultWIPId: number;
	defaultSalesTaxId: number;
	defaultOtherComprehensiveIncomeId: number;
	defaultAccumulatedOtherComprehensiveIncomeId: number;
	defaultRetainedEarningsId: number;
	defaultBillPaymentId: number;
	defaultAPICPayableId: number;
	defaultAPICReceivableId: number;
	defaultARICPayableId: number;
	defaultARICReceivableId: number;
	defaultUnappliedCreditId: number;
	defaultUnappliedCashId: number;
	defaultAccountsReceivableId: number;
	defaultAccountsPayableId: number;
	defaultCashId: number;
	defaultInventoryAccrualId: number;
	defaultItemInventoryAccrualId: number;
	defaultItemInvoiceAccountId: number;
	defaultItemInventoryAssetId: number;
	defaultItemCOGSId: number;
	defaultRevId: number;
	defaultABDId: number;
	inventoryCostingMethod: CostingType;
	cryptoHomeCurrency: string;
	cryptoCostingMethod: CostingType;
	immaterialCostBasisErrorLedgerAccountId: number;
	immaterialCostBasisErrorReference: string;
	immaterialCostBasisErrorThreshold: string;
	currencySupport: boolean;
	billingLimits: Record<any, any>;
	customCurrency: boolean;
	cryptoImpairment: boolean;
	brightpearl: boolean;
	dashboards: boolean;
	SandBox: boolean;
	reconciliationsv2: boolean;
	plaidType: string;
};
