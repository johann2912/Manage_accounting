import { Injectable } from "@nestjs/common";
import { ExceptionsService } from "src/config/exceptions/exceptions.service";
import { IDatabaseAbstract } from "src/frameworks/pg/core/abstract/database.abstract";
import { HashPassword } from "./functions/hashed/password";
import { IUserCreate } from "./interfaces/create-user.interface";

@Injectable()
export class UserService {
    constructor(
        private databaseService: IDatabaseAbstract,
        private exceptions: ExceptionsService,
    ) {};

    async allUsers(){
        const users = await this.databaseService.users.findAll();
        if(users.length <= 0) this.exceptions.notFoundException({
            message: 'users does not found'
        });

        return users
    };
    async searchUserByEmail(email:string){
        return await this.validateIsExistUser(email);
     };
    async create({ password, ...data }:IUserCreate){
        const userExist = await this.databaseService.users.findByDocument(data.documentNumber);
        if(userExist) this.exceptions.badRequestException({
            message: 'user already exist'
        });

        const user:IUserCreate = {
            ...data,
            password: HashPassword.encryptPassword(password),
       };

       return await this.databaseService.users.create(user)
    };
    async delete(email:string){
        const user = await this.validateIsExistUser(email);
        await this.databaseService.users.softdelete(user.id);
    };
    private async validateIsExistUser(email:string){
        const user = await this.databaseService.users.findByEmail(email);
        if(!user) this.exceptions.notFoundException({
            message: 'user does not found'
        });

        return user;
    };
};