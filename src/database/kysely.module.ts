import { DynamicModule, Global, Module } from '@nestjs/common';
import { KyseleService } from './kysely.service';
import { KyselyConfig } from 'kysely';
import { KYSELY_CONFIG } from './interface/config_options';
import { connectionProvider } from './connection.provider';

@Global()
@Module({
  providers: [KyseleService],
  exports: [KyseleService],
})
export class KyselyModule {
  static forRoot(config: KyselyConfig): DynamicModule {
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
