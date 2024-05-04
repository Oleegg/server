import { Request } from 'express';
import { UserEntity } from 'src/resources/users/user.entity';

export interface ExpressRequest extends Request {
  user?: UserEntity;
}
