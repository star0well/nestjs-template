import { result } from '@/helper';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpException, HttpStatus } from '@nestjs/common';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        console.log('data', data);

        if (!data.code && data.code != 0) {
          return result.success(data);
        }
        return data;
      }),
      catchError((err) => {
        debugger;
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
}
