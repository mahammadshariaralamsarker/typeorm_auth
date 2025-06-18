import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ItemModule } from './item/item.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, ItemModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
