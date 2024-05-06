import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import {
  SearchUserPayload,
  UpdateUserPayload,
  UserDeleteResponse,
} from './types/user.types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findByNick(params: SearchUserPayload): Promise<UserEntity> {
    const { nick } = params;
    const user = await this.userRepository.findOne({
      where: {
        nickname: nick,
      },
    });

    if (!user) {
      throw new HttpException(
        `Пользователь с ником ${nick} не найден`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return user;
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
    return await this.userRepository.remove(user);
  }

  async update(id: number, payload: UpdateUserPayload): Promise<UserEntity> {
    const user = await this.findById(id);
    if (payload.nickname) {
      const userByNickName = await this.userRepository.findOne({
        where: {
          nickname: payload.nickname,
        },
      });

      if (userByNickName && userByNickName.id !== id) {
        throw new HttpException(
          'Пользователь с таким никнэймом уже существует',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    const userEntity = new UserEntity();

    Object.assign(userEntity, {
      ...user,
      ...payload,
    });

    await this.userRepository.save(userEntity);

    return await this.findById(id);
  }
}
