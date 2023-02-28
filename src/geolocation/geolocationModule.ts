import { Module } from '@nestjs/common';
import { GeoLocationService } from './geolocationService';

@Module({
  providers: [GeoLocationService],
  exports: [GeoLocationService],
})
export class GeoLocationModule {}
