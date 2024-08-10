import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class EntityMetadata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bit', default: true })
  status: boolean;
}
