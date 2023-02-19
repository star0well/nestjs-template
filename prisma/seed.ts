import { PrismaClient } from '@prisma/client';
import { hash } from 'argon2';
import { Random } from 'mockjs';

import _ from 'lodash';
const prisma = new PrismaClient();

async function run() {
  // for (let index = 1; index <= 10; index++) {
  //   await prisma.roles.create({
  //     data: {
  //       description: Random.cname(),
  //       menuArray: '[]',
  //     },
  //   });
  // }
  // for (let index = 1; index <= 10; index++) {
  //   await prisma.user.create({
  //     data: {
  //       name: 'admin' + index,
  //       password: await hash('123456'),
  //       realName: '英才',
  //       phone: '13983220650',
  //       departmentId: 1,
  //       rolesId: 1,
  //     },
  //   });
  // }
}
run();
