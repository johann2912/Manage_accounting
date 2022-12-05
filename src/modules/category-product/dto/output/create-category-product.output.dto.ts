import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { ICategoryProduct } from "../../interfaces/category-product.interface";

export class CategoryProductCreateOutputDto implements ICategoryProduct {
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
    active?: boolean;
};