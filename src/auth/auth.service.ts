import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from "bcrypt";

import { User } from './entities/user.entity';
import { CreateUserDto, LoginUserDto } from './dto/';
import { JwtPayload } from './interfaces/jwt-payload-interface';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {


  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService:JwtService
  ) { }


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
