import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AUTH, LOG_IN, REGISTER, USER } from 'src/constants/routes';
import { SigninUserDto } from './dto/register.dto';
import { AuthUserResponse } from './types/auth.types';
import { LoginUserDto } from './dto/login.dto';
import { User } from 'resources/users/decorators/user.decorator';
import { UserEntity } from 'resources/users/user.entity';

@Controller(AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post(REGISTER)
  async createStateUser(
    @Body()
    signinUserDto: SigninUserDto,
  ): Promise<AuthUserResponse> {
    return await this.authService.createStateUser(signinUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post(LOG_IN)
  async loginPassword(
    @Body()
    loginUserDto: LoginUserDto,
  ): Promise<AuthUserResponse> {
    return await this.authService.authorizeUser(loginUserDto);
  }

  @Get(USER)
  async currentUser(@User() user: UserEntity): Promise<AuthUserResponse> {
    return this.authService.createUserResponse(user);
  }
}
