import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [BookModule, ConfigModule.forRoot({ envFilePath: '.env' }),
  TypeOrmModule.forRoot({
    type: 'mariadb',
    host: process.env.HOST,
    port: parseInt(process.env.DB_PORT,10),
    username: 'root',
    password: '',
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: true
  }),
  AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
