import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, Session, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { plainToClass } from "class-transformer";
import { AccessGuard } from "src/lib/guards/access.guard";
import { IAccess } from "src/lib/jwt/interfaces/access.interface";
import { UserCreateOutputDto } from "../user/dto/output/create-user.output.dto";
import { CategoryProductService } from "./categoryProduct.service";
import { CategoryProductCrateEntryDto } from "./dto/entry/create-category-product.entry.dto";
import { CategoryProductCreateOutputDto } from "./dto/output/create-category-product.output.dto";
import { CategoryProductUpdateOutputDto } from "./dto/output/update-category-product.output.dto";

@ApiTags('Category-products')
@Controller('Category-products')
export class CategoryProductsController {
    constructor(
        private readonly categoryProductService: CategoryProductService
    ) {};

    @Get('all')
    @ApiOkResponse({type: [CategoryProductCreateOutputDto]})
    public async all(){
        const categoryProduct = 
            await this.categoryProductService.all();
        
        return plainToClass(CategoryProductCreateOutputDto, categoryProduct, {excludeExtraneousValues: true})
    };
    @Get('by-code/:code')
    @ApiOkResponse({type: UserCreateOutputDto})
    public async categoryProductByCode(
        @Param('code') code: string
    ){
        const categoryProduct = 
            await this.categoryProductService.categoryProductByCode(code);
        
        return plainToClass(UserCreateOutputDto, categoryProduct, {excludeExtraneousValues: true})
    };
    @Get('by-name/:name')
    @ApiOkResponse({type: UserCreateOutputDto})
    public async categoryProductByName(
        @Param('name') name: string
    ){
        const categoryProduct = 
            await this.categoryProductService.categoryProductByname(name);
        
        return plainToClass(UserCreateOutputDto, categoryProduct, {excludeExtraneousValues: true})
    };
    @Post('create')
    @UseGuards(AccessGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: CategoryProductCreateOutputDto})
    public async create(
        @Session() session:IAccess,
        @Body() data: CategoryProductCrateEntryDto,
    ){
        const categoryProduct = await this.categoryProductService.create(
            session.id,
            data,
        );

        return plainToClass(CategoryProductCreateOutputDto, categoryProduct, {excludeExtraneousValues:true})
    };
    @Put('update/:categoryProductId')
    @UseGuards(AccessGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: CategoryProductUpdateOutputDto})
    public async update(
        @Session() session:IAccess,
        @Param('categoryProductId', ParseUUIDPipe) categoryProductId:string,
        @Body() data: CategoryProductCreateOutputDto,
    ){
        const categoryProduct = await this.categoryProductService.update(
            session.id,
            categoryProductId,
            data,
        );

        return plainToClass(CategoryProductUpdateOutputDto, categoryProduct, {excludeExtraneousValues:true})
    };
    @Patch('active-or-desactive/:categoryProductId')
    @UseGuards(AccessGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: CategoryProductUpdateOutputDto})
    public async activeOrDesactive(
        @Session() session:IAccess,
        @Param('categoryProductId', ParseUUIDPipe) categoryProductId:string,
    ){
        const categoryProduct = await this.categoryProductService.activeOrDesactive(
            session.id,
            categoryProductId,
        );

        return plainToClass(CategoryProductUpdateOutputDto, categoryProduct, {excludeExtraneousValues:true})
    };
    @Delete('delete-by-code/:code')
    @UseGuards(AccessGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: CategoryProductUpdateOutputDto})
    async deleteByCode(
        @Session() session:IAccess,
        @Param('code') code:string,
    ){
        const categoryProduct = await this.categoryProductService.deleteByCode(
            session.id,
            code,
        );

        return plainToClass(CategoryProductUpdateOutputDto, categoryProduct, {excludeExtraneousValues:true})
    }
};