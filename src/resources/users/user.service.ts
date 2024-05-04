import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UpdateUserPayload, UserDeleteResponse } from './types/user.types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException(
        `User with id=${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return user;
  }

  async delete(id: number, userId: number): Promise<UserDeleteResponse> {
    const user = await this.findById(id);
    if (user.id !== userId) {
      throw new HttpException(
        'Вы не можете удалять других пользователей',
        HttpStatus.FORBIDDEN,
      );
    }
    // добавить удаление списка друзей и список дел
    return await this.userRepository.remove(user);
  }

  async update(id: number, payload: UpdateUserPayload): Promise<UserEntity> {
    const user = await this.findById(id);

    const userEntity = new UserEntity();

    Object.assign(userEntity, {
      ...user,
      ...payload,
    });

    await this.userRepository.save(userEntity);

    return await this.findById(id);
  }
}
