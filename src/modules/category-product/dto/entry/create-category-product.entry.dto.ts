import { ApiProperty } from "@nestjs/swagger";
import { ICreateCategoryProduct } from "../../interfaces/create-category-product.interface";

export class CategoryProductCrateEntryDto implements ICreateCategoryProduct {
    @ApiProperty({ nullable: false})
    code: string;
    @ApiProperty({ minLength: 2, nullable: false})
    name: string;
    @ApiProperty({ nullable: false })
    description: string;
};