import {SoftLedgerAPI} from './SoftLedgerAPI';
(async () => {
    const softLedger = await SoftLedgerAPI.build();
    const res = await softLedger.getItems();
    console.log(res.data);
    try {
        const createRes = await softLedger.createItem({
            name: 'asdf',
            salePrice: '14',
            InventoryAccountId: 4735,
            InvoiceAccountId: 4770,
            CogsAccountId: 4772,
            BillAccountId: 4747,
        });
        console.log(createRes)
    } catch (e) {
        console.log(e);
    }
})()
