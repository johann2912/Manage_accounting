import { IGenericRepository } from "./generic-repository.abstract";

export abstract class ICategoryProductRepository<T> extends IGenericRepository<T> {
    public abstract findBycode(code:string): Promise<T>;
    public abstract findByname(name:string): Promise<T>;
};