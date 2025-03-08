import { Controller, Post, Body, Req, UseGuards, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/common/middleware/jwt.guard';
import { RegisterDto } from './dto/register.dto';
import { createSuccessResponse } from 'src/common/responses/responses.utils';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(@Body() registerDto: RegisterDto): Promise<any> {
    const user = await this.authService.register(registerDto);
    return createSuccessResponse(
      HttpStatus.CREATED,
      'User registered successfully',
      user,
    );
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req) {
    const token = req.headers.authorization.split(' ')[1];
    return this.authService.logout(req.user.id, token);
  }
}