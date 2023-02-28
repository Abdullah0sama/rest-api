import { KYSELY_CONNECTION } from './interface/connection';
import { KyseleService } from './kysely.service';

export const connectionProvider = {
  provide: KYSELY_CONNECTION,
  inject: [KyseleService],
  useFactory: async (kyseleService: KyseleService) => {
    return kyseleService.get();
  },
};
