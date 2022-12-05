import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PgDatabaseModule } from './frameworks/pg/pg-data.module';
import { RedisModule } from './frameworks/redis/redis.module';
import { UserModule } from './modules/user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
  }),
  PgDatabaseModule,
  RedisModule,
  UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
