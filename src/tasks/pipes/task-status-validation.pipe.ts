import { PipeTransform, BadRequestException } from '@nestjs/common';

import { ArgumentMetadata } from '@nestjs/common';
import { TaskStatus } from '../task-status.enums';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly STATUS = [TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE];

  transform(value: string, metadata: ArgumentMetadata) {
    value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(
        ` The status ${value} is not valid status}`,
      );
    }
    return value;
  }
  isStatusValid(value: any) {
    const idx = this.STATUS.indexOf(value);
    return idx !== -1;
  }
}
