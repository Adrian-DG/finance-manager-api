import { ApiProperty } from '@nestjs/swagger';
import { Account } from 'src/account/entities/account.entity';
import { NamedMetadata } from 'src/shared/Abstraction/named-metadata.prop';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('Incomes')
export class Income extends NamedMetadata {
  @Column({ type: 'decimal' })
  ammount: number;

  @ManyToOne(() => Account, (account) => account)
  account: Account;
}
