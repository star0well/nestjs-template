import { PrismaService } from './../prisma/prisma.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UserInfoGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const user = context.switchToHttp().getRequest().user as { id: number };
    const id = user.id;
    return this.getUserInfo(this.prisma, id, context);
  }
  getUserInfo = async (prisma: PrismaService, id: number, context: ExecutionContext): Promise<boolean> => {
    try {
      const res = await prisma.user.findUnique({
        where: {
          id,
        },
        include: {
          UserOnRole: true,
        },
      });
      context.switchToHttp().getRequest().userInfo = res;
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(false);
    }
  };
}
