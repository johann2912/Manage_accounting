import { ApiProperty } from "@nestjs/swagger"; 
import { ResponseFormat } from "src/lib/dto/responses/format";

export class CategoryProductUpdateOutputDto {
    @ApiProperty()
    message: string;
};