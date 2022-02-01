import { IsOptional, IsUUID } from 'class-validator';

export class ParamTaskDto {
  @IsUUID()
  boardId: string;

  @IsOptional()
  @IsUUID()
  id: string;
}
