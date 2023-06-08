import { Module } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { InventoriesController } from './inventories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [InventoriesController],
  providers: [InventoriesService],
  imports: [
    TypeOrmModule.forFeature([Inventory]),
    AuthModule
  ]
})
export class InventoriesModule {}
