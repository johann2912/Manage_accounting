import { Injectable } from "@nestjs/common";
import { ExceptionsService } from "src/config/exceptions/exceptions.service";
import { IDatabaseAbstract } from "src/frameworks/pg/core/abstract/database.abstract";
import { ICompanyCreate } from "./interfaces/create-company.interface";

@Injectable()
export class CompanyService {
    constructor(
        private databaseService: IDatabaseAbstract,
        private exceptions: ExceptionsService,
    ) {};

    async all(){
        const companies = await this.databaseService.company.findAll();
        if(!companies.length) this.exceptions.notFoundException({
            message: 'does not found comanies'
        });

        return companies;
    };
    async companyById(id:string){
        const company = await this.databaseService.company.findOne(id);
        if(!company) this.exceptions.notFoundException({
            message: 'company does not found'
        });

        return company;
    };
    async create(userId:string, data: ICompanyCreate){
        await this.validateRoleUser(userId);
        const existCompany = await this.databaseService.categoryProducts.findByname(data.name);
        if(existCompany) this.exceptions.badRequestException({
            message: 'company already exist'
        });
        const company = await this.databaseService.company.create(data);

        return company
    };
    async delete(userId:string, companyId:string){
        await this.validateRoleUser(userId);
        const company = await this.companyById(companyId);
        await this.databaseService.company.softdelete(company.id);

        return 'ok';
    }
    private async validateRoleUser(userId){
        const user = await this.databaseService.users.findOne(userId);
        if(user.role !== 0) this.exceptions.UnauthorizedException({
            message: 'the user does not have the necessary permissions'
        })
    };
}