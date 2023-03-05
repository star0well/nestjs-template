import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const PaginateInfo = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  let take = request.query.pageSize;
  let skip = request.query.pageNum;

  if (isNaN(Number(take)) || Number(take) < 1) {
    take = 10;
  }
  if (isNaN(Number(skip)) || Number(skip) <= 1) {
    skip = 0;
  }
  const pageInfo = { skip: Math.floor(skip * take), take: +take };

  return pageInfo;
});
