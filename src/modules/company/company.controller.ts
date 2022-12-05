import { Body, Controller, Delete, Get, Param, Post, Session, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOkResponse, ApiBearerAuth } from "@nestjs/swagger";
import { plainToClass } from "class-transformer";
import { AccessGuard } from "src/lib/guards/access.guard";
import { IAccess } from "src/lib/jwt/interfaces/access.interface";
import { CompanyService } from "./company.service";
import { CompanyCreateEntryDto } from "./dto/entry/create-company.entry.dto";
import { CompanyCreateOutputDto } from "./dto/output/create-company.output.dto";
import { CompanyUpdateOutputDto } from "./dto/output/update-companu.output.dto";

@ApiTags('Company')
@Controller('Company')
export class CompanyController {
    constructor(
        private readonly companyService: CompanyService,
    ) {};

    @Get('all')
    @ApiOkResponse({type: [CompanyCreateOutputDto]})
    public async all(){
        const companies = await this.companyService.all();
        return plainToClass(CompanyCreateOutputDto, companies, {excludeExtraneousValues: true});
    };
    @Get('by-id/:id')
    @ApiOkResponse({type: CompanyCreateOutputDto})
    public async companyById(
        @Param('id') id: string
    ){
        const companies = await this.companyService.companyById(id);
        return plainToClass(CompanyCreateOutputDto, companies, {excludeExtraneousValues: true});
    };
    @Post('create')
    @UseGuards(AccessGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: CompanyCreateOutputDto})
    public async create(
        @Session() session:IAccess,
        @Body() data: CompanyCreateEntryDto,
    ){
        const companies = await this.companyService.create(session.id, data);
        return plainToClass(CompanyCreateOutputDto, companies, {excludeExtraneousValues: true});
    };
    @Delete('delete/:companyId')
    @UseGuards(AccessGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: CompanyUpdateOutputDto})
    public async delete(
        @Session() session:IAccess,
        @Param('companyId') companyId: string,
    ){
        const companies = await this.companyService.delete(session.id, companyId);
        return plainToClass(CompanyUpdateOutputDto, companies, {excludeExtraneousValues: true});
    };
};