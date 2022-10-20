import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Login } from "Entities/login.entity";
import { Repository } from "typeorm";
import { jwtPayload } from "./jwt-payload-interface";
import { Strategy, ExtractJwt } from "passport-jwt";

export class JwtStartegy extends PassportStrategy(Strategy) {

    constructor(@InjectRepository(Login) private repoAuth: Repository<Login>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'kksdnxjsqmsdkevvxxpmm%%SDECLDFQQSSDSAZZRRfr8rtf5z888'
        });
    }

    validate(payload: jwtPayload): Promise<Login> {
        const { email } = payload;
        const user = this.repoAuth.findOne({ where: { email } })

        if (!user) throw new UnauthorizedException()
        return user
    }
} 