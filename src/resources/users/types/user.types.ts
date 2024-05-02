import { UpdateUserDto } from '../dto/update';
import { UserEntity } from '../user.entity';

export interface UserResponse
  extends Omit<UserEntity, 'hashPassword' | 'password'> {}

export interface UserDeleteResponse extends Omit<UserResponse, 'id'> {}

export type UpdateUserPayload = UpdateUserDto;
