import { CategoryProduct, Company } from "src/frameworks/pg/entities";

export interface IProduct {
    id?:string
    createAt?: Date;
    updateAt?: Date;
    deleteAt?: Date;
    code?: string;
    name?: string;
    description?: string;
    brand?: string;
    quantity?: bigint;
    price?: bigint;
    company?: Company;
    categoryProduct?: CategoryProduct;
};