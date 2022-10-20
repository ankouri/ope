import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Login } from 'Entities/login.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports:[TypeOrmModule.forFeature([Login])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
