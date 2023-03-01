import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwtPayloadInterface';
import { LoginDto } from './dto/loginDto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * Validate user using email and password
   * @param email
   * @param password
   */
  async validate(email: string, password: string) {
    try {
      const user = await this.userService.getByEmail(email, true);
      const comparison = await bcrypt.compare(password, user.password);
      if (!comparison) throw Error();
      delete user.password;
      return user;
    } catch (err) {
      throw new UnauthorizedException('Wrong email or password');
    }
  }

  /**
   * Signs token payload
   * @param loginDto login info
   * @returns access token
   */
  async login(loginDto: LoginDto) {
    try {
      const user = await this.validate(loginDto.email, loginDto.password);
      const payload: JwtPayload = {
        email: user.email,
        id: user.id,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (err) {
      throw err;
    }
  }
}
