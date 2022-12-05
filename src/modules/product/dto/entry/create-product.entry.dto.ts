import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString  } from "class-validator";
import { ICreateProduct } from "../../interfaces/create-product.interface";

export class ProductCreateEntryDto implements ICreateProduct {
    @ApiProperty({ nullable: false, minLength: 4, maxLength: 10})
    @IsNotEmpty()
    @IsString()
    code: string;
    @ApiProperty({ nullable: false, minLength: 4})
    @IsNotEmpty()
    @IsString()
    name: string;
    @ApiProperty({ nullable: false})
    @IsNotEmpty()
    @IsString()
    description: string;
    @ApiProperty({ nullable: false})
    @IsNotEmpty()
    @IsString()
    brand: string;
    @ApiProperty({ nullable: false})
    @IsNotEmpty()
    quantity: bigint;
    @ApiProperty({ nullable: false})
    @IsNotEmpty()
    price: bigint;
    @ApiProperty({ nullable: false})
    @IsNotEmpty()
    @IsString()
    company: string;
    @ApiProperty({ nullable: false})
    @IsNotEmpty()
    @IsString()
    categoryProduct: string;
};