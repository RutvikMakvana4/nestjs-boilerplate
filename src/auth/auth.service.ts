import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { AccessToken } from './entities/acccessToken.entity';
import { RefreshToken } from './entities/refreshToken.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(AccessToken)
    private accessTokenRepo: Repository<AccessToken>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepo: Repository<RefreshToken>,
  ) {}

  async generateAccessToken(userId: number) {
    const jti = crypto.randomBytes(36).toString('hex');
    const payload = { data: JSON.stringify({ userId, jti }) };
    const accessToken = this.jwtService.sign(payload);

    const newAccessToken = this.accessTokenRepo.create({
      token: jti,
      user: { id: userId },
    });
    await this.accessTokenRepo.save(newAccessToken);

    return { accessToken, expiresAt: Date.now() + 3600 * 1000 };
  }

  async generateRefreshToken(accessToken: string, userId: number) {
    const refreshToken = crypto.randomBytes(36).toString('hex');

    const decoded = this.jwtService.decode(accessToken) as any;
    const accessJti = JSON.parse(decoded.data).jti;

    const newRefreshToken = this.refreshTokenRepo.create({
      token: refreshToken,
      accessToken: accessJti,
      user: { id: userId },
    });

    await this.refreshTokenRepo.save(newRefreshToken);
    return refreshToken;
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid password');

    const { accessToken, expiresAt } = await this.generateAccessToken(user.id);
    const refreshToken = await this.generateRefreshToken(accessToken, user.id);

    return { accessToken, refreshToken, expiresAt };
  }

  async logout(userId: number, token: string) {
    const decoded = this.jwtService.decode(token) as any;
    const { jti } = JSON.parse(decoded.data);

    await this.accessTokenRepo.delete({ token: jti });
    await this.refreshTokenRepo.delete({ accessToken: jti });

    return { success: true, message: 'Logout successful' };
  }
}
