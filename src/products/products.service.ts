import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate as isValidTerm} from 'uuid';

import { PaginationDto } from '../common/dtos/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';


@Injectable()
export class ProductsService {


  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
    ){ }

  async createProductInDb(createProductDto: CreateProductDto) {

    try {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);

      return product;
    } catch (error) {
     
      throw new InternalServerErrorException('Internal Server Error!');
    }

  }

  async findAllProductsFromDb(paginationDto:PaginationDto) {

    const {limit=10,offset=0} = paginationDto;

    const productsList = await this.productRepository.find(
      {
        take: limit,
        skip: offset
      }
    );
    return productsList;
  }

  async findOneProductFromDb(termToSearchFor: string) {

    let product : Product;

    if(isValidTerm(termToSearchFor)){
      product = await this.productRepository.findOneBy({ id: termToSearchFor });
    }else{
     const queryBuilder =  this.productRepository.createQueryBuilder();
      product = await queryBuilder
                      .where(
                        'UPPER(name) =:name', 
                        { name: termToSearchFor.toUpperCase()}).getOne();
    }

    if (!product){
      throw new NotFoundException(`Product ${termToSearchFor} not found`);
    }

    return product;
  }


  async updateProductFromDb(id: string, updateProductDto: UpdateProductDto) {

    const product = await this.productRepository.preload({
        id: id,
        ...updateProductDto
    });

    try {

    return await this.productRepository.save(product);
      
    } catch (error) {
      throw new NotFoundException('Product not found')
    }

  }


  async removeProductFromDb(id: string) {
    const productToRemove = await this.findOneProductFromDb(id);
    return await this.productRepository.remove(productToRemove);
  }

 


  async deleteAllProductsFromDb() {
    const query = this.productRepository.createQueryBuilder('product');

    try {
      return await query
        .delete()
        .where({})
        .execute();

    } catch (error) {
        throw new BadRequestException(error.detail);
    }

  }

}
