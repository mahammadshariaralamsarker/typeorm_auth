import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ItemModule } from './item/item.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, ItemModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
