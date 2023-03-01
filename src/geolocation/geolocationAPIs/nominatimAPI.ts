import { InternalServerErrorException } from '@nestjs/common';
import { GeoLocationAddress } from '../interface/geolocation.interface';

/**
 * A wrapper around nominatim API to reverse geocoding
 * @param longitude
 * @param latitude
 * @returns location address
 */
export async function nominatimAPI(
  longitude: number,
  latitude: number,
): Promise<GeoLocationAddress> {
  const searchParams = new URLSearchParams({
    lat: latitude.toString(),
    lon: longitude.toString(),
    format: 'jsonv2',
  });
  const res = await fetch(
    'https://nominatim.openstreetmap.org/reverse?' + searchParams,
    {
      headers: {
        Referer: 'stop.com',
      },
    },
  );

  const geolocation = await res.json();
  if (geolocation && geolocation?.address) {
    const { country_code, country, state, city } = geolocation.address;
    return {
      countryCode: country_code,
      country,
      city,
      state,
    };
  } else {
    throw new InternalServerErrorException();
  }
}
