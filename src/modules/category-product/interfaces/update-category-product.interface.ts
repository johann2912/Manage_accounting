import { ICategoryProduct } from "./category-product.interface";

export interface IUpdateCategoryProduct extends ICategoryProduct {
    code?: string;
    name?: string;
    description?: string;
};