import { BaseEntity } from './base.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  username: string;

  @Column()
  password: string;
}
