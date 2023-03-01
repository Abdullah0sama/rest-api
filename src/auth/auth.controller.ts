import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/loginDto';

@Controller('/auth')
export class AuthController {
  constructor(private authSerivce: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authSerivce.login(loginDto);
  }
}
