import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Put,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { USERS } from 'src/constants/routes';
import { UserDeleteResponse, UserResponse } from './types/user.types';
import { UpdateUserDto } from './dto/update';

@Controller(USERS)
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<UserResponse> {
    return await this.usersService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ): Promise<UserResponse> {
    return await this.usersService.update(id, payload);
  }

  @Delete(':id')
  async delete(
    userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserDeleteResponse> {
    return await this.usersService.delete(id, userId);
  }
}
