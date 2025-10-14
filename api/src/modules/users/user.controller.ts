import {
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';

@Controller('users')
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.create(createUserDto);
    } catch (error) {
      console.error('Erro ao criar o usuário:', error);
      throw new InternalServerErrorException('Erro ao criar o usuário');
    }
  }

  @Get('find-all')
  findAll() {
    try {
      return this.userService.findAll();
    } catch (error) {
      console.error('Erro ao listar os usuários:', error);
      throw new InternalServerErrorException('Erro ao listar os usuários');
    }
  }
}
