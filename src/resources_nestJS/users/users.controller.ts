import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import User from '../../entity/user.model';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { ParamUserDto } from './dto/ParamUser.dto';
import { IReturnUser } from './interfaces/IReturnUser';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: ParamUserDto): Promise<User> {
    return this.usersService.findOne(params.id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDTO): Promise<IReturnUser> {
    return this.usersService.create(createUserDto);
  }

  @Delete(':id')
  remove(@Param() params: ParamUserDto): Promise<void> {
    return this.usersService.remove(params.id);
  }

  @Put(':id')
  update(
    @Param() params: ParamUserDto,
    @Body() createUserDto: CreateUserDTO
  ): Promise<IReturnUser> {
    return this.usersService.update(createUserDto, params.id);
  }
}
