import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './user.entity';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
