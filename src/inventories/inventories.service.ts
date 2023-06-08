import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { validate as isValidTerm } from 'uuid';

@Injectable()
export class InventoriesService {

  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>
  ) { }

  async createInventoryInDb(createInventoryDto: CreateInventoryDto) {
    try {
      const inventory = this.inventoryRepository.create(createInventoryDto);
      await this.inventoryRepository.save(inventory);

      return inventory;

    } catch (error) {

      throw new InternalServerErrorException('This product is already in the inventory for this company');
    }

  }

  


  async findInventoryByTermn(termToSearchFor) {
    let inventory: Inventory;

    if (isValidTerm(termToSearchFor)) {
      inventory = await this.inventoryRepository.findOneBy({ id: termToSearchFor });
    } else {
      const queryBuilder = this.inventoryRepository.createQueryBuilder();
      inventory = await queryBuilder
        .where(
          'UPPER(name) =:name or itin =:itin',
          {
            name: termToSearchFor.toUpperCase(),
            itin: termToSearchFor.toUpperCase()
          }).getOne();
    }

    if (!inventory) {
      throw new NotFoundException(`Inventory not found`);
    }

    return inventory;
  }

  
} 