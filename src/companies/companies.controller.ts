import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth } from '../auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @Auth(ValidRoles.administrator)
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.createCompanyInDb(createCompanyDto);
  }

  @Get()
  @Auth()
  findAllCompanies(@Query() paginationDto: PaginationDto) {
    return this.companiesService.findAllCompaniesFromDb(paginationDto);
  }

  @Get(':term')
  @Auth()
  findOneCompany(@Param('term') term: string) {
    return this.companiesService.findOneCompanyFromDb(term);
  }

  @Patch(':id')
  @Auth(ValidRoles.administrator)
  updateCompany(@Param('id',ParseUUIDPipe) id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.updateCompanyFromDb(id, updateCompanyDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.administrator)
  removeCompany(@Param('id',ParseUUIDPipe) id: string) {
    return this.companiesService.removeCompanyFromDb(id);
  }
}
