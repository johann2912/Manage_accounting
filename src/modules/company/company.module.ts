import { Module } from "@nestjs/common";
import { ExceptionsModule } from "src/config/exceptions/exceptions.module";
import { PgDatabaseModule } from "src/frameworks/pg/pg-data.module";
import { CompanyController } from "./company.controller";
import { CompanyService } from "./company.service";

@Module({
    imports: [PgDatabaseModule, ExceptionsModule],
    controllers: [CompanyController],
    providers: [CompanyService],
    exports: [CompanyService],
})
export class CompanyModule {};