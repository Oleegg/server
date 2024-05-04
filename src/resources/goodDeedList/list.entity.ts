import { TableNames } from 'constants/tables';
import { UserEntity } from 'resources/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

const { LISTS } = TableNames;

@Entity(LISTS)
export class ListEntity {
  @PrimaryGeneratedColumn('increment', { type: 'integer' })
  id: number;

  @Column()
  todo: string;

  @ManyToOne(() => UserEntity, (user) => user.list)
  @JoinColumn({ name: 'user_id' })
  user: Relation<UserEntity>;
}
