import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: unknown, req: ExecutionContext) => {
    const request = req.switchToHttp().getRequest();
    return request.user;
  },
);
