import { IGenericRepository } from "./generic-repository.abstract";

export abstract class IProductRepository<T> extends IGenericRepository<T> {
    public abstract findBycode(code:string): Promise<T>;
    public abstract findByname(name:string): Promise<T>;
    public abstract productByIdAllDataContent(id:string): Promise<T>;
    public abstract productAllDataContent(): Promise<T[]>;
    public abstract productByCompanyIdAllDataContent(companyId:string): Promise<T[]>;
};