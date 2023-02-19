import { result } from '@/helper';
import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { hash, verify } from 'argon2';
import { PrismaService } from './../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}
  async register(dto: RegisterDto) {
    //校验验证码
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        password: await hash(dto.password),
      },
    });

    return this.token(user);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { name: dto.name },
    });
    if (!(await verify(user.password, dto.password))) {
      return result.err('密码和用户名不匹配');
    }
    return this.token(user);
  }

  async token({ id }) {
    return result.success({
      token: await this.jwt.signAsync({
        id,
      }),
    });
  }

  async resetPassword(dto: ResetPasswordDto, user: User) {
    return this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: await hash(dto.password),
      },
    });
  }
}
