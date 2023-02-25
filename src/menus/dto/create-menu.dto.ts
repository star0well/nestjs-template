import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
export class CreateMenuDto {
  @IsNotEmpty({ message: '菜单名不能为空' })
  name: string;

  @Type(() => Number)
  @IsOptional()
  pid: number;
  @IsNotEmpty({ message: '菜单图标不能为空' })
  icon: string;
  @IsNotEmpty({ message: '路径不能为空' })
  path: string;
  @Type(() => Number)
  @IsNotEmpty({ message: '菜单类型不能为空' })
  type: number;
  @Type(() => Number)
  @IsNotEmpty({ message: '菜单排序不能为空' })
  sort: number;
}
