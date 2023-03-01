import { Menu, Role, User } from '@prisma/client';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import dayjs from 'dayjs';

export class UserRole {
  @Expose({ name: 'menuList' })
  @Transform((value) => {
    const menuList: { Menu: Menu }[] = value.value;
    return menuList.map((item) => ({ id: item.Menu.id, name: item.Menu.name }));
  })
  roleOnMenus: Menu[];
  @Transform((item) => dayjs(item.value).format('YYYY-MM-DD'))
  createdAt: Date;
  constructor(
    options: Partial<
      Role & {
        roleOnMenus: {
          Menu: Menu;
        }[];
      }
    >,
  ) {
    Object.assign(this, options);
  }
}
