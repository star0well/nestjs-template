import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MenusModule } from './menus/menus.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import configs from './config/index';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: configs,
    }),

    AuthModule,
    PrismaModule,
    MenusModule,
    RoleModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
