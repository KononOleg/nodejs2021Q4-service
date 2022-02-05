import { IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsNumber()
  order: number;

  @IsString()
  description: string;
}
