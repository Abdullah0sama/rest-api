import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'John@gmail.us' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 37.773972 })
  @IsNumber()
  readonly latitude: number;

  @ApiProperty({ example: -122.431297 })
  @IsNumber()
  readonly longitude: number;

  @ApiProperty({ example: 12345678 })
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  readonly password: string;
}
