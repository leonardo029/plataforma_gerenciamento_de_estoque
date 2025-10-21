import {
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import type { AuthRequest } from './models';
import { IsPublic } from './decorators';

@Controller()
export class AuthController {
  @Inject(AuthService)
  private readonly AuthService: AuthService;

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  login(@Request() req: AuthRequest) {
    return this.AuthService.login(req.user);
  }
}
