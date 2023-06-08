import { MaxLength } from "class-validator";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";

import { Inventory } from "../../inventories/entities/inventory.entity";

@Entity({name:'companies'})
export class Company {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { unique: true, nullable: false })
    name: string;

    @PrimaryColumn()
    @Column('text', { nullable: false, unique:true })
    itin: string;

    @Column('text', { nullable: false })
    address: string;

    @Column('text', { nullable: false })
    @MaxLength(10)
    phone_number: string;

    
    @OneToMany(() => Inventory, inventory => inventory.company, { cascade: true })
    inventories: Inventory[];


    @BeforeInsert()
    @BeforeUpdate()
    formatData() {
        this.name = this.name.toUpperCase();
    }

}
 