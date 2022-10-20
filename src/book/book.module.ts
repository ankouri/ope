import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'Entities/book.entity';
import { Login } from 'Entities/login.entity';
import { BookController } from './book.controller';
import { BookService } from './book.service';

@Module({
    imports:[TypeOrmModule.forFeature([Book, Login]), PassportModule.register({ defaultStrategy: 'jwt' }),],
    controllers:[BookController],
    providers:[BookService]
})
export class BookModule {}
