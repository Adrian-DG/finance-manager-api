import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { TransactionFrequency } from 'src/shared/enum/transaction-frequency.enum';
import { Column } from 'typeorm';

export class CreateIncome {
  @ApiProperty()
  @IsNotEmpty({ always: true })
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive({ always: true })
  ammount: number;

  @ApiProperty({
    description: 'Frequency of repetition for this income.',
    enum: TransactionFrequency,
  })
  @IsEnum(TransactionFrequency)
  frequency: TransactionFrequency;

  @ApiProperty()
  accountId: number;
}
