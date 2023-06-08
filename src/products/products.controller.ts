import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
 
  @Post()
  @Auth(ValidRoles.administrator)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProductInDb(createProductDto);
  }

  @Get()
  @Auth()
  findAllProducts(@Query() paginationDto:PaginationDto) {
    return this.productsService.findAllProductsFromDb(paginationDto);
  }

  @Get(':term')
  @Auth()
  findOneProduct(@Param('term') term: string) {
    return this.productsService.findOneProductFromDb(term);
  }

  @Patch(':id',)
  @Auth(ValidRoles.administrator)
  updateProduct(
     @Param('id', ParseUUIDPipe) id: string, 
     @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateProductFromDb(id, updateProductDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.administrator)
  removeProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.removeProductFromDb(id);
  }
}
