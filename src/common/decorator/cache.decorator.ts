import { SetMetadata, applyDecorators } from '@nestjs/common';

export const CacheRedis = (key: string[]) => {
  return applyDecorators(SetMetadata('cacheKey', key));
};
