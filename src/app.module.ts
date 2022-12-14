import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PgDatabaseModule } from './frameworks/pg/pg-data.module';
import { RedisModule } from './frameworks/redis/redis.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryProductModule } from './modules/category-product/categoryProduct.module';
import { CompanyModule } from './modules/company/company.module';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
  }),
  PgDatabaseModule,
  RedisModule,
  UserModule,
  AuthModule,
  CategoryProductModule,
  CompanyModule,
  ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
