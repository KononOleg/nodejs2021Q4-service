import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Task from './task.model';
import ColumnEntity from './column.model';

@Entity()
class Board {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @OneToMany(() => ColumnEntity, (column) => column.board)
  columns!: ColumnEntity[];

  @OneToMany(() => Task, (task) => task.board)
  task?: Task[];
}

export default Board;
