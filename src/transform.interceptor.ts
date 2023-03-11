import { result } from '@/helper';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpException, HttpStatus } from '@nestjs/common';
import dayjs from 'dayjs';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        this.handleTime(data);
        if (!data.code && data.code != 0) {
          return result.success(data);
        }
        return data;
      }),
      catchError((err) => {
        console.log(err, 'err');

        const name = err.constructor.name;
        let message = '';
        message = err;
        if (name == 'PrismaClientKnownRequestError') {
          message = err.meta.field_name + '参数错误';
        }
        if (err.response) {
          message = err.response.messages;
        }

        return throwError(() => new HttpException(result.err(message), HttpStatus.OK));
      }),
    );
  }
  handleTime(target: unknown) {
    if (Array.isArray(target)) {
      target.forEach((item) => {
        this.handleTime(item);
      });
    }
    if (target instanceof Object) {
      for (const key in target) {
        if (Array.isArray(target[key])) {
          this.handleTime(target[key]);
        }
        if (target[key] instanceof Date) {
          target[key] = dayjs(target[key]).format('YYYY-MM-DD HH:mm:ss');
        }
      }
    }
  }
}
