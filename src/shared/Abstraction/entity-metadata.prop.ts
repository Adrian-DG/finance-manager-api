import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class EntityMetadata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  status: boolean;
}
