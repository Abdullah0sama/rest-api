import { Injectable } from '@nestjs/common';
import { UserInterface } from './user.interface';

@Injectable()
export class UserService {
  get(user_id: number): UserInterface {
    return {
      name: 'something',
      email: 'somethingelsa',
      city: 'city',
      state: 'state',
    };
  }
}
