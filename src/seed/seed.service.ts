import { Injectable } from '@nestjs/common';

import { ProductsService } from './../products/products.service';
import { CompaniesService } from './../companies/companies.service';
import { initialProductData,initialCompanyData, initialUserData } from './data/';
import { AuthService } from 'src/auth/auth.service';


@Injectable()
export class SeedService {

  constructor(
    private readonly companiesService: CompaniesService,
    private readonly productsService: ProductsService,
    private readonly usersService: AuthService
  ) { }


  async insertData() {

    await this.insertNewProducts();
    await this.insertNewCompanies();
    await this.insertNewUsers();

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
    await this.usersService.deleteAllUsersFromDb();

    const users = initialUserData.users;

    const insertPromises = [];

    users.forEach(user => {
      insertPromises.push(this.usersService.createUserInDb(user));
    });

    await Promise.all(insertPromises);


    return true;
  }



}