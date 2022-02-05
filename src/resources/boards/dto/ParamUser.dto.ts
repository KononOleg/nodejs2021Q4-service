import { IsUUID } from 'class-validator';

export class ParamBoardDto {
  @IsUUID()
  id: string;
}
