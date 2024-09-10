import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUser {
  @ApiProperty({ nullable: false, required: true })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ nullable: false, required: true })
  @IsNotEmpty()
  @IsString()
  password: string;
}
