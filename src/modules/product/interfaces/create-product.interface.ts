import { CategoryProduct, Company } from "src/frameworks/pg/entities";

export interface ICreateProduct {
    code: string;
    name: string;
    description: string;
    brand: string;
    quantity: bigint;
    price: bigint;
    company: string;
    categoryProduct: string;
};