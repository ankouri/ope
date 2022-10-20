import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Login } from 'Entities/login.entity';
import { RateLimiterModule } from 'nestjs-rate-limiter';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStartegy } from './jwt.strategy';

@Module({
  imports: [
    RateLimiterModule.register({
      duration:5,
      points:5
    }),
    TypeOrmModule.forFeature([Login]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: "kksdnxjsqmsdkevvxxpmm%%SDECLDFQQSSDSAZZRRfr8rtf5z888",
      signOptions: {
        expiresIn: 60*60*24 // second
      }
    })
  ],
  controllers: [AuthController],
  providers: [ AuthService, JwtStartegy],
  exports: [
    JwtStartegy,
    PassportModule
  ],
})
export class AuthModule { }
