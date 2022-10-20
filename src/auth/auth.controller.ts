import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private srv: AuthService){}

    @Post()
    create(@Body() body:any){
        return this.srv.login(body);
    }
}
