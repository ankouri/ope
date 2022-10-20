import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';
import { CreateBookDto } from 'src/dto/create-book.dto';
import { UpdateBookDto } from 'src/dto/update-book.dto';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
    constructor(private svb: BookService){}

    @Get()
    getAll(){
        return this.svb.findAll();
    }

    @Get(':id')
    getOne(@Param('id') id: number){
        return this.svb.findOne(id);
    }

    @Post()
    create(@Body() body: CreateBookDto){
        return this.svb.create(body)
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() body: UpdateBookDto){
        return  this.svb.update(id, body); 
    }

    @Delete(':id')
    delete(@Param('id') id:number){
        return this.svb.delete(id)
    }

}
