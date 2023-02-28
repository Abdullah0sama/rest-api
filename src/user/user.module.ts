import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { KyselyModule } from 'src/database/kysely.module';
import { PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    KyselyModule.register({
      dialect: new PostgresDialect({
        pool: new Pool({
          host: 'localhost',
          database: 'funapp',
          password: 'postgres',
          user: 'postgres',
        }),
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
