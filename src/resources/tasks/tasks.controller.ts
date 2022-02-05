import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../Middleware/auth.guard';
import Task from '../../entity/task.model';
import { CreateTaskDto } from './dto/CreateTask.dto';
import { ParamTaskDto } from './dto/ParamTask.dto';
import { TasksService } from './tasks.service';

@Controller('/boards/:boardId/tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(@Param() params: ParamTaskDto): Promise<Task[]> {
    return this.tasksService.findAll(params.boardId);
  }

  @Get(':id')
  findOne(@Param() params: ParamTaskDto): Promise<Task> {
    return this.tasksService.findOne(params.id);
  }

  @Delete(':id')
  remove(@Param() params: ParamTaskDto): Promise<void> {
    return this.tasksService.remove(params.id);
  }

  @Post()
  create(
    @Param() params: ParamTaskDto,
    @Body() createTaskDto: CreateTaskDto
  ): Promise<Task> {
    return this.tasksService.create(params.boardId, createTaskDto);
  }

  @Put(':id')
  update(
    @Param() params: ParamTaskDto,
    @Body() createTaskDto: CreateTaskDto
  ): Promise<Task> {
    return this.tasksService.update(createTaskDto, params.id);
  }
}
