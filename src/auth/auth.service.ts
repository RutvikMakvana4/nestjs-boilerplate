import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import User from './entities/users.model';
import AccessToken from './entities/accessToken.model';
import RefreshToken from './entities/refreshToken.model';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { NotFoundException } from 'src/common/exceptions/errorExceptions';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  private readonly saltRounds = 10;

  constructor(
    private jwtService: JwtService,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(AccessToken) private accessTokenModel: typeof AccessToken,
    @InjectModel(RefreshToken) private refreshTokenModel: typeof RefreshToken,
  ) { }

  async generateAccessToken(userId: number) {
    const jti = crypto.randomBytes(36).toString('hex');
    const payload = { data: JSON.stringify({ userId, jti }) };
    const accessToken = this.jwtService.sign(payload);

    await this.accessTokenModel.create({
      token: jti,
      userId, // Sequelize uses userId directly instead of nested user object
    });

    return { accessToken, expiresAt: Date.now() + 3600 * 1000 };
  }

  async generateRefreshToken(accessToken: string, userId: number) {
    const refreshToken = crypto.randomBytes(36).toString('hex');

    const decoded = this.jwtService.decode(accessToken) as any;
    const accessJti = JSON.parse(decoded.data).jti;

    await this.refreshTokenModel.create({
      token: refreshToken,
      accessToken: accessJti,
      userId, // Sequelize uses userId directly
    });

    return refreshToken;
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(
      registerDto.password,
      this.saltRounds,
    );
    const user = await this.userModel.create({
      ...registerDto,
      password: hashedPassword,
    });
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new NotFoundException('Invalid password');

    const { accessToken, expiresAt } = await this.generateAccessToken(user.id);
    const refreshToken = await this.generateRefreshToken(accessToken, user.id);

    return { accessToken, refreshToken, expiresAt };
  }

  async logout(userId: number, token: string) {
    const decoded = this.jwtService.decode(token) as any;
    const { jti } = JSON.parse(decoded.data);

    await this.accessTokenModel.destroy({ where: { token: jti } });
    await this.refreshTokenModel.destroy({ where: { accessToken: jti } });

    return { success: true, message: 'Logout successful' };
  }
}