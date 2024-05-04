import { UserEntity } from 'src/resources/users/user.entity';

export type AuthPayload = {
  name: string;
  email: string;
  nickname: string;
  password: string;
};

export type TokenResponse = {
  email: string;
  id: number;
  iat: number;
  exp: number;
};

export type AuthUserEntityResponse = Omit<UserEntity, 'password'>;

export type AuthLogin = {
  email: string;
  password: string;
};

export interface AuthUserResponse extends AuthUserEntityResponse {
  token: string;
}
