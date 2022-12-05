import { ApiProperty } from "@nestjs/swagger";
import { ICreateCategoryProduct } from "../../interfaces/create-category-product.interface";

export class CategoryProductCrateEntryDto implements ICreateCategoryProduct {
    @ApiProperty()
    code?: string;
    @ApiProperty({ minLength: 2})
    name?: string;
    @ApiProperty()
    description?: string;
};