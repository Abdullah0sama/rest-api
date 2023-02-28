import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'John@gmail.us' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 37.0902 })
  @IsNumber()
  readonly latitude: number;

  @ApiProperty({ example: 95.7129 })
  @IsNumber()
  readonly longitude: number;
}
