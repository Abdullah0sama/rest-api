import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  get(user_id: number): User {
    return {
      name: 'something',
      email: 'somethingelsa',
      city: 'city',
      state: 'state',
      id: 12312,
    };
  }

  create(createUserDto: CreateUserDto) {
    return createUserDto;
  }
}
