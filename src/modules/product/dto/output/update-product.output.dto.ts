import { ApiProperty } from "@nestjs/swagger"; 

export class CompanyUpdateOutputDto {
    @ApiProperty()
    message: string;
};