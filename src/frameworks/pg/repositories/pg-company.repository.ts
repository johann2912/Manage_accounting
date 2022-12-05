import { ICompanyRepository } from "../core/abstract/company.repository.abstract";
import { PgGenericRepository } from "./pg-generic.repository";

export class PgCompanyRepository<T> 
    extends PgGenericRepository<T>
    implements ICompanyRepository<T>
{
    public async findByName(name: string): Promise<T> {
        return await this._repository.findOne({
            where: {
                name
            }
        })
    };
};