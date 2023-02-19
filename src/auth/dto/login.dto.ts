import { IsMobilePhone, IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
  // @IsMobilePhone('zh-CN', {}, { message: '手机号输入错误' })
  @IsNotEmpty({ message: '用户名不能为空' })
  name: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @Length(5, 20, { message: '请输入5~20位的密码' })
  password: string;
}
