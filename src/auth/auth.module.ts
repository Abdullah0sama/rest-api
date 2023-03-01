import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from '../config/jwtConfig';
import { JwtStrategy } from './strategies/jwt.startegy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: JwtConfig.secret,
      signOptions: { expiresIn: JwtConfig.expireTime },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
