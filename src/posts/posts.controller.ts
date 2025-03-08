import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PostService } from './posts.service';
import { JwtAuthGuard } from 'src/common/middleware/jwt.guard';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() body: { title: string; content: string },
    @Request() req,
  ) {
    return this.postService.create(body.title, body.content, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.postService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.postService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: { title: string; content: string },
  ) {
    return this.postService.update(id, body.title, body.content);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.postService.delete(id);
    return { message: 'Post deleted successfully' };
  }
}
