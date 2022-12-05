import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { CategoryProductCreateOutputDto } from "src/modules/category-product/dto/output/create-category-product.output.dto";
import { CompanyCreateOutputDto } from "src/modules/company/dto/output/create-company.output.dto";
import { IProduct } from "../../interfaces/product.interface";

export class ProductCreateOutputDto implements IProduct {
    @Expose()
    id?: string;    
    @Expose()
    @ApiProperty()
    code?: string;
    @Expose()
    @ApiProperty()
    name?: string;
    @Expose()
    @ApiProperty()
    description?: string;
    @Expose()
    @ApiProperty()
    brand?: string;
    @Expose()
    @ApiProperty()
    quantity?: bigint;
    @Expose()
    @ApiProperty()
    price?: bigint;
    @Expose()
    @ApiProperty()
    company?: CompanyCreateOutputDto;
    @Expose()
    @ApiProperty()
    categoryProduct?: CategoryProductCreateOutputDto;
};