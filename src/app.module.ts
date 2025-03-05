import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrudModule } from './crud/crud.module';
import { databaseConfig } from './common/config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    CrudModule,
  ],
})

export class AppModule { }
