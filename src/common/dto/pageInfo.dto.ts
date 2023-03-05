import { Allow } from 'class-validator';
export class PageInfo {
  @Allow()
  take: number;

  @Allow()
  skip: number;
}
