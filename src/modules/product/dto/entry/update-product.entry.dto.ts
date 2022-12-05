import { ApiProperty } from "@nestjs/swagger";
import { IUpdateProduct } from "../../interfaces/update-product.interface";
import { IsString  } from "class-validator";

export class ProductUpdateEntryDto implements IUpdateProduct {
    @ApiProperty({ nullable: false})
    @IsString()
    code: string;
    @ApiProperty({ nullable: false})
    @IsString()
    name: string;
    @ApiProperty({ nullable: false})
    @IsString()
    description: string;
    @ApiProperty({ nullable: false})
    @IsString()
    brand: string;
    @ApiProperty({ nullable: false})
    @IsString()
    quantity: bigint;
    @ApiProperty({ nullable: false})
    @IsString()
    price: bigint;
};