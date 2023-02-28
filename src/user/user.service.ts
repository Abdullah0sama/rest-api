import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { GeoLocationService } from 'src/geolocation/geolocationService';
import { CountryCodes } from 'src/geolocation/location_codes';

@Injectable()
export class UserService {
  private static readonly whiteListedCountryCodes = [CountryCodes.US];

  constructor(
    private userRepository: UserRepository,
    private geoLocationService: GeoLocationService,
  ) {}

  async get(user_id: number): Promise<User> {
    return await this.userRepository.get(user_id);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const location = await this.geoLocationService.reverseGeocoding(
      createUserDto.longitude,
      createUserDto.latitude,
    );
    if (!UserService.whiteListedCountryCodes.includes(location.countryCode)) {
      throw new BadRequestException('User should be located in the USA');
    }

    const userInfo = {
      state: location.state,
      city: location.city,
      name: createUserDto.name,
      email: createUserDto.email,
    };
    return this.userRepository.create(userInfo);
  }
}
