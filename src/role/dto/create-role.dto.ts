import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  name: string;
  @IsOptional()
  describe: string;
  @Type(() => Number)
  @IsNotEmpty()
  menuIds: number[];
}
