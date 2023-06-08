import { IsInt, IsNumber, IsNumberString, IsOptional, IsPositive, IsString, MaxLength, MinLength } from "class-validator";


export class CreateCompanyDto {
    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    @MinLength(9)
    itin: string;

    @IsString()
    @MinLength(3)
    address: string;

    @MaxLength(10)
    @IsOptional()
    @IsNumberString()
    phone_number: string;
}

