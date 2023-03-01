import { Type } from 'class-transformer';

export class PaginationResult<T> {
  constructor(partial: Partial<PaginationResult<T>>) {
    Object.assign(this, partial);
  }

  list: T[];
}

class PaginateResilt<T> {
  list: T[];
  total: number;
}
export const paginate = <T>(list: PaginateResilt<T>, classDto?: Function) => {
  class ListData {
    constructor(options: any) {
      Object.assign(this, options);
    }
    @Type(() => classDto)
    list: [];
  }
  return new ListData(list);
};
