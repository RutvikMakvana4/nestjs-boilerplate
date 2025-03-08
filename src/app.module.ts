import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CrudModule } from './crud/crud.module';
import { databaseConfig } from './common/config/database.config';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    SequelizeModule.forRoot(databaseConfig),
    CrudModule,
    AuthModule,
    PostsModule,
  ],
})
export class AppModule { }