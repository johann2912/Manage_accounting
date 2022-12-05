import { Module } from "@nestjs/common";
import { ExceptionsModule } from "src/config/exceptions/exceptions.module";
import { PgDatabaseModule } from "src/frameworks/pg/pg-data.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [
        PgDatabaseModule,
        ExceptionsModule
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserService
    ],
    exports: [
        UserService
    ],
})
export class UserModule {};