import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { DatabaseConfig } from 'src/config/databaseConfig';
import { Database } from './interface/database';
import { userSeedData } from './seedings/user_seeding';

export async function SeedDatabase() {
  console.log('Seeding is about to begin!');
  const db = new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: new Pool(DatabaseConfig),
    }),
  });

  const users = await userSeedData();
  await db.deleteFrom('user').execute();
  await db.insertInto('user').values(users).execute();

  console.log('Seeding has finished!');
  await db.destroy();
}

SeedDatabase();
