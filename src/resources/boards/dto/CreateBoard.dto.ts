import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import ColumnEntity from '../../../entity/column.model';

export class CreateBoardDTO {
  @IsString()
  title: string;

  @ValidateNested()
  @Type(() => ColumnEntity)
  columns: ColumnEntity[];
}
