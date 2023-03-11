import { ClassSerializerInterceptor } from '@nestjs/common';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import dayjs from 'dayjs';
import { AppModule } from './app.module';
import { ExceptionsFilter } from './exceptionsFilter/exceptions.filter';
import { TransformInterceptor } from './transform.interceptor';
import ValidatePipe from './validate/validate.pipe';

async function bootstrap() {
  // Date.prototype.toJSON = function () {
  //   return dayjs(this).format('YYYY-MM-DD HH:mm:ss');
  // };
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidatePipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionsFilter(httpAdapter));
  await app.listen(3000);
}
bootstrap();
