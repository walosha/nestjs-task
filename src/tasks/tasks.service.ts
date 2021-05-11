import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enums';
import { createTaskDto } from './dto/create-task-dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTaskStatusDto } from './dto/get-tasks-filters-dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getAllTasks(filters: GetTaskStatusDto) {
    return this.taskRepository.getAllTasks(filters);
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with the id ${id} does not exist!`);
    }
    return found;
  }

  async createTask(creatTaskDto: createTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(creatTaskDto, user);
  }

  deleteTask(id: number): void {
    this.taskRepository.delete(id);
  }

  async updateTask(id, status) {
    const task = await this.getTaskById(id);
    task.status = status;
    task.save();

    return task;
  }
}
