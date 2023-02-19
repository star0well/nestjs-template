import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorator/user.decorator';
import { UserInfo } from './decorator/userInfo.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('reset-password')
  @UserInfo()
  resetPassword(@Body() dto: ResetPasswordDto, @CurrentUser() user: User) {
    return this.authService.resetPassword(dto, user);
  }

  @Get('current')
  currentUser(@CurrentUser() user: User) {
    return user;
  }
}
