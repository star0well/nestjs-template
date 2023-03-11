import { Allow } from 'class-validator';
export class PageInfoDto {
  @Allow()
  take: number;

  @Allow()
  skip: number;
}
