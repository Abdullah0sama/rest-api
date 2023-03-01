import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { GeoLocationService } from '../geolocation/geolocationService';
import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestException } from '@nestjs/common';
import { DeepMocked } from '@golevelup/ts-jest';

describe('UserService', () => {
  let userService: UserService;
  let geoLocationService: GeoLocationService;
  let userRepository: DeepMocked<UserRepository>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            get: jest.fn(),
            create: jest.fn((data) => {
              return { ...data, id: 1 };
            }),
          },
        },
        {
          provide: GeoLocationService,
          useValue: {
            reverseGeocoding: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    geoLocationService = module.get<GeoLocationService>(GeoLocationService);
    userRepository = module.get<DeepMocked<UserRepository>>(UserRepository);
  });

  describe('get', () => {
    it('Should get user data', async () => {
      const user_id = 12;
      const user_data = {
        id: user_id,
        email: 'john@gmail.com',
        name: 'John',
        state: 'New York',
        city: 'New York',
      };
      jest.spyOn(userRepository, 'get').mockResolvedValue(user_data);
      await expect(userService.get(user_id)).resolves.toMatchObject(user_data);
    });
  });

  describe('create', () => {
    const user_create_data: CreateUserDto = {
      email: 'john@gmail.com',
      latitude: 121,
      longitude: 3131,
      name: 'John',
      password: '12345678',
    };
    it('should create user', async () => {
      const locationAddress = {
        countryCode: 'us',
        city: 'New York',
        state: 'New York',
        country: 'USA',
      };

      jest
        .spyOn(geoLocationService, 'reverseGeocoding')
        .mockResolvedValue(locationAddress);

      await expect(userService.create(user_create_data)).resolves.toMatchObject(
        {
          city: locationAddress.city,
          state: locationAddress.state,
          email: user_create_data.email,
          name: user_create_data.name,
        },
      );

      // Ensure that the password is not passed as plain text
      expect(userRepository.create.mock.calls[0][0].password).not.toEqual(
        user_create_data.password,
      );
    });
    it('should not create a user if not from the USA', async () => {
      jest.spyOn(geoLocationService, 'reverseGeocoding').mockResolvedValue({
        countryCode: 'eg',
        city: 'Cairo',
        state: 'Cairo',
        country: 'Egypt',
      });

      await expect(userService.create(user_create_data)).rejects.toThrow(
        new BadRequestException('User should be located in the USA'),
      );
    });
  });
});
