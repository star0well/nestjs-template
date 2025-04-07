import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule as AuthUserModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MenusModule } from './menus/menus.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { GoodsModule } from './goods/goods.module';
import configs from './config/index';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: configs,
    }),

    AuthUserModule,
    PrismaModule,
    MenusModule,
    RoleModule,
    UserModule,
    GoodsModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
