import { PrismaService } from '@/prisma/prisma.service';
import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isCheckPermission = this.reflector.getAllAndMerge('isCheckPermission', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!isCheckPermission) return true;

    const user = context.switchToHttp().getRequest().userInfo;
    if (user.id < 10) return true;

    const res = user.UserOnRole.map((item) => item.roleId);

    return permisson(this.prisma);

    async function permisson(prisma: PrismaService) {
      const menus = await prisma.roleOnMenu.findMany({
        where: {
          roleId: {
            in: res,
          },
        },
        include: {
          Menu: {
            select: {
              cPath: true,
            },
          },
        },
      });
      context.switchToHttp().getRequest().roleList = menus.map((item) => item.Menu.cPath);
      const roleList = context.switchToHttp().getRequest().roleList;
      const cPath =
        context.switchToHttp().getRequest()._parsedUrl.pathname + context.switchToHttp().getRequest().method;

      if (!roleList.some((item) => item === cPath)) throw new HttpException('暂无权限', HttpStatus.OK);

      return true;
    }
  }
}
