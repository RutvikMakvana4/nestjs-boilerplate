import { SequelizeModuleOptions } from '@nestjs/sequelize';
import * as path from 'path';

export const databaseConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [
    path.join(__dirname, '../../', '**', 'entities', '*.model{.ts,.js}'),
  ],
  autoLoadModels: true,
  synchronize: true,
  logging: false
};
