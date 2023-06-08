import { IsInt, IsNumber, IsObject, IsOptional, IsPositive, IsString, MinLength } from "class-validator";
import { Company } from "../../companies/entities/company.entity";
import { Product } from "../../products/entities/product.entity";


export class CreateInventoryDto {
    
    @IsObject()
    company: Company;

    @IsObject()
    product: Product;

    @IsInt()
    @IsPositive()
    amount: number;

}
 