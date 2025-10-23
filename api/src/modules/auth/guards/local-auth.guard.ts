import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: unknown, user: any): any {
    if (err || !user) {
      const message = err instanceof Error ? err.message : 'Unauthorized';
      throw new UnauthorizedException(message);
    }

    return user;
  }
}
