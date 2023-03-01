import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { KyselyModule } from './database/kysely.module';
import { PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { DatabaseConfig } from './config/databaseConfig';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    KyselyModule.forRoot({
      dialect: new PostgresDialect({
        pool: new Pool(DatabaseConfig),
      }),
    }),
  ],
})
export class AppModule {}
