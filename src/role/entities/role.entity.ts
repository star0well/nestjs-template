import { Role } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserRole {
  @Exclude()
  createdAt: string;
  constructor(options: Partial<Role>) {
    Object.assign(this, options);
  }
}
