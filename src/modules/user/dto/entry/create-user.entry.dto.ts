import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, IsInt,IsString  } from "class-validator";
import { IUserCreate } from "../../interfaces/create-user.interface";

export class UserCreateEntryDto implements IUserCreate {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    full_name?: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    documentType?: number
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    documentNumber?: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email?: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password?: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    age?: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    role?: number;
};