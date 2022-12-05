import { ICategoryProductRepository } from "../core/abstract/category-product.repository.abstract";
import { PgGenericRepository } from "./pg-generic.repository";

export class PgCategoryProductRepository<T> 
    extends PgGenericRepository<T>
    implements ICategoryProductRepository<T>
{};