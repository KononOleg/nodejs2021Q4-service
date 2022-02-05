import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Task from '../../entity/task.model';
import { CreateTaskDto } from './dto/CreateTask.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>
  ) {}

  async findAll(boardId: string): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { boardId },
    });
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne(id);
    if (!task)
      throw new HttpException(
        `Task with id ${id} not found`,
        HttpStatus.NOT_FOUND
      );
    else return task;
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.tasksRepository.delete(id);
  }

  async create(boardId: string, newTask: CreateTaskDto): Promise<Task> {
    const createdTask = {
      ...newTask,
      boardId,
    };
    return this.tasksRepository.save(createdTask);
  }

  async update(updateTaskDto: CreateTaskDto, id: string): Promise<Task> {
    const task = await this.findOne(id);
    const updatedTask = this.tasksRepository.merge(task, updateTaskDto);
    return this.tasksRepository.save(updatedTask);
  }
}
