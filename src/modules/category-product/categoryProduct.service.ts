import { Injectable } from "@nestjs/common";
import { ExceptionsService } from "src/config/exceptions/exceptions.service";
import { IDatabaseAbstract } from "src/frameworks/pg/core/abstract/database.abstract";
import { ICreateCategoryProduct } from "./interfaces/create-category-product.interface";
import { IUpdateCategoryProduct } from "./interfaces/update-category-product.interface";

@Injectable()
export class CategoryProductService {
    constructor(
        private databaseService: IDatabaseAbstract,
        private exceptions: ExceptionsService,
    ) {};

    async all(){
        const categoryProduct = await this.databaseService.categoryProducts.findAll();
        if(!categoryProduct.length) this.exceptions.badRequestException({
            message: 'not found products category'
        })
        
        return categoryProduct;
    };
    async categoryProductByname(name:string){
        const categoryProduct = await this.databaseService.categoryProducts.findByname(name);
        if(!categoryProduct) this.exceptions.badRequestException({
            message: 'not found product category'
        })
        
        return categoryProduct;
    };
    async categoryProductByCode(code:string){
        const categoryProduct = await this.databaseService.categoryProducts.findBycode(code);
        if(!categoryProduct) this.exceptions.badRequestException({
            message: 'not found product category'
        })
        
        return categoryProduct;
    };
    async create(userId:string, data:ICreateCategoryProduct){
        await this.vaidateSpecialCharacters(data.code)
        await this.validateRoleUser(userId);
        await this.ExistcategoryProductByCode(data.code);
        await this.ExistcategoryProductByname(data.name);
        const categoryProduct = await this.databaseService.categoryProducts.create(data);

        return categoryProduct;
    };
    async update(
        userId:string,
        categoryProductId:string, 
        data: IUpdateCategoryProduct
    ){
        await this.validateRoleUser(userId);
        const existCategoryProduct = await this.databaseService.categoryProducts.findOne(categoryProductId);
        if(!existCategoryProduct) this.exceptions.notFoundException({
            message: 'category products does not found'
        })
        await this.databaseService.categoryProducts.update(
            existCategoryProduct.id,
            data
        )

        return 'ok'
    };
    async activeOrDesactive(
        userId:string,
        categoryProductId:string, 
    ){
        await this.validateRoleUser(userId);
        const existCategoryProduct = await this.databaseService.categoryProducts.findOne(categoryProductId);
        if(!existCategoryProduct) this.exceptions.notFoundException({
            message: 'category products does not found'
        })
        if(existCategoryProduct.active === true){
            await this.databaseService.categoryProducts.update(
                existCategoryProduct.id,
                {
                    active: false
                }
            );
        } else {
            await this.databaseService.categoryProducts.update(
                existCategoryProduct.id,
                {
                    active: true
                }
            );
        };
        return 'ok'
    };
    async deleteByCode(userId:string, code: string){
        await this.validateRoleUser(userId);
        const categoryProduct = await this.categoryProductByCode(code);
        await this.databaseService.categoryProducts.softdelete(categoryProduct.id);

        return 'ok'
    };

    private async ExistcategoryProductByname(name:string){
        const categoryProduct = await this.databaseService.categoryProducts.findByname(name);
        if(categoryProduct) this.exceptions.badRequestException({
            message: 'already exist product category'
        })
    };
    private async ExistcategoryProductByCode(code:string){
        const categoryProduct = await this.databaseService.categoryProducts.findBycode(code);
        if(categoryProduct) this.exceptions.badRequestException({
            message: 'already exist product category'
        })
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