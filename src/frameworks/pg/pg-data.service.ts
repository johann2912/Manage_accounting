import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IDatabaseAbstract } from "./core/abstract/database.abstract";
import { ICategoryProductRepository } from "./core/abstract/category-product.repository.abstract";
import { ICompanyRepository } from "./core/abstract/company.repository.abstract";
import { IUserRepository } from "./core/abstract/user.repository.abstract"
import { IProductRepository } from "./core/abstract/product.repository.abstract"
import { Product, CategoryProduct, Company, User } from "./entities";
import { PgCompanyRepository } from "./repositories/pg-company.repository";
import { PgUserRepository } from "./repositories/pg-user.repository";
import { PgProductRepository } from "./repositories/pg-product.repository";
import { PgCategoryProductRepository } from "./repositories/pg-category-product.repository";

@Injectable()
export class PgDatabaseService
  implements IDatabaseAbstract, OnApplicationBootstrap
{
  public users: IUserRepository<User>;
  public products: IProductRepository<Product>;
  public company: ICompanyRepository<Company>;
  public categoryProducts: ICategoryProductRepository<CategoryProduct>;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(CategoryProduct)
    private readonly categoryProductsRepository: Repository<CategoryProduct>,
  ) {};

  public onApplicationBootstrap() {
    this.users = new PgUserRepository<User>(this.userRepository);
    this.company = new PgCompanyRepository<Company>(this.companyRepository);
    this.products = new PgProductRepository<Product>(this.productRepository);
    this.categoryProducts = new PgCategoryProductRepository<CategoryProduct>(this.categoryProductsRepository);
  };
};