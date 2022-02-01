import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Task from './task.model';
import Board from './board.model';

@Entity()
class ColumnEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @ManyToOne(() => Board, (board) => board.columns, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  board!: Board;

  @OneToMany(() => Task, (task) => task.column)
  task?: Task[];
}

export default ColumnEntity;
