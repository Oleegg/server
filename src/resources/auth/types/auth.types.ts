import { UserEntity } from 'src/resources/users/user.entity';

export type AuthPayload = {
  name: string;
  email: string;
  password: string;
};

type AuthUserEntityResponse = Omit<UserEntity, 'password'>;

export interface AuthUserResponse extends AuthUserEntityResponse {
  token: string;
}

interface UserAuth {
  phone: string;
}

export interface UserAuthPassword extends UserAuth {
  password: string;
}
