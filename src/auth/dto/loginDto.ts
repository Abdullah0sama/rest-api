import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'something@gmail.com' })
  email: string;

  @ApiProperty()
  password: string;
}
