import { Injectable } from "@nestjs/common/decorators";
import { ExceptionsService } from "src/config/exceptions/exceptions.service";
import { IDatabaseAbstract } from "src/frameworks/pg/core/abstract/database.abstract";
import { ICreateProduct } from "./interfaces/create-product.interface";
import { IUpdateProduct } from "./interfaces/update-product.interface";
import { Utilities } from 'src/utils/functions';

@Injectable()
export class ProductService {
    constructor(
        private databaseService: IDatabaseAbstract,
        private exceptions: ExceptionsService,
    ) {};

    async all(){
        const products = await this.databaseService.products.productAllDataContent();
        if(!products.length) this.exceptions.notFoundException({
            message: 'products does not found'
        });

        return products;
    };
    async productById(id:string){
        const product = await this.databaseService.products.productByIdAllDataContent(id);
        if(!product) this.exceptions.notFoundException({
            message: 'products does not found'
        });

        return product;
    };
    async productByCompanyId(companyId:string){
        const companyInstance = await this.ExistCategoryCompany(companyId);
        const products = await this.databaseService.products.productByCompanyIdAllDataContent(
            companyInstance.id
        );
        if(!products.length) this.exceptions.notFoundException({
            message: 'products does not found'
        });

        return products;
    };
    async create(userId:string, {company, categoryProduct, ...data}:ICreateProduct){
        await this.validateRoleUser(userId);
        await this.vaidateSpecialCharacters(data.code);
        await this.ExistProductByCode(data.code);
        await this.ExistProductByName(data.name);
        const categoryProductInstance = await this.ExistCategoryProduct(categoryProduct);
        const companyInstance = await this.ExistCategoryCompany(company);
        const productInstance = {
            ...data,
            categoryProduct: categoryProductInstance,
            company: companyInstance,
        }
        const { 
            company:companyDb, 
            categoryProduct:categoryProductDb,
            ...product
        } = await this.databaseService.products.create(productInstance);
        const response = {
            ...product,
            company: companyDb,
            categoryProduct: categoryProductDb,
        };

        return response;
    };
    async update(
        userId:string,
        productId:string, 
        data: IUpdateProduct
    ){
        await this.validateRoleUser(userId);
        await this.vaidateSpecialCharacters(data.code);
        const existProduct = await this.databaseService.categoryProducts.findOne(productId);
        if(!existProduct) this.exceptions.notFoundException({
            message: 'product does not found'
        })
        await this.databaseService.categoryProducts.update(
            existProduct.id,
            data
        )

        return 'ok'
    };
    async delete(userId:string, productId:string){
        await this.validateRoleUser(userId);
        const product = await this.productById(productId);
        await this.databaseService.company.softdelete(product.id);

        return 'ok';
    };
    private async ExistProductByCode(code:string){
        const existProduct = await this.databaseService.products.findBycode(code);
        if(existProduct) this.exceptions.badRequestException({
            message: 'porduct already exist'
        })
    };
    private async ExistProductByName(name:string){
        const existProduct = await this.databaseService.products.findBycode(name);
        if(existProduct) this.exceptions.badRequestException({
            message: 'porduct already exist'
        })
    };
    private async ExistCategoryProduct(id:string){
        const existCategoryProduct = await this.databaseService.categoryProducts.findOne(id);
        if(!existCategoryProduct) this.exceptions.notFoundException({
            message: 'category porduct does not found'
        });

        return existCategoryProduct;
    };
    private async ExistCategoryCompany(id:string){
        const existCompany = await this.databaseService.company.findOne(id);
        if(!existCompany) this.exceptions.notFoundException({
            message: 'company does not found'
        });

        return existCompany;
    };
    private async validateRoleUser(userId){
        const user = await this.databaseService.users.findOne(userId);
        if(user.role !== 0) this.exceptions.UnauthorizedException({
            message: 'the user does not have the necessary permissions'
        })
    };
    private async vaidateSpecialCharacters(code:string){
        const regex = /[\u0300-\u036f|_|/|!|#|$|%|&|(|)|=|¿|'|+|{|}|*|¨|°|!|"|&|:|,|.|;|?|¡|'|''|`|``| ]/g;
        if(regex.test(code)) this.exceptions.badRequestException({
            message: 'the code cannot contain special characters'
        });
    };
};