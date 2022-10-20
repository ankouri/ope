import { Body, Controller, Get, Param, Patch, Post, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateBookDto } from 'src/dto/create-book.dto';
import { UpdateBookDto } from 'src/dto/update-book.dto';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
    constructor(private svb: BookService){}

    @Get()
    @UseGuards(AuthGuard())
    getAll(){
        return this.svb.findAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard())
    getOne(@Param('id') id: number){
        return this.svb.findOne(id);
    }

    @Post()
    @UseGuards(AuthGuard())
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: false }))
    create(@Body() body: CreateBookDto){
        return this.svb.create(body)
    }

    @Patch(':id')
    @UseGuards(AuthGuard())
    @UsePipes(new ValidationPipe({ whitelist: false, transform: true, forbidNonWhitelisted: true }))
    update(@Param('id') id: number, @Body() body: UpdateBookDto){
        return  this.svb.update(id, body); 
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    delete(@Param('id') id:number){
        return this.svb.delete(id)
    }

}
