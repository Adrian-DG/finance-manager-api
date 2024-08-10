import { ApiProperty } from '@nestjs/swagger';

export class CreateCreditCard {
  @ApiProperty()
  name: string;

  @ApiProperty()
  approvedAmmount: number;

  @ApiProperty()
  cutOffDate: Date;

  @ApiProperty()
  dueDate: Date;
}
