import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;
export const hashPayload = (payload: string) => {
  return bcrypt.hash(payload, SALT_ROUNDS);
};
