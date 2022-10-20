import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthDto } from 'src/dto/auth.dto';
import { AuthService } from './auth.service';
import { RateLimiterGuard } from 'nestjs-rate-limiter'
@Controller('auth')
export class AuthController {
    // constructor(private srv: AuthService){}

    // @Post()
    // create(@Body() body:any){
    //     return this.srv.login(body);
    // }
    
    constructor(private srv: AuthService) { }
    @UseGuards(RateLimiterGuard)
    @Post()
    login(@Body() body: AuthDto) {
        return this.srv.login(body)
    }

    @Post('register')
    register(@Body() body: AuthDto) {
        return this.srv.register(body)
    }
}
