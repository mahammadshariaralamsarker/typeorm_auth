import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    secret:"sK83!f2kd@9LmWq^vRuZ*6YdP3bX!0rTqNaJxL7zG1eFzApM4",
    signOptions: { expiresIn: '1h' }, // Token expires in 1 hour
  }), TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
