import { NamedMetadata } from 'src/shared/Abstraction/named-metadata.prop';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'accounts' })
export class Account extends NamedMetadata {
  @Column({ type: 'decimal' })
  savedAmmount: number;
}
