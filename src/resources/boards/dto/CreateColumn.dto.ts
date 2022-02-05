import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import Board from '../../../entity/board.model';

export class CreateColumnDTO {
  @IsString()
  title: string;

  @IsNumber()
  order: number;

  @ValidateNested()
  @Type(() => Board)
  board: Board;
}
