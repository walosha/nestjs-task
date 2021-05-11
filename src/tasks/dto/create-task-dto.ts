import { IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../task-status.enums';

export class createTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
