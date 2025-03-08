import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import Post from './entities/post.model';
import { PostService } from './posts.service';
import { PostController } from './posts.controller';
import User from 'src/auth/entities/users.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([Post, User]), AuthModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostsModule {}