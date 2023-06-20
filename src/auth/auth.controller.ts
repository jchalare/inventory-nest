import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, SetMetadata, Put, Query, ParseUUIDPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto,LoginUserDto, UpdateUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Auth, GetUser, RawHeaders } from './decorators';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces';
import { PaginationDto } from 'src/common/dtos/pagination.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUserInDb(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUserInDb(loginUserDto);
  }


  @Get()
  @Auth(ValidRoles.administrator)
  findAllUsers(@Query() paginationDto: PaginationDto) {
    return this.authService.findAllUsersFromDb(paginationDto);
  }


  @Get(':term')
  @Auth(ValidRoles.administrator)
  findOneUser(@Param('term') term: string) {
    return this.authService.findOneUserFromDb(term);
  }


  @Patch(':id')
  @Auth(ValidRoles.administrator)
  updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.updateUserFromDb(id, updateUserDto);
  }

 
}
