import { UserInfoGuard } from './../../guards/role.guard';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '@/guards/controller.guard';

export function UserInfo(isCheckPermission: boolean = true) {
  return applyDecorators(
    SetMetadata('isCheckPermission', isCheckPermission),
    UseGuards(AuthGuard('jwt'), UserInfoGuard, RoleGuard),
  );
}
