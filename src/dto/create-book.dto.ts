import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreateBookDto {
    @IsString()
    title: string;
    @IsString()
    author: string;
    @IsDateString()
    dateRelease: Date;
    @IsString({each:true})
    summary: string[];
}
