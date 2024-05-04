import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CREATE, LIST } from 'constants/routes';
import { ListService } from './list.service';
import { User } from 'resources/users/decorators/user.decorator';
import { CreateListDto } from './dto/create';
import { ListDeleteResponse, ListResponse } from './types/list.types';
import { updateListDto } from './dto/update';

@Controller(LIST)
export class ListController {
  constructor(private readonly listService: ListService) {}

  @HttpCode(HttpStatus.OK)
  @Post(CREATE)
  async create(
    @User('id') userId: number,
    @Body() payload: CreateListDto,
  ): Promise<ListResponse> {
    return this.listService.create(userId, payload);
  }

  @Get()
  async getAll(@User('id') userId: number): Promise<ListResponse[]> {
    return await this.listService.findAll(userId);
  }

  @Put(':id')
  async updateList(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: updateListDto,
  ): Promise<ListResponse> {
    return await this.listService.update(id, payload);
  }

  @Delete(':id')
  async delete(
    @User('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ListDeleteResponse> {
    return await this.listService.delete(id, userId);
  }
}
