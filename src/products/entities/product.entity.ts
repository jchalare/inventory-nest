import { Inventory } from "../../inventories/entities/inventory.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'products'})
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { unique: true, nullable: false })
    name: string;

    @Column('integer', { default: 0, nullable: false })
    amount: number;

    @Column('float',{default:0, nullable:false})
    price: number;

    @Column('text', {nullable: false})
    description: string;

    @Column('text')
    image_url: string;

    @OneToMany(() => Inventory,(inventory) => inventory.product, {cascade:true})
    inventories: Inventory[];
        
    @BeforeInsert()
    @BeforeUpdate()
    formatData() {
        this.name = this.name.toUpperCase()
    }
}
 