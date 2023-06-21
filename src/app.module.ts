import {Module} from "@nestjs/common";

import { ProductsModule } from './products/products.module';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonModule } from './common/common.module';
import { CompaniesModule } from './companies/companies.module';
import { SeedModule } from './seed/seed.module';
import { InventoriesModule } from './inventories/inventories.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';

@Module({
imports:[
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
        ssl: process.env.STAGE === 'prod',
        extra:{
            ssl: process.env.STAGE === 'prod'
                ? { rejectUnauthorized: false }
                : null
        },
        type: 'postgres',
        url: "postgres://postgres:U8uqSjC7wxcT3sr@inventory-nest.flycast:5432",
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        autoLoadEntities:true,
        synchronize:true
    }),
    CompaniesModule, 
    ProductsModule, 
    CommonModule, 
    SeedModule, 
    InventoriesModule, 
    FilesModule, 
    AuthModule,
],
controllers:[],
providers:[],
exports:[]
})

export class AppModule {}