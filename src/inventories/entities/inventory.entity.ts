import { Column, Entity, Index, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

import { Company } from "src/companies/entities/company.entity";
import { Product } from "src/products/entities/product.entity";

@Entity({name:"inventories"})
@Index(["company.id", "product.id"], { unique: true })
export class Inventory {

    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(
        () => Company,
        (company: Company) => company.id,
    )
    company: Company


    @ManyToOne(
        () => Product,
        (product: Product) => product.id,
    )
    product: Product

    @Column('integer', { default: 0, nullable: false })
    amount: number;

}
