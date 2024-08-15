import { EntityMetadata } from 'src/shared/Abstraction/entity-metadata.prop';
import { Column, Entity } from 'typeorm';

@Entity('Users')
export class User extends EntityMetadata {
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
