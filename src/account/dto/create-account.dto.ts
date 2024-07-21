import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateAccount {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsPositive({
    always: true,
    message: 'ammont must be a postive value and greater than 0',
  })
  ammount: number;
}
