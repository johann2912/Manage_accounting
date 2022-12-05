import { IProductRepository } from "../core/abstract/product.repository.abstract";
import { PgGenericRepository } from "./pg-generic.repository";

export class PgProductRepository<T> 
    extends PgGenericRepository<T>
    implements IProductRepository<T>
{};