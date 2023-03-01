import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './user.entity';
import { JWTAuthGaurd } from '../auth/gaurds/jwt-auth.gaurd';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JWTAuthGaurd)
  @Get(':user_id')
  @ApiOperation({ description: 'Find user by id' })
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse({ description: 'user is not found!' })
  find(@Param('user_id') user_id: number) {
    return this.userService.get(user_id);
  }

  @Post('signup')
  @ApiCreatedResponse({
    type: User,
    description: 'User signup is sucessful',
  })
  @ApiBadRequestResponse({ description: 'Invalid request' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
