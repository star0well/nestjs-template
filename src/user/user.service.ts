import { hash } from 'argon2';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { paginate } from '@/common/entities/listData.entity';
import { User as other, UserOnRole } from '@prisma/client';
import { Exclude, Expose, Transform } from 'class-transformer';
import dayjs from 'dayjs';
import { PageInfoDto } from '@/common/dto/PageInfo.dto';

class UsereN {
  @Transform((item) => {
    return dayjs(item.value).format('YYYY-MM-DD HH:mm:ss');
  })
  createdAt: Date;
  @Transform((item) => {
    return dayjs(item.value).format('YYYY-MM-DD HH:mm:ss');
  })
  updatedAt: Date;

  @Transform((item) => {
    return item.value.map((item) => ({ roleId: item.roleId, name: item.Role.name }));
  })
  @Expose({ name: 'roleList' })
  UserOnRole: (UserOnRole & {
    Role: {
      name: string;
    };
  })[];
  @Exclude()
  password: string;
  constructor(
    options: Partial<
      other & {
        UserOnRole: (UserOnRole & {
          Role: {
            name: string;
          };
        })[];
      }
    >,
  ) {
    Object.assign(this, options);
  }
}
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto, 'createUserDto');

    return this.prisma.user.create({
      data: {
        name: createUserDto.name,
        password: await hash(createUserDto.password),
        UserOnRole: {
          createMany: { data: createUserDto.roleIds.map((item) => ({ roleId: item })) },
        },
      },
    });
  }

  async findAll(query, page: PageInfoDto) {
    const list = await this.prisma.user.findMany({
      ...page,
      include: {
        _count: true,
        UserOnRole: {
          include: {
            Role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const total = await this.prisma.user.count({
      ...page,
    });
    return paginate<UsereN>({ list, total }, UsereN);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: {
        UserOnRole: {
          deleteMany: {
            userId: id,
          },
          createMany: {
            data: updateUserDto.roleIds.map((item) => ({ roleId: item })),
          },
        },
      },
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
