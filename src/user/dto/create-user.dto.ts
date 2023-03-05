import { IsNotExistsRule } from '@/validate/is-not-exists.rule';
import { Type } from 'class-transformer';
import { ArrayUnique, IsArray, IsInt, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: '请输入用户名',
  })
  @IsNotExistsRule('user', {
    message: '用户名重复',
  })
  name: string;

  @IsNotEmpty()
  password: string;

  @IsArray()
  @Type(() => Number)
  @ArrayUnique((o) => {
    console.log(o, 'ooo');

    return o;
  })
  @IsInt({
    each: true,
    message: '请传入角色id',
  })
  roleIds: number[];
}
