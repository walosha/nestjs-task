import { TaskStatus } from '../task-status.enums';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetTaskStatusDto {
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
  status: TaskStatus;
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
