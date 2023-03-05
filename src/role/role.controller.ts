import { PageInfo } from './../common/dto/pageInfo.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PaginateInfo } from '@/common/decorator/paginateInfo.decorator';
import { UserInfo } from '@/auth/decorator/userInfo.decorator';
import { CurrentUser } from '@/auth/decorator/user.decorator';
import { User, UserOnRole } from '@prisma/client';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  findAll(@PaginateInfo() page: PageInfo) {
    return this.roleService.findAll(page);
  }
  @Get('menus')
  @UserInfo()
  userMenu(@CurrentUser() user) {
    return this.roleService.userMenus(user);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
