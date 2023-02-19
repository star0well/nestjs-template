import { UserInfoGuard } from './../../guards/role.guard';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export function UserInfo() {
  return applyDecorators(UseGuards(AuthGuard('jwt'), UserInfoGuard));
}
