import { Kysely } from 'kysely';

const userTableName = 'user';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable(userTableName)
    .addColumn('password', 'varchar(150)', (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable(userTableName).dropColumn('password').execute();
}
