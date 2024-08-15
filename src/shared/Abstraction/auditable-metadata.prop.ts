import { Column } from 'typeorm';
import { EntityMetadata } from './entity-metadata.prop';

export abstract class AuditableMetadata extends EntityMetadata {
  @Column({ type: 'datetime' })
  createdAt: Date;

  @Column({ type: 'datetime' })
  updatedAt: Date;

  @Column({ type: 'bit' })
  isDelete: boolean;

  @Column()
  userId: number;
}
