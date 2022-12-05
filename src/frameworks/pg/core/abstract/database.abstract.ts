import { CategoryProduct, Company, Product, User } from "../../entities";
import { ICategoryProductRepository } from "./category-product.repository.abstract";
import { ICompanyRepository } from "./company.repository.abstract";
import { IProductRepository } from "./product.repository.abstract";
import { IUserRepository } from "./user.repository.abstract";

export abstract class IDatabaseAbstract {
    public abstract readonly users: IUserRepository<User>;
    public abstract readonly company: ICompanyRepository<Company>;
    public abstract readonly products: IProductRepository<Product>;
    public abstract readonly categoryProducts: ICategoryProductRepository<CategoryProduct>;
};