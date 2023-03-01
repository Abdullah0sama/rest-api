import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authServiceMock: DeepMocked<AuthService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [],
    })
      .useMocker(createMock)
      .compile();
    authController = module.get<AuthController>(AuthController);
    authServiceMock = module.get<DeepMocked<AuthService>>(AuthService);
  });

  it('Should be defined', () => {
    expect(authController).toBeDefined();
  });
  describe('login', () => {
    it('should login', async () => {
      const login = {
        email: 'email@gmail.com',
        password: 'password',
      };
      await authController.login(login);
      expect(authServiceMock.login).toBeCalled();
    });
  });
});
