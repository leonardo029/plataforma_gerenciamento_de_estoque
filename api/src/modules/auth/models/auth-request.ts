import { Request } from 'express';
import { UserEntity } from 'src/modules/user/entities';

export interface AuthRequest extends Request {
  user: UserEntity;
}
