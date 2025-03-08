import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectModel } from '@nestjs/sequelize';
import AccessToken from 'src/auth/entities/accessToken.model';
import { JWT } from '../constants/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(AccessToken)
    private accessTokenModel: typeof AccessToken,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: `${JWT.ACCESS_TOKEN_SECRET}`,
    });
  }

  async validate(payload: any) {
    const { userId, jti } = JSON.parse(payload.data);

    const checkToken = await this.accessTokenModel.findOne({
      where: { token: jti },
      include: ['user'], // Changed from relations to include for Sequelize
    });

    if (!checkToken) {
      throw new UnauthorizedException('Token expired or invalid');
    }

    return checkToken.user;
  }
}