import {Item} from './Item';

export type GetItemsResponse = {
    totalItems: number;
    data: Item[];
}