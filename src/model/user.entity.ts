import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { CatchedEntity } from "./catched.entity";

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => CatchedEntity, catched => catched.user)
  catched: CatchedEntity[];
}
