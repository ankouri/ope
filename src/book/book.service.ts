import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'Entities/book.entity';
import { CreateBookDto } from 'src/dto/create-book.dto';
import { UpdateBookDto } from 'src/dto/update-book.dto';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {

    constructor(@InjectRepository(Book) private bookRepo: Repository<Book>){}

    async findAll() {
        return await this.bookRepo.find();
    }

    async findOne(id: number) {
        const book = await this.bookRepo.findOne({ where: { id: id }});
        if (!book) {
            throw new NotFoundException(`Not found #${id} coffee`)
        }
        return book 
    }

    create(createBook: CreateBookDto) {
        const book = this.bookRepo.create(createBook)
        return this.bookRepo.save(book);
    }

    async update(id: number, createBook: UpdateBookDto) {
        const book = await this.bookRepo.preload({
            id: id,
            ...createBook
        })
        return this.bookRepo.save(book)
    }

    async delete(id: number) {
        let book = await this.findOne(id);
        return this.bookRepo.remove(book);
    }

}
