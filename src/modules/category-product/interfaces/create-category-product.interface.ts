import { ICategoryProduct } from "./category-product.interface";

export interface ICreateCategoryProduct extends ICategoryProduct {
    code?: string;
    name?: string;
    description?: string;
    active?: boolean;
};