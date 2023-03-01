import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

const user_example = {
  name: 'john',
  email: 'john@gmail.com',
  state: 'New York',
  city: 'New York',
};

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  beforeEach(async () => {
    const userModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            get: jest.fn().mockReturnValue(user_example),
            create: jest.fn().mockReturnValue(user_example),
          },
        },
      ],
    }).compile();

    userController = userModule.get<UserController>(UserController);
    userService = userModule.get<UserService>(UserService);
  });

  describe('find', () => {
    it('find user using their id', async () => {
      const user_id = 12;
      const userData: User = {
        id: 123,
        name: 'John',
        city: 'Boston',
        state: 'Massachusetts',
        email: 'john@gmail.com',
        password: '12345678',
      };
      jest
        .spyOn(userService, 'get')
        .mockImplementation(() => Promise.resolve(userData));
      const returnedUser = await userController.find(user_id);
      expect(returnedUser).toBe(userData);
      expect(userService.get).toBeCalledWith(user_id);
    });
  });

  describe('signup', () => {
    it('should signup user', async () => {
      const userData: CreateUserDto = {
        name: 'John',
        email: 'john@gmail.com',
        longitude: 13123,
        latitude: 124214,
        password: '12345678',
      };

      const userSavedInfo: User = {
        id: 12,
        name: 'John',
        email: 'john@gmail.com',
        state: 'New York',
        city: 'New York',
      };

      jest
        .spyOn(userService, 'create')
        .mockImplementation(() => Promise.resolve(userSavedInfo));

      const returnedUser = await userController.create(userData);
      expect(returnedUser).toBe(userSavedInfo);
    });
  });
});
