import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { Kysely, NoResultError } from 'kysely';
import { KYSELY_CONNECTION } from '../database/interface/connection';
import { Database } from '../database/interface/database';
import { DefaultUserKeys, User } from './user.entity';
import { DatabaseError } from 'pg';
export class UserRepository {
  constructor(@Inject(KYSELY_CONNECTION) private db: Kysely<Database>) {}

  async get(user_id: number): Promise<User> {
    try {
      const userInfo = await this.db
        .selectFrom('user')
        .select(DefaultUserKeys)
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
        .returning(DefaultUserKeys)
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

  async getByEmail(email: string, returnPassword = false) {
    try {
      const selectFields: (keyof User)[] = returnPassword
        ? [...DefaultUserKeys, 'password']
        : DefaultUserKeys;
      const foundUser = await this.db
        .selectFrom('user')
        .select(selectFields)
        .where('email', '=', email)
        .executeTakeFirstOrThrow();
      return foundUser;
    } catch (err) {
      if (err instanceof NoResultError) {
        throw new NotFoundException(`User with email: '${email}' not found!'`);
      }
      throw err;
    }
  }
}
