import { Inject, Injectable, ForbiddenException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../user/entities';
import { UserPayload } from './models/user-payload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/user-token';
import { UserRoleType } from '../user/types';

@Injectable()
export class AuthService {
  @Inject(UserService)
  private readonly userService: UserService;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  login(user: UserEntity): UserToken {
    const role = user.role ?? UserRoleType.USER;
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
      name: user.name,
      email: user.email,
      role,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user.isActivated) {
      throw new ForbiddenException('User account is not activated');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password as string,
    );

    if (!isPasswordValid) {
      throw new Error(`Email address or password is incorrect`);
    }

    return user;
  }
}
