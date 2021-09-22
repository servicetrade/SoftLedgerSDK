import {Warehouse} from "../../types/warehouses/Warehouse";
import {address} from "./address.mock";

export const warehouse: Warehouse = {
    _id: 1,
    name: 'name',
    description: 'description',
    AddressId: 1,
    LocationId: 1,
    Location: {},
    Address: address,
}