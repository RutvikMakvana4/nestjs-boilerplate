import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrudModule } from './crud/crud.module';
import { databaseConfig } from './common/config/database.config';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';

console.log(databaseConfig);

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    CrudModule,
    AuthModule,
    PostsModule,
  ],
})
export class AppModule {}
