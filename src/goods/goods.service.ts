import { PageInfoDto } from '@/common/dto/PageInfo.dto';
import { paginate } from '@/common/entities/listData.entity';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateGoodDto } from './dto/create-good.dto';
import { UpdateGoodDto } from './dto/update-good.dto';

@Injectable()
export class GoodsService {
  constructor(private prisma: PrismaService) {}
  create(createGoodDto: CreateGoodDto) {
    return this.prisma.goods.create({
      data: createGoodDto,
    });
  }

  async findAll(page: PageInfoDto) {
    const list = await this.prisma.goods.findMany({
      ...page,
    });
    const total = await this.prisma.goods.count({});
    return paginate({ list, total });
  }

  findOne(id: number) {
    return `This action returns a #${id} good`;
  }

  update(id: number, updateGoodDto: UpdateGoodDto) {
    return `This action updates a #${id} good`;
  }

  remove(id: number) {
    return `This action removes a #${id} good`;
  }
}
