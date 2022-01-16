import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Board from '../board/board.model';
import ColumnEntity from '../board/column.model';
import User from '../users/user.model';

@Entity()
class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @Column()
  description!: string;

  @Column({ nullable: true })
  userId?: string;

  @ManyToOne(() => User, (user) => user.task, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @Column({ nullable: true })
  boardId!: string;

  @ManyToOne(() => Board, (board) => board.task)
  @JoinColumn({ name: 'boardId' })
  board!: Board;

  @Column({ nullable: true })
  columnId!: string;

  @ManyToOne(() => ColumnEntity, (column) => column.task)
  @JoinColumn({ name: 'columnId' })
  column!: ColumnEntity;
}

export default Task;
