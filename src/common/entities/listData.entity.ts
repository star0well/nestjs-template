import { Exclude } from 'class-transformer';

export class ListData<T> {
  constructor(options: { list: T[]; total: number }) {
    Object.assign(this, options);
  }
  @Exclude()
  createdAt: string;
}
