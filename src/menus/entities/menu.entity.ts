import { Menu as MenuPr } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class Menu {
  @Exclude()
  createdAt: Date;

  children: Menu[];

  pid?: number;

  id: number;

  constructor(options: Partial<MenuPr>) {
    Object.assign(this, options);
  }
}
