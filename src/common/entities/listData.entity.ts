import { Type } from 'class-transformer';

class PaginateResilt<T> {
  list: T[];
  total?: number;
}
export const paginate = <T>(list: PaginateResilt<T>, classDto?: Function) => {
  class ListData {
    constructor(options: any) {
      Object.assign(this, options);
    }
    @Type(() => classDto, {})
    list: T[];
  }
  return new ListData(list);
};
