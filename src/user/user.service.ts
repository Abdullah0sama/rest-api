import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  async get(user_id: number): Promise<User> {
    return await this.userRepository.get(user_id);
  }

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.create({
      city: 'ci',
      email: 'askn',
      name: 'aksnr',
      state: 'arkns',
    });
  }
}
