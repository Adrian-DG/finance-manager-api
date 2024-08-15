import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength, minLength } from 'class-validator';

export class CreateUser {
  @ApiProperty()
  @MinLength(4)
  @MaxLength(8)
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(8)
  @MaxLength(12)
  password: string;
}
