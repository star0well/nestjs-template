import { IsOptional } from 'class-validator';
export class PageInfo {
  @IsOptional()
  pageNum: number;
  @IsOptional()
  pageSize: number;
}
