import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Controller('inventories')
export class InventoriesController {
  constructor(private readonly inventoriesService: InventoriesService) {}

  @Post()
  createInventory(@Body() createInventoryDto: CreateInventoryDto) {
      return this.inventoriesService.createInventoryInDb(createInventoryDto);
  }
  

  @Get(':term')
  findInventory(@Param('term') term: string) {
    return this.inventoriesService.findInventoryByTermn(term);
  }

}
