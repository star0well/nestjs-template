import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { SearchMenuDto } from './dto/search.menu.dto';
import { PageInfo } from '@/common/dto/pageInfo.dto';
import { PaginateInfo } from '@/common/decorator/paginateInfo.decorator';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menusService.create(createMenuDto);
  }

  @Get()
  findAll(@Query() args: SearchMenuDto, @PaginateInfo() Page: PageInfo) {
    return this.menusService.findAll(args, Page);
  }
  @Get('/list')
  findAllMenus() {
    return this.menusService.findAllMenus();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menusService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menusService.remove(+id);
  }
}
