import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserInterface } from './user.interface';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const userModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = userModule.get<UserController>(UserController);
    userService = userModule.get<UserService>(UserService);
  });

  describe('find', () => {
    it('find user using their id', async () => {
      const user_id = 12;
      const userData: UserInterface = {
        name: 'John',
        city: 'Boston',
        state: 'Massachusetts',
        email: 'john@gmail.com',
      };
      jest.spyOn(userService, 'get').mockImplementation(() => userData);
      const returnedUser = await userController.find(user_id);
      expect(returnedUser).toBe(userData);
      expect(userService.get).toBeCalledWith(user_id);
    });
  });
});
