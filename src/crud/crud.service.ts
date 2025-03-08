import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Crud from './entities/crud.model';
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
    @InjectModel(Crud)
    private crudModel: typeof Crud,
  ) {}

  async create(createCrudDto: CreateCrudDto): Promise<Crud> {
    try {
      const user = await this.crudModel.create({
        name: createCrudDto.name,
        email: createCrudDto.email,
      });
      return user;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException('Email already exists');
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findAll(): Promise<Crud[]> {
    return this.crudModel.findAll();
  }

  async findOne(id: number): Promise<Crud> {
    const user = await this.crudModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateCrudDto: UpdateCrudDto): Promise<Crud> {
    const user = await this.findOne(id);
    await user.update(updateCrudDto);
    return user;
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}