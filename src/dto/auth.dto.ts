import { IsEmail, IsNotEmpty, IsString, IS_LENGTH, Min, MinLength } from "class-validator";

export class AuthDto{
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    password: string;
}