import { ApiProperty } from '@nestjs/swagger';

export const DefaultUserKeys: (keyof User)[] = ['id', 'email', 'name', 'state'];

export class User {
  @ApiProperty({
    example: 12,
  })
  readonly id: number;

  @ApiProperty({
    example: 'john@gmail.us',
  })
  readonly email: string;

  @ApiProperty({
    example: 'John',
  })
  readonly name: string;

  @ApiProperty({
    example: 'Boston',
  })
  readonly city: string;

  @ApiProperty({
    example: 'Massachusetts',
  })
  readonly state: string;

  password?: string;
}
