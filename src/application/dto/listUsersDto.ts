import { IsDate, IsEmail, IsNotEmpty, IsOptional, isNotEmpty } from "class-validator";

export class listUsersDto {
    id: number;
    name: string;
    lastname: string;
    email: string;
    active: boolean;
    createAt: Date;
    updateAd: Date;
}

export class insertUsersDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    lastname: string;
    @IsEmail()
    email: string;
    @IsOptional()
    fecha: Date;
}