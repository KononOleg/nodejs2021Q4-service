import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Task from './task.model';
import ColumnEntity from './column.model';

@Entity()
class Board {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @OneToMany(() => ColumnEntity, (column) => column.board, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  columns!: ColumnEntity[];

  @OneToMany(() => Task, (task) => task.board, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  task?: Task[];
}

export default Board;
