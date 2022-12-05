import { Module } from "@nestjs/common";
import { ExceptionsModule } from "src/config/exceptions/exceptions.module";
import { PgDatabaseModule } from "src/frameworks/pg/pg-data.module";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";

@Module({
    imports: [PgDatabaseModule, ExceptionsModule],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService],
})
export class ProductModule {};