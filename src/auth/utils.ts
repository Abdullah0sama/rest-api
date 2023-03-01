import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;
/**
 * Hasher
 * @param payload
 * @returns hashed payload
 */
export const hashPayload = (payload: string) => {
  return bcrypt.hash(payload, SALT_ROUNDS);
};
