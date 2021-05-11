import { Repository, EntityRepository } from 'typeorm';
import { Task } from './task.entity';
import { createTaskDto } from './dto/create-task-dto';
import { TaskStatus } from './task-status.enums';
import { GetTaskStatusDto } from './dto/get-tasks-filters-dto';
import { User } from 'src/auth/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getAllTasks(filters: GetTaskStatusDto): Promise<Task[]> {
    const query = this.createQueryBuilder('task');
    const { status, search } = filters;

    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        'task.description LIKE :search OR task.title LIKE :search',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }
  async createTask(creatTaskDto: createTaskDto, user: User): Promise<Task> {
    // const newTask = await this.taskRepository.create(creatTaskDto);
    const { title, description } = creatTaskDto;

    const newTask = new Task();
    newTask.title = title;
    newTask.description = description;
    newTask.user = user;
    newTask.status = TaskStatus.OPEN;

    await newTask.save();
    return newTask;
  }
}
