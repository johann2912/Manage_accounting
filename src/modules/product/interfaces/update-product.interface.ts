import { IProduct } from "./product.interface";

export interface IUpdateProduct extends IProduct {
    code?: string;
    name?: string;
    description?: string;
    brand?: string;
    quantity?: bigint;
    price?: bigint;
};