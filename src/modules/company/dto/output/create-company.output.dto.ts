import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { ICompanyCreate } from "../../interfaces/create-company.interface";

export class CompanyCreateOutputDto implements ICompanyCreate {
    @Expose()
    id?: string;
    @ApiProperty()
    @Expose()
    name?: string;
    @ApiProperty()
    @Expose()
    address?: string
};