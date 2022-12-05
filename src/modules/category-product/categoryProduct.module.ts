import { Module } from "@nestjs/common";
import { ExceptionsModule } from "src/config/exceptions/exceptions.module";
import { PgDatabaseModule } from "src/frameworks/pg/pg-data.module";
import { CategoryProductsController } from "./categoryProduct.controller";
import { CategoryProductService } from "./categoryProduct.service";

@Module({
    imports: [PgDatabaseModule, ExceptionsModule],
    controllers: [CategoryProductsController],
    providers: [CategoryProductService],
    exports: [CategoryProductService],
})
export class CategoryProductModule {};