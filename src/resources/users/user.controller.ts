import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Put,
  Body,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SEARCH, USERS } from 'src/constants/routes';
import { UserDeleteResponse, UserResponse } from './types/user.types';
import { UpdateUserDto } from './dto/update';
import { User } from './decorators/user.decorator';
import { SearchUserDto } from './dto/search';

@Controller(USERS)
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ): Promise<UserResponse> {
    return await this.usersService.update(id, payload);
  }

  @Get(SEARCH)
  async getSearchUser(@Query() queryParams: SearchUserDto): Promise<string> {
    const user = await this.usersService.findByNick(queryParams);
    return user.list;
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<UserResponse> {
    return await this.usersService.findById(id);
  }

  @Delete(':id')
  async delete(
    @User('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserDeleteResponse> {
    return await this.usersService.delete(id, userId);
  }
}
