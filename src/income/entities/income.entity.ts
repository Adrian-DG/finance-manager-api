import { ApiProperty } from '@nestjs/swagger';
import { Account } from 'src/account/entities/account.entity';
import { NamedMetadata } from 'src/shared/Abstraction/named-metadata.prop';
import { TransactionFrequency } from 'src/shared/enum/transaction-frequency.enum';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('Incomes')
export class Income extends NamedMetadata {
  @Column({ type: 'decimal' })
  ammount: number;

  @Column({
    enum: TransactionFrequency,
    default: TransactionFrequency.ONE_TIME,
  })
  frequency: TransactionFrequency;

  @ManyToOne(() => Account, (account) => account)
  account: Account;
}
