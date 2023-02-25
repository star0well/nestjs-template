import { User } from '@prisma/client';
import { Exclude, Transform } from 'class-transformer';
import dayjs from 'dayjs';
export class UserEntity {
  @Transform(({ value }) => {
    return dayjs(value).format('YYYY-MM-DD');
  })
  createdAt: string;
  @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD hh:mm:ss'))
  updatedAt: string;
  @Exclude()
  password: string;
  constructor(options: Partial<User>) {
    Object.assign(this, options);
  }
}
