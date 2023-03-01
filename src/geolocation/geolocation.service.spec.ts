import { Test } from '@nestjs/testing';
import { GeoLocationService } from '../geolocation/geolocationService';
import { nominatimAPI } from './geolocationAPIs/nominatimAPI';

jest.mock('./geolocationAPIs/nominatimAPI');
describe('UserService', () => {
  let geoLocationService: GeoLocationService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [GeoLocationService],
    }).compile();

    geoLocationService = module.get<GeoLocationService>(GeoLocationService);
  });

  describe('reverseGeoCoding', () => {
    it('Should pass coordinates in right order', async () => {
      const nominatimFake = nominatimAPI as jest.MockedFunction<
        typeof nominatimAPI
      >;
      await geoLocationService.reverseGeocoding(13, 12);
      expect(nominatimFake).toBeCalledWith(13, 12);
    });
  });
});
