import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Post from './entities/post.model';
import User from 'src/auth/entities/users.model';
import { NotFoundException } from 'src/common/exceptions/errorExceptions';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post)
    private readonly postModel: typeof Post,
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async create(title: string, content: string, userId: number): Promise<Post> {
    const user = await this.userModel.findByPk(userId);
    if (!user) throw new NotFoundException('User not found');

    const newPost = await this.postModel.create({ title, content, userId });
    return newPost;
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.findAll({ include: [User] }); // Include User for eager loading
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postModel.findByPk(id, { include: [User] });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async update(id: number, title: string, content: string): Promise<Post> {
    const post = await this.findOne(id);
    await post.update({ title, content });
    return post;
  }

  async delete(id: number): Promise<void> {
    const post = await this.findOne(id);
    await post.destroy();
  }
}