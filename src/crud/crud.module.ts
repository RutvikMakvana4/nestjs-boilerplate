import { Module } from '@nestjs/common';
import { CrudService } from './crud.service';
import { CrudController } from './crud.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Crud from './entities/crud.model';

@Module({
  imports: [SequelizeModule.forFeature([Crud])],
  controllers: [CrudController],
  providers: [CrudService],
})
export class CrudModule {}