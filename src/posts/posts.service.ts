import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from 'src/auth/entities/users.entity';
import { NotFoundException } from 'src/common/exceptions/errorExceptions';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(title: string, content: string, userId: number): Promise<Post> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const newPost = this.postRepo.create({ title, content, user });
    return this.postRepo.save(newPost);
  }

  async findAll(): Promise<Post[]> {
    return this.postRepo.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async update(id: number, title: string, content: string): Promise<Post> {
    const post = await this.findOne(id);
    post.title = title;
    post.content = content;
    return this.postRepo.save(post);
  }

  async delete(id: number): Promise<void> {
    const post = await this.findOne(id);
    await this.postRepo.remove(post);
  }
}
