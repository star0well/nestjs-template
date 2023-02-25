import { result } from '@/helper';
import { ListData } from './../common/entities/listData.entity';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { SearchMenuDto } from './dto/search.menu.dto';

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}
  create(createMenuDto: CreateMenuDto) {
    return this.prisma.menu.create({
      data: createMenuDto,
    });
  }

  async findAll(search: SearchMenuDto, args: Record<string, any>) {
    const pageSize = args.pageSize ? +args.pageSize : 10;
    const pageNum = args.pageNum ? +args.pageNum : 1;
    const list = await this.prisma.menu.findMany({
      skip: (pageNum - 1) * pageSize,
      take: +pageSize,
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
        sort: 'desc',
      },
    });

    const total = await this.prisma.menu.count({
      where: {
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
    const data = new ListData({
      list,
      total,
    });
    return data;
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
