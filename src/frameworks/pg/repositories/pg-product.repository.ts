import { IProductRepository } from "../core/abstract/product.repository.abstract";
import { PgGenericRepository } from "./pg-generic.repository";

export class PgProductRepository<T> 
    extends PgGenericRepository<T>
    implements IProductRepository<T>
{
    public async findBycode(code: string): Promise<T> {
        return await this._repository.findOne({
            where:{
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
    public async productByIdAllDataContent(id: string): Promise<T> {
        return await this._repository.createQueryBuilder('products')
            .select()
            .leftJoinAndSelect('products.company', 'company')
            .leftJoinAndSelect('products.categoryProduct', 'categoryProduct')
            .where('products.id = :id', { id })
            .getOne()
    };
    public async productAllDataContent(): Promise<T[]> {
        return await this._repository.createQueryBuilder('products')
            .select()
            .leftJoinAndSelect('products.company', 'company')
            .leftJoinAndSelect('products.categoryProduct', 'categoryProduct')
            .getMany()
    };
    public async productByCompanyIdAllDataContent(companyId: string): Promise<T[]> {
        return await this._repository.createQueryBuilder('products')
            .select()
            .leftJoinAndSelect('products.company', 'company')
            .leftJoinAndSelect('products.categoryProduct', 'categoryProduct')
            .where('company.id = :id', { id: companyId })
            .andWhere('categoryProduct.active = true')
            .getMany()
    };
};