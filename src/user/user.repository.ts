import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { Kysely, NoResultError } from 'kysely';
import { KYSELY_CONNECTION } from 'src/database/interface/connection';
import { Database } from 'src/database/interface/database';
import { User } from './user.entity';
import { DatabaseError } from 'pg';
export class UserRepository {
  constructor(@Inject(KYSELY_CONNECTION) private db: Kysely<Database>) {}

  async get(user_id: number): Promise<User> {
    try {
      const userInfo = await this.db
        .selectFrom('user')
        .selectAll()
        .where('id', '=', user_id)
        .executeTakeFirstOrThrow();
      return userInfo;
    } catch (err) {
      if (err instanceof NoResultError) {
        throw new NotFoundException(`User with id: '${user_id}' not found!'`);
      }
      throw err;
    }
  }

  async create(userInfo: Omit<User, 'id'>): Promise<User> {
    try {
      const createdUser = await this.db
        .insertInto('user')
        .values(userInfo)
        .returningAll()
        .executeTakeFirst();
      return createdUser;
    } catch (err) {
      if (
        err instanceof DatabaseError &&
        err.message.includes('duplicate key')
      ) {
        throw new BadRequestException('Email is already used!');
      }
      throw err;
    }
  }
}
