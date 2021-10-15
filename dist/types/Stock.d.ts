export declare type Stock = {
    Item: {
        _id: number;
        name: string;
        number: number;
        sku: string;
        description: string;
    };
    Warehouse: {
        _id: number;
        name: string;
    };
    qtyAvailable: string;
};
