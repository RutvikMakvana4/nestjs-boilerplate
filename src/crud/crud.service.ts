import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crud } from './entities/crud.entity';
import { CreateCrudDto } from './dto/create-crud.dto';
import { UpdateCrudDto } from './dto/update-crud.dto';
import {
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '../common/exceptions/errorExceptions';

@Injectable()
export class CrudService {
  constructor(
    @InjectRepository(Crud)
    private usersRepository: Repository<Crud>,
  ) {}

  async create(createCrudDto: CreateCrudDto): Promise<Crud> {
    try {
      const user = this.usersRepository.create({
        name: createCrudDto.name,
        email: createCrudDto.email,
      });
      return this.usersRepository.save(user);
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new BadRequestException('Email already exists');
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findAll(): Promise<Crud[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<Crud> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateCrudDto: UpdateCrudDto): Promise<Crud> {
    const user = await this.findOne(id);
    Object.assign(user, updateCrudDto);
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }
}
