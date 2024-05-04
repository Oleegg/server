import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { UserService } from 'src/resources/users/user.service';
import { AuthService } from '../auth.service';
import { ExpressRequest } from 'src/types/expressRequest';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async use(req: ExpressRequest, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      const decodedUser = this.authService.decodeToken(token);
      req.user = await this.userService.findById(decodedUser.id);

      next();
    } catch (error: any) {
      req.user = null;
      next();
    }
  }
}
