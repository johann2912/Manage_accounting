import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { plainToClass } from "class-transformer";
import { UserCreateEntryDto } from "./dto/entry/create-user.entry.dto";
import { UserCreateOutputDto } from "./dto/output/create-user.output.dto";
import { UserService } from "./user.service";

@ApiTags('Users')
@Controller('Users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {};

    @Get('all')
    @ApiOkResponse({type: [UserCreateOutputDto]})
    public async allUsers(){
        const users = await this.userService.allUsers();
        return plainToClass(UserCreateOutputDto, users, {excludeExtraneousValues:true});
    };
    @Get('by-email/:email')
    @ApiOkResponse({type: UserCreateOutputDto})
    public async searchUserByEmail(
        @Param('email') email: string,
    ){
        const user = await this.userService.searchUserByEmail(email);
        return plainToClass(UserCreateOutputDto, user, {excludeExtraneousValues:true});
    };
    @Post('create')
    @ApiOkResponse({type: UserCreateOutputDto})
    public async create(
        @Body() data: UserCreateEntryDto,
    ){
        const user = await this.userService.create(data);
        return plainToClass(UserCreateOutputDto, user, {excludeExtraneousValues:true});
    };
    @Delete('delete/:email')
    async delete(
        @Param('email') email:string,
    ){
        const user = await this.userService.delete(email);
        return plainToClass(UserCreateOutputDto, user, {excludeExtraneousValues:true});
    };

};