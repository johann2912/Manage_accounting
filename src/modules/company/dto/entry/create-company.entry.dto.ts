import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString  } from "class-validator";
import { ICompanyCreate } from "../../interfaces/create-company.interface";

export class CompanyCreateEntryDto implements ICompanyCreate {
    @ApiProperty({ nullable: false})
    @IsNotEmpty()
    @IsString()
    name?: string;
    @ApiProperty({ nullable: false})
    @IsNotEmpty()
    @IsString()
    address?: string
};