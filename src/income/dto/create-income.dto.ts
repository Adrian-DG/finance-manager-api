import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { Column } from 'typeorm';

export class CreateIncome {
  @ApiProperty()
  @IsNotEmpty({ always: true })
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive({ always: true })
  ammount: number;

  @ApiProperty()
  accountId: number;
}
