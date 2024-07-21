import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class EntityMetadata {
  @PrimaryGeneratedColumn()
  id: number;
}
