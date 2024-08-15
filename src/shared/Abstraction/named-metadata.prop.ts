import { Column } from 'typeorm';
import { EntityMetadata } from './entity-metadata.prop';

export abstract class NamedMetadata extends EntityMetadata {
  @Column()
  name: string;

  @Column()
  userId: number;
}
