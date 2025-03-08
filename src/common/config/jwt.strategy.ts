import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccessToken } from 'src/auth/entities/acccessToken.entity';
import { JWT } from '../constants/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(AccessToken)
    private accessTokenRepo: Repository<AccessToken>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: `${JWT.ACCESS_TOKEN_SECRET}`,
    });
  }

  async validate(payload: any) {
    const { userId, jti } = JSON.parse(payload.data);

    const checkToken = await this.accessTokenRepo.findOne({
      where: { token: jti },
      relations: ['user'],
    });

    if (!checkToken) {
      throw new UnauthorizedException('Token expired or invalid');
    }

    return checkToken.user;
  }
}
