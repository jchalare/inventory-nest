import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column('text',{nullable:false, unique: true})
    email:string
    
    @Column('text', { nullable: false, select:false})
    password: string

    @Column('text', { nullable: false})
    fullName: string

    @Column('bool', { nullable: false,default:true })
    isActive: boolean;

    @Column('text', { nullable: false, array: true , default: ['user']})
    roles: string[]

    @BeforeInsert()
    @BeforeUpdate()
    formatData(){
        this.email=this.email.trim().toLocaleLowerCase();
    }


}
