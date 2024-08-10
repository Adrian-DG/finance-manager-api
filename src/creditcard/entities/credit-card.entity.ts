import { NamedMetadata } from 'src/shared/Abstraction/named-metadata.prop';
import { Column, Entity } from 'typeorm';

@Entity('CreditCards')
export class CreditCard extends NamedMetadata {
  @Column()
  approvedAmmount: number;

  @Column()
  availableAmmount: number;

  @Column()
  cutOffDate: Date;

  @Column()
  dueDate: Date;
}
