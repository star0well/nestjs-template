import { Reflector } from '@nestjs/core';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject, CACHE_MANAGER, Get } from '@nestjs/common';
import { map, Observable, of } from 'rxjs';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector, @Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const { route } = context.switchToHttp().getRequest();
    const cacheKey = this.reflector.getAllAndMerge('cacheKey', [context.getHandler(), context.getClass()]);
    console.log(cacheKey, 'cacheKey');

    if (route.methods.get && cacheKey.length) {
      const res = await this.getCache(cacheKey);
      if (res) {
        return of(res);
      }
    }

    return next.handle().pipe(
      map(async (data) => {
        if ((route.methods.delete || route.methods.post || route.methods.patch) && cacheKey.length) {
          this.cacheManager.del(cacheKey[0]);
        }
        if (route.methods.get && cacheKey.length) {
          this.cacheManager.set(cacheKey[0], data, 0);
        }

        return data;
      }),
    );
  }

  async getCache(key) {
    const res = await this.cacheManager.get(key);
    return res;
  }
}
