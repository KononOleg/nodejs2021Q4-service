import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../Middleware/auth.guard';
import User from '../../entity/user.model';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { ParamUserDto } from './dto/ParamUser.dto';
import { IReturnUser } from './interfaces/IReturnUser';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard)
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
