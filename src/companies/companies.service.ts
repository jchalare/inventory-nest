import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { validate as isValidTerm } from 'uuid';


@Injectable()
export class CompaniesService {

 
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>
  ){

  }

  async createCompanyInDb(createCompanyDto: CreateCompanyDto) {
    try {
      const company = this.companyRepository.create(createCompanyDto);
      await this.companyRepository.save(company);

      return company;
    } catch (error) {

      throw new InternalServerErrorException('Internal Sever Error');
    }

  }

 async findAllCompaniesFromDb(paginationDto:PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const companiesList = await this.companyRepository.find(
      {
        take: limit,
        skip: offset
      }
    );

   return companiesList;
  }

 async findOneCompanyFromDb(termToSearchFor: string) {
    let company: Company;

    if (isValidTerm(termToSearchFor)) {
      company = await this.companyRepository.findOneBy({ id: termToSearchFor });
    } else {
      const queryBuilder = this.companyRepository.createQueryBuilder();
      company = await queryBuilder
                      .where(
                        'UPPER(name) =:name or itin =:itin', 
                        { 
                          name: termToSearchFor.toUpperCase(),
                          itin: termToSearchFor.toUpperCase()
                        }).getOne();
    }

    if (!company) {
      throw new NotFoundException(`Company ${termToSearchFor} not found`);
    }

    return company;
  }

  async updateCompanyFromDb(id: string, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.companyRepository.preload({
      id: id,
      ...updateCompanyDto
    });

    try {

      return await this.companyRepository.save(company);

    } catch (error) {
      throw new NotFoundException('Company not found')
    }
  }

  async removeCompanyFromDb(id: string) {
    const company = await this.findOneCompanyFromDb(id);
    return await this.companyRepository.remove(company);
  }




  async deleteAllCompaniesFromDb() {
    const query = this.companyRepository.createQueryBuilder('company');

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
 