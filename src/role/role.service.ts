import { result } from './../helper';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ListData } from '@/common/entities/listData.entity';
import { UserRole } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}
  create(createRoleDto: CreateRoleDto) {
    return this.prisma.role.create({
      data: {
        name: createRoleDto.name,
        describe: createRoleDto.describe,
        roleOnMenus: {
          createMany: {
            data: createRoleDto.menuIds.map((item) => ({ menuId: item })),
          },
        },
      },
    });
  }

  async findAll(args: Record<string, any>) {
    const pageSize = args.pageSize ? +args.pageSize : 10;
    const pageNum = args.pageNum ? +args.pageNum : 1;
    const res = await this.prisma.role.findMany({
      skip: (pageNum - 1) * pageSize,
      take: +pageSize,
      include: {
        roleOnMenus: {
          select: {
            Menu: true,
          },
        },
      },
      where: {},
    });
    const list = res.map((item) => {
      const menuList = item.roleOnMenus.map((item) => ({ id: item.Menu.id, name: item.Menu.name }));
      Reflect.deleteProperty(item, 'roleOnMenus');

      return { ...item, menuList };
    });
    const total = await this.prisma.role.count();
    return new ListData({ list, total });
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.prisma.role.update({
      where: { id },
      data: {
        name: updateRoleDto.name,
        describe: updateRoleDto.describe,
        roleOnMenus: {
          deleteMany: {
            roleId: id,
          },
          createMany: {
            data: updateRoleDto.menuIds.map((item) => ({ menuId: item })),
          },
        },
      },
    });
  }

  remove(id: number) {
    return this.prisma.role.delete({
      where: { id },
    });
  }
}
