import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateListPayload,
  ListDeleteResponse,
  UpdateListPayload,
} from './types/list.types';
import { ListEntity } from './list.entity';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(ListEntity)
    private readonly listRepository: Repository<ListEntity>,
  ) {}

  async create(
    userId: number,
    payload: CreateListPayload,
  ): Promise<ListEntity> {
    const listEntity = new ListEntity();
    const createdList = await this.listRepository.save(
      Object.assign(listEntity, { ...payload, user: userId }),
    );

    return await this.findById(createdList.id);
  }

  async findById(id: number, userId?: number): Promise<ListEntity> {
    const item = await this.listRepository.findOne({
      where: {
        id,
        ...(userId
          ? {
              user: {
                id: userId,
              },
            }
          : {}),
      },
    });

    if (!item) {
      throw new HttpException(
        `Item with id=${id} for user not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return item;
  }

  async findAll(userId: number): Promise<ListEntity[]> {
    const [listsEntities] = await this.listRepository.findAndCount({
      where: {
        user: {
          id: userId,
        },
      },
    });

    return listsEntities;
  }

  async update(id: number, payload: UpdateListPayload): Promise<ListEntity> {
    const item = await this.findById(id);

    await this.listRepository.save({
      ...item,
      ...payload,
    });

    return await this.findById(id);
  }

  async delete(id: number, userId): Promise<ListDeleteResponse> {
    const item = await this.findById(id, userId);

    return await this.listRepository.remove(item);
  }
}
