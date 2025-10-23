import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoleType } from 'src/modules/user/types';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserFromJwt } from '../models/user-from-jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRoleType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{ user?: UserFromJwt }>();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Unauthenticated user');
    }

    if (!requiredRoles.includes(user.role as UserRoleType)) {
      throw new ForbiddenException('Access denied to your profile');
    }

    return true;
  }
}
