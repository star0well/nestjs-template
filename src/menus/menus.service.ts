import { result } from '@/helper';
import { paginate } from './../common/entities/listData.entity';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { SearchMenuDto } from './dto/search.menu.dto';
import { PageInfoDto } from '@/common/dto/pageInfo.dto';

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}
  create(createMenuDto: CreateMenuDto) {
    return this.prisma.menu.create({
      data: createMenuDto,
    });
  }

  async findAll(search: SearchMenuDto, Page: PageInfoDto) {
    const list = await this.prisma.menu.findMany({
      ...Page,
      include: {
        children: {
          include: {
            children: true,
          },
        },
      },
      where: {
        pid: null,
        name: {
          contains: search.name,
        },
        createdAt:
          search.beginTime && search.endTime
            ? {
                gte: new Date(search.beginTime || '2022-09-11'),
                lt: new Date(search.endTime || '2022-09-11'),
              }
            : {},
      },
      orderBy: {
        sort: 'asc',
      },
    });

    const total = await this.prisma.menu.count({
      where: {
        pid: null,

        name: {
          contains: search.name,
        },
        createdAt:
          search.beginTime && search.endTime
            ? {
                gte: new Date(search.beginTime || '2022-09-11'),
                lt: new Date(search.endTime || '2022-09-11'),
              }
            : {},
      },
    });

    return paginate({ list, total });
  }

  async findAllMenus() {
    return this.prisma.menu.findMany();
  }
  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    if (id == updateMenuDto.pid) return result.err('pid 不能为自身');
    return this.prisma.menu.update({
      where: {
        id,
      },
      data: updateMenuDto,
    });
  }

  remove(id: number) {
    return this.prisma.menu.delete({
      where: {
        id,
      },
    });
  }
}
