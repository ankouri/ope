import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Login } from 'Entities/login.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(Login) private loginRepo: Repository<Login>){}

    async login(body: any) {
        let userTemp = await this.loginRepo.findOne({ where: { email:body.email, password: body.password }});
        if(!userTemp) throw new UnauthorizedException()
        console.log(userTemp);
       return userTemp
    }
}
