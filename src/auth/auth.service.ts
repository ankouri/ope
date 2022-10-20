import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Login } from 'Entities/login.entity';
import { AuthDto } from 'src/dto/auth.dto';
import { Repository } from 'typeorm';
import { jwtPayload } from './jwt-payload-interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    // constructor(@InjectRepository(Login) private loginRepo: Repository<Login>){}

    // async login(body: any) {
    //     let userTemp = await this.loginRepo.findOne({ where: { email:body.email, password: body.password }});
    //     if(!userTemp) throw new UnauthorizedException()
    //     console.log(userTemp);
    //    return userTemp
    // }

    constructor(
        @InjectRepository(Login) private loginRepo: Repository<Login>,
        private srvJWT: JwtService
    ) { }

    async login(body: AuthDto) {
        const user = await this.loginRepo.findOne({ where: { email: body.email } });
        if(!user) throw new NotFoundException('Your are not you.')
        const isMatch = await bcrypt.compare(body.password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid Credentials!')
        }
        const payload: jwtPayload = { email: body.email }
        const accessToken = await this.srvJWT.sign(payload)
        return { accessToken }
    }

    async register(body: AuthDto) {
        body.password = await bcrypt.hash(body.password, 10);
        const user = this.loginRepo.create(body);
        return this.loginRepo.save(user).catch((e) => {
            if (e.code == "ER_DUP_ENTRY") {
                throw new BadRequestException(
                  'Account with this email already exists.',
                );
              }
              return e;
        });
    }
}
