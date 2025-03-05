import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CrudService } from './crud.service';
import { CreateCrudDto } from './dto/create-crud.dto';
import { UpdateCrudDto } from './dto/update-crud.dto';
import { createSuccessResponse } from 'src/common/responses/responses.utils';
import { HttpStatus } from '@nestjs/common';

@Controller('users')
export class CrudController {
  constructor(private readonly usersService: CrudService) { }

  @Post()
  async create(@Body() createCrudDto: CreateCrudDto): Promise<any> {
    const user = await this.usersService.create(createCrudDto);
    return createSuccessResponse(HttpStatus.CREATED, 'User created successfully', user);
  }

  @Get()
  async findAll(): Promise<any> {
    const users = await this.usersService.findAll();
    return createSuccessResponse(HttpStatus.OK, 'Users retrieved successfully', users);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
    const user = await this.usersService.findOne(id);
    return createSuccessResponse(HttpStatus.OK, 'User retrieved successfully', user);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCrudDto: UpdateCrudDto,
  ): Promise<any> {
    const user = await this.usersService.update(id, updateCrudDto);
    return createSuccessResponse(HttpStatus.OK, 'User updated successfully', user);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<any> {
    await this.usersService.remove(id);
    return createSuccessResponse(HttpStatus.OK, 'User deleted successfully');
  }
}