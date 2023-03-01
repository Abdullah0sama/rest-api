import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtConfig } from '../config/jwtConfig';
import { JwtStrategy } from './strategies/jwt.startegy';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { UserService } from '../user/user.service';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authSerivce: AuthService;
  let userServiceMock: DeepMocked<UserService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: JwtConfig.secret,
          signOptions: { expiresIn: JwtConfig.expireTime },
        }),
      ],
      providers: [AuthService, JwtStrategy],
    })
      .useMocker(createMock)
      .compile();
    authSerivce = await module.get<AuthService>(AuthService);
    userServiceMock = await module.get<DeepMocked<UserService>>(UserService);
  });

  describe('validate', () => {
    it('Should throw if user is not found', async () => {
      const email = 'something@gmail.com';
      const password = '12345678';
      userServiceMock.getByEmail.mockRejectedValue(new NotFoundException());

      await expect(authSerivce.validate(email, password)).rejects.toThrowError(
        new UnauthorizedException('Wrong email or password'),
      );
    });
  });
});
