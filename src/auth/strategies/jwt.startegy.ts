import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConfig } from '../../config/jwtConfig';
import { JwtPayload } from '../interface/jwtPayloadInterface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtConfig.secret,
    });
  }

  async validate(payload: JwtPayload) {
    return {
      email: payload.email,
      id: payload.id,
    };
  }
}
