import { Inject, Injectable } from '@nestjs/common';
import { Kysely, KyselyConfig } from 'kysely';
import { Database } from './interface/database';
import { KYSELY_CONFIG } from './interface/config_options';

@Injectable()
export class KyseleService {
  private _kyseleConnection: Kysely<Database>;
  constructor(@Inject(KYSELY_CONFIG) private config: KyselyConfig) {}

  get() {
    if (!this._kyseleConnection) {
      this._kyseleConnection = new Kysely<Database>(this.config);
      return this._kyseleConnection;
    }
  }
}
