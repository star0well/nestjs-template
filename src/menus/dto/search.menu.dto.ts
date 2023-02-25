import { IsOptional } from 'class-validator';
export class SearchMenuDto {
  @IsOptional()
  name: string;
  @IsOptional()
  icon: string;
  @IsOptional()
  path: string;
  @IsOptional()
  beginTime: string;
  @IsOptional()
  endTime: string;
}
