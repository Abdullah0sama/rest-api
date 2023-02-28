import { Kysely } from 'kysely';

const userTableName = 'user';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable(userTableName)
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'varchar(40)', (col) => col.notNull())
    .addColumn('email', 'varchar(40)', (col) => col.notNull().unique())
    .addColumn('city', 'varchar(40)', (col) => col.notNull())
    .addColumn('state', 'varchar(40)', (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable(userTableName).execute();
}
