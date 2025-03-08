import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostService } from './posts.service';
import { PostController } from './posts.controller';
import { User } from 'src/auth/entities/users.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User]), AuthModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostsModule {}
