import { TableNames } from 'src/constants/tables';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ array: true })
  friend: string;

  @Column({ array: true })
  list: string;
}
