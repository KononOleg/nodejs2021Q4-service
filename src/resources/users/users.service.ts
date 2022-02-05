import bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from '../../entity/user.model';
import config from '../../common/config';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { IReturnUser } from './interfaces/IReturnUser';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string, isShowPassword = false): Promise<User> {
    const user = await this.usersRepository.findOne(id, {
      select: isShowPassword
        ? ['id', 'name', 'login', 'password']
        : (['id', 'name', 'login'] as (keyof User)[]),
    });
    if (!user)
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND
      );
    else return user;
  }

  async findOneByLogin(login: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { login },
      select: ['id', 'name', 'login', 'password'],
    });
  }

  async create(createUserDto: CreateUserDTO): Promise<IReturnUser> {
    const hashPassword = await bcrypt.hash(
      createUserDto.password,
      config.SALT_OR_ROUNDS
    );
    const newUser = {
      ...createUserDto,
      password: hashPassword,
    };
    return User.toResponse(await this.usersRepository.save(newUser));
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.usersRepository.delete(id);
  }

  async update(createUserDto: CreateUserDTO, id: string): Promise<IReturnUser> {
    const user = await this.findOne(id, true);
    const newPassword = createUserDto.password
      ? user.password
      : await bcrypt.hash(user.password, config.SALT_OR_ROUNDS);
    const updateUser = {
      ...createUserDto,
      password: newPassword,
    };
    this.usersRepository.merge(user, updateUser);
    return User.toResponse(await this.usersRepository.save(updateUser));
  }
}
