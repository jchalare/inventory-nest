import { IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductDto {
    @IsString()
    @MinLength(3)
    name: string;

    @IsInt()
    @IsPositive()
    amount: number;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsString()
    @MinLength(3)
    description: string;

    @IsString()
    @MinLength(3)
    @IsOptional()
    image_url?: string;
}
 