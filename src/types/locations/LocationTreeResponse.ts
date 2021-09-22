

export type LocationTreeResponse = {
    _id: number;
    id: string;
    name: string;
    currency: string;
    description: string;
    parent_id: number;
    parent_path: number[];
    imageURL: string;
    entityname: string;
    entityEmail: string;
    entityPhone: string;
    entityEIN: string;
    paymentDetails: string;
    AddressId: number;
    FXGLAccountId: number;
    RAAccountId: number;
    children: any[];
}