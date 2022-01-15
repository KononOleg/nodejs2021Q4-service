import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
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
}

export default Board;
