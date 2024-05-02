import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthPayload, AuthUserResponse } from './types/auth.types';
import { UserEntity } from '../users/user.entity';
import { excludeKeys } from 'src/utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async authorizeUser(loginParams: AuthPayload): Promise<AuthUserResponse> {
    const { email } = loginParams;
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
      select: ['password', 'name', 'email'],
    });

    if (!user) {
      throw new HttpException(
        'Пользователь не найден',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if ('password' in loginParams) {
      const isPasswordCorrect = loginParams.password === user.password;

      if (!isPasswordCorrect) {
        throw new HttpException(
          'Не правильно указан пароль',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      return this.createUserResponse(user);
    }
  }

  generateToken(user: UserEntity): string {
    try {
      return this.jwtService.sign({ email: user.email, id: user.id });
    } catch (error: any) {
      throw new HttpException(
        'Authorization token invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  decodeToken(token: string): UserEntity {
    try {
      return this.jwtService.verify(token);
    } catch (error: any) {
      throw new HttpException(
        'Authorization token expired',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  createUserResponse(user: UserEntity): AuthUserResponse {
    return {
      ...excludeKeys(user, ['password']),
      token: this.generateToken(user),
    } as AuthUserResponse;
  }

  async createUser(registerData: AuthPayload): Promise<AuthUserResponse> {
    const { email } = registerData;

    const userByEmail = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (userByEmail) {
      throw new HttpException(
        'Пользователь с таким адресом электронной почты уже существует',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const userEntity = new UserEntity();
    const user = await this.userRepository.save(
      Object.assign(userEntity, { ...registerData }),
    );

    return this.createUserResponse(user);
  }
}
