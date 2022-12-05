import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Session, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { plainToClass } from "class-transformer";
import { AccessGuard } from "src/lib/guards/access.guard";
import { IAccess } from "src/lib/jwt/interfaces/access.interface";
import { ProductCreateEntryDto } from "./dto/entry/create-product.entry.dto";
import { ProductUpdateEntryDto } from "./dto/entry/update-product.entry.dto";
import { ProductCreateOutputDto } from "./dto/output/create-product.output.dto";
import { CompanyUpdateOutputDto } from "./dto/output/update-product.output.dto";
import { ProductService } from "./product.service";

@ApiTags('Products')
@Controller('Products')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
    ) {};

    @Get('all')
    @ApiOkResponse({type: [ProductCreateOutputDto]})
    public async all(){
        const categoryProduct = 
            await this.productService.all();
        
        return categoryProduct;
    };
    @Get('by-id/:productId')
    @ApiOkResponse({type: ProductCreateOutputDto})
    public async productById(
        @Param('productId') productId: string,
    ){
        const categoryProduct = 
            await this.productService.productById(productId);
        
        return categoryProduct;
    };
    @Get('by-company/:companyId')
    @ApiOkResponse({type: ProductCreateOutputDto})
    public async productByCompany(
        @Param('companyId') companyId: string,
    ){
        const categoryProduct = 
            await this.productService.productByCompanyId(companyId);
        
        return categoryProduct;
    };
    @Post('create')
    @UseGuards(AccessGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: ProductCreateOutputDto})
    public async create(
        @Session() session:IAccess,
        @Body() data: ProductCreateEntryDto,
    ){
        const categoryProduct = await this.productService.create(
            session.id,
            data,
        );

        return  categoryProduct;
    };
    @Put('update/:productId')
    @UseGuards(AccessGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: CompanyUpdateOutputDto})
    public async update(
        @Session() session:IAccess,
        @Param('productId', ParseUUIDPipe) productId:string,
        @Body() data: ProductUpdateEntryDto,
    ){
        const categoryProduct = await this.productService.update(
            session.id,
            productId,
            data,
        );

        return plainToClass(CompanyUpdateOutputDto, categoryProduct, {excludeExtraneousValues:true})
    };
    @Delete('delete/:productId')
    @UseGuards(AccessGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: CompanyUpdateOutputDto})
    async deleteByCode(
        @Session() session:IAccess,
        @Param('productId') productId:string,
    ){
        const categoryProduct = await this.productService.delete(
            session.id,
            productId,
        );

        return plainToClass(CompanyUpdateOutputDto, categoryProduct, {excludeExtraneousValues:true})
    }
};