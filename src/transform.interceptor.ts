import { result } from '@/helper';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpException, HttpStatus } from '@nestjs/common';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        if (!data.code) {
          return result.success(data);
        }
      }),
      catchError((err) => {
        console.log(err);
        const name = err.constructor.name;
        let message = '';
        message = err;
        if (name == 'PrismaClientKnownRequestError') {
          message = err.meta.field_name + '参数错误';
        }
        if (err.response) {
          message = err.response.messages;
        }
        return throwError(() => new HttpException({ code: -1, message }, HttpStatus.BAD_REQUEST));
      }),
    );
  }
}
