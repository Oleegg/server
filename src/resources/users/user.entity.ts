import { ListEntity } from 'resources/goodDeedList/list.entity';
import { TableNames } from 'src/constants/tables';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  Relation,
} from 'typeorm';

const { USERS } = TableNames;

@Entity(USERS)
export class UserEntity {
  @PrimaryGeneratedColumn('increment', { type: 'integer' })
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => ListEntity, (list) => list.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'list_id' })
  list: Relation<ListEntity[]>;
}
