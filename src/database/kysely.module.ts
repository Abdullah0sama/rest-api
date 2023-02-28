import { DynamicModule, Module } from '@nestjs/common';
import { KyseleService } from './kysely.service';
import { KyselyConfig } from 'kysely';
import { KYSELY_CONFIG } from './interface/config_options';
import { connectionProvider } from './connection.provider';

@Module({
  providers: [KyseleService],
  exports: [KyseleService],
})
export class KyselyModule {
  static register(config: KyselyConfig): DynamicModule {
    return {
      module: KyselyModule,
      exports: [KyseleService, connectionProvider],
      providers: [
        {
          provide: KYSELY_CONFIG,
          useValue: config,
        },
        KyseleService,
        connectionProvider,
      ],
    };
  }
}
