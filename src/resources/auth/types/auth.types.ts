import { UserEntity } from 'src/resources/users/user.entity';

export type AuthPayload = {
  name: string;
  email: string;
  password: string;
};

export type TokenResponse = {
  email: string;
  id: number;
  iat: number;
  exp: number;
};

type AuthUserEntityResponse = Omit<UserEntity, 'password'>;

export type AuthLogin = Omit<AuthPayload, 'name'>;

export interface AuthUserResponse extends AuthUserEntityResponse {
  token: string;
}
