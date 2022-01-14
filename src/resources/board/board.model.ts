import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import ColumnEntity from './column.model';
import { IColumn } from './interfaces/IColumn';

@Entity()
class Board {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @OneToMany(() => ColumnEntity, (column) => column.board)
  columns!: ColumnEntity[];
}

export default Board;
