import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Board from './board.model';

@Entity()
class ColumnEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @ManyToOne(() => Board, (board) => board.columns)
  board!: Board;
}

export default ColumnEntity;
