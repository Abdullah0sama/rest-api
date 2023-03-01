import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { GeoLocationService } from '../geolocation/geolocationService';
import { CountryCodes } from '../geolocation/interface/location_codes';
import { hashPayload } from '../auth/utils';

@Injectable()
export class UserService {
  private static readonly whiteListedCountryCodes = [CountryCodes.US];

  constructor(
    private userRepository: UserRepository,
    private geoLocationService: GeoLocationService,
  ) {}

  /** Finds user using id
   *
   * @param user_id user unique identifier
   * @return user data
   */
  async get(user_id: number): Promise<User> {
    return await this.userRepository.get(user_id);
  }

  /** Creates User
   *
   * @param createUserDto user information
   * @throws `BadRequestException` when user is not located in one of the white listed countries (ex. USA)
   * @return created user entity
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { latitude, longitude, ...userData } = createUserDto;

    const location = await this.geoLocationService.reverseGeocoding(
      longitude,
      latitude,
    );

    userData.password = await hashPayload(userData.password);

    if (!UserService.whiteListedCountryCodes.includes(location.countryCode)) {
      throw new BadRequestException('User should be located in the USA');
    }

    const userInfo = {
      state: location.state,
      city: location.city,
      ...userData,
    };
    return this.userRepository.create(userInfo);
  }

  async getByEmail(email: string, returnPassword = false): Promise<User> {
    return this.userRepository.getByEmail(email, returnPassword);
  }
}
