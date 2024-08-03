import { BaseEntity } from "./base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";
@Entity('catched')
export class CatchedEntity extends BaseEntity{

  @Column()
  pokemonName: string;

  @ManyToOne(() => UserEntity, user => user.catched)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}