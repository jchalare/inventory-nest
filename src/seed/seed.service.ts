import { Injectable } from '@nestjs/common';

import { ProductsService } from './../products/products.service';
import { CompaniesService } from 'src/companies/companies.service';
import { initialProductData,initialCompanyData } from './data/';


@Injectable()
export class SeedService {

  constructor(
    private readonly companiesService: CompaniesService,
    private readonly productsService: ProductsService
  ) { }


  async insertData() {

    await this.insertNewProducts();
    await this.insertNewCompanies();

    return 'SEED EXECUTED';
  }

  private async insertNewCompanies() {
    await this.companiesService.deleteAllCompaniesFromDb();

    const companies = initialCompanyData.companies;

    const insertPromises = [];

    companies.forEach(company => {
      insertPromises.push(this.companiesService.createCompanyInDb(company));
    });

    await Promise.all(insertPromises);


    return true;
  }


  private async insertNewProducts() {
    await this.productsService.deleteAllProductsFromDb();

    const products = initialProductData.products;

    const insertPromises = [];

    products.forEach(product => {
      insertPromises.push(this.productsService.createProductInDb(product));
    });

    await Promise.all(insertPromises);


    return true;
  }


  private async insertNewUsers() {
    await this.companiesService.deleteAllCompaniesFromDb();

    const companies = initialCompanyData.companies;

    const insertPromises = [];

    companies.forEach(company => {
      insertPromises.push(this.companiesService.createCompanyInDb(company));
    });

    await Promise.all(insertPromises);


    return true;
  }



}