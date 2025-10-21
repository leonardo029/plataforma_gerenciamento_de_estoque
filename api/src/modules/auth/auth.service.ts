import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../user/entities';
import { UserPayload } from './models/user-payload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/user-token';

@Injectable()
export class AuthService {
  @Inject(UserService)
  private readonly userService: UserService;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  login(user: UserEntity): UserToken {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

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
