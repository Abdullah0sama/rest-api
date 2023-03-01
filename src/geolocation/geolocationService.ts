import { Injectable } from '@nestjs/common';
import { GeoLocationAddress } from './interface/geolocation.interface';
import { nominatimAPI } from './geolocationAPIs/nominatimAPI';

@Injectable()
export class GeoLocationService {
  /**
   * Reverse geocoding using longitude and latidude
   * @param longitude
   * @param latitude
   * @returns location address of coordinates
   */
  async reverseGeocoding(
    longitude: number,
    latitude: number,
  ): Promise<GeoLocationAddress> {
    return nominatimAPI(longitude, latitude);
  }
}
