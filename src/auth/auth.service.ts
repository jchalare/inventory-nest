import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from "bcrypt";
import { validate as isValidTerm } from 'uuid';


import { User } from './entities/user.entity';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto/';
import { JwtPayload } from './interfaces/jwt-payload-interface';
import { JwtService } from '@nestjs/jwt';
import { PaginationDto } from 'src/common/dtos/pagination.dto';



@Injectable()
export class AuthService {


  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService:JwtService
  ) { }


  async findAllUsersFromDb(paginationDto: PaginationDto) {

    const { limit = 10, offset = 0 } = paginationDto;

    const usersLists = await this.userRepository.find(
      {
        take: limit,
        skip: offset
      }
    );
    return usersLists;
  }

  async findOneUserFromDb(termToSearchFor: string) {

    let user: User;

    if (isValidTerm(termToSearchFor)) {
      user = await this.userRepository.findOneBy({ id: termToSearchFor });
    } else {
      const queryBuilder = this.userRepository.createQueryBuilder();
      user = await queryBuilder
        .where(
          'UPPER(fullname) =:fullname',
          { fullname: termToSearchFor.toUpperCase() }).getOne();
    }

    if (!user) {
      throw new NotFoundException(`User ${termToSearchFor} not found`);
    }

    return user;
  }


  async updateUserFromDb(id: string, updateUserDto: UpdateUserDto) {

    const user = await this.userRepository.preload({
      id: id,
      password: bcrypt.hashSync(updateUserDto.password, 10),
      ...updateUserDto
    });

    try {

      await this.userRepository.save(user);

      delete user.password;

      const newUser = {
        ...user,
        token: this.getJwtToken({ id: user.id })
      }


      return newUser;

    } catch (error) {
      throw new NotFoundException('User not found')
    }

  }
 


   async createUserInDb(createUserDto: CreateUserDto) {
    try {

      const { password, ...userData} = createUserDto;

      const user = this.userRepository.create(
            { 
              ...userData,
              password: bcrypt.hashSync(password, 10)
            }
        );
      await this.userRepository.save(user);

      delete user.password;

      const newUser = {
        ...user,
        token: this.getJwtToken({ id: user.id })
      }


      return newUser;

    } catch (error) {

      throw new InternalServerErrorException(error.detail);
    }

    

  }


  async loginUserInDb(loginUserDto:LoginUserDto){

    const {password,email} = loginUserDto;

    const user = await this.userRepository.findOne({
      where: {email},
      select: {email:true,password:true, id:true}
    });

    if(!user){
      throw new UnauthorizedException('Credentials are not valid');
    }

    if(!bcrypt.compareSync(password,user.password)){
      throw new UnauthorizedException('Credentials are not valid');
    }

    const logInUser = {
      ...user,
      token : this.getJwtToken({id:user.id})
    }

    return logInUser;
  }

  private getJwtToken(payload:JwtPayload){

    const token = this.jwtService.sign(payload);

    return token;
    
  }

 
}


