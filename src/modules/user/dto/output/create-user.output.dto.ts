import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IUserCreate } from "../../interfaces/create-user.interface";

export class UserCreateOutputDto implements IUserCreate {
    @Expose()
    id: string
    @ApiProperty()
    @Expose()
    full_name?: string;
    @ApiProperty()
    @Expose()
    documentType?: number
    @ApiProperty()
    @Expose()
    documentNumber?: string;
    @Expose()
    email?: string;
    @Exclude()
    password?: string;
    @ApiProperty()
    @Expose()
    age?: number;
    @ApiProperty()
    @Expose()
    role?: number;
};