import { ICategoryProductRepository } from "../core/abstract/category-product.repository.abstract";
import { PgGenericRepository } from "./pg-generic.repository";

export class PgCategoryProductRepository<T> 
    extends PgGenericRepository<T>
    implements ICategoryProductRepository<T>
{
    public async findBycode(code: string): Promise<T> {
        return await this._repository.findOne({
            where: {
                code
            }
        });
    };
    public async findByname(name: string): Promise<T> {
        return await this._repository.findOne({
            where: {
                name
            }
        });
    };
};