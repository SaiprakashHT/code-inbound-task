import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'defaultSecretKey', // Provide a fallback secret
    });
  }

  async validate(payload: JwtPayload) {
    const { username } = payload;
    const user = await this.userService.findOneByUsername(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
