import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { paginate } from '@/common/entities/listData.entity';
import { UserRole } from './entities/role.entity';
import { PageInfoDto } from '@/common/dto/PageInfo.dto';
import { User, UserOnRole, Menu as MenuPr } from '@prisma/client';
import { Menu } from '@/menus/entities/menu.entity';

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

  async findAll(args: PageInfoDto) {
    const res = await this.prisma.role.findMany({
      ...args,
      include: {
        roleOnMenus: {
          select: {
            Menu: true,
          },
        },
      },
      where: {},
    });

    const total = await this.prisma.role.count();
    return paginate({ list: res as unknown as UserRole[], total }, UserRole);
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

  async userMenus(
    user: User & {
      UserOnRole: UserOnRole[];
    },
  ) {
    const roleIdList = user.UserOnRole.map((item) => item.roleId);
    const menuList = await this.prisma.roleOnMenu.findMany({
      where: {
        roleId: { in: roleIdList },
      },
      select: {
        Menu: true,
      },
      distinct: ['menuId'],
      orderBy: {
        Menu: {
          sort: 'asc',
        },
      },
    });
    const resulet = menuList.map((item) => ({ ...item.Menu, children: [] }));
    const list = getTrees(resulet);
    return paginate({ list }, Menu);
  }
}
function getTrees(list: Menu[], parent_id: number = null) {
  let parentObj = {};
  list.forEach((o) => {
    parentObj[o.id] = o;
  });
  if (!parent_id) {
    return list.filter((o) => !parentObj[o.pid]).map((o) => ((o.children = getTrees(list, o.id)), o));
  } else {
    return list.filter((o) => o.pid == parent_id).map((o) => ((o.children = getTrees(list, o.id)), o));
  }
}
